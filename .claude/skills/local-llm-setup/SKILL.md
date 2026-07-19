---
name: local-llm-setup
description: Diagnose and fix a crashing local LLM setup (Ollama/LM Studio running Hermes, Qwen, Gemma, etc.) on this machine. Use when the user says their local model "crashes", "is slow", "is ineffective", wants to replace Hermes with Qwen or Gemma, or wants a local model to power coding/ComfyUI agents.
---

# Local LLM setup & repair (Hermes → Qwen/Gemma)

Goal: a stable local model server (Ollama) running a model that actually fits
this machine's memory, with tool-calling support so it can drive agents
(coding tasks, ComfyUI).

**Fast path:** `fix-hermes.sh` in this directory automates Steps 0–4 end to
end (restart → logs → sized Qwen swap → stability env vars → verification):

```bash
bash .claude/skills/local-llm-setup/fix-hermes.sh          # interactive
bash .claude/skills/local-llm-setup/fix-hermes.sh --yes    # accept all defaults
```

The manual steps below are the same procedure, for when you want to see and
decide each move yourself (or you're on Windows).

The script has an offline test suite (mock Ollama, no models downloaded):
`bash .claude/skills/local-llm-setup/test/run-tests.sh` — run it after
changing `fix-hermes.sh`.

## Step 0 — "It's not responding at all"

A dead-silent agent almost always means the Ollama server process is hung or
was OOM-killed — not a model problem. Check and restart the server first:

```bash
curl -s --max-time 5 http://127.0.0.1:11434/api/version   # no reply = server down/hung
```

- **macOS**: quit the Ollama menu-bar app (or `pkill -x ollama`), reopen it
- **Linux**: `sudo systemctl restart ollama`
- **Windows**: quit Ollama from the system tray, relaunch

If it responds again, continue to Step 1 anyway — whatever killed it (usually
memory pressure) will kill it again until the model/context fits.

## Step 1 — Diagnose before changing anything

Run these and read the output before acting:

```bash
ollama --version          # old versions crash on newer models (Qwen3/Gemma3 need a recent build)
ollama list               # what's installed (look for hermes/nous-hermes models)
ollama ps                 # what's loaded now, and whether it's on GPU or CPU
```

Hardware reality check (the #1 cause of crashes is a model or context window
that doesn't fit in memory):

- **macOS**: `sysctl hw.memsize` (unified memory = usable model memory)
- **Linux**: `free -h` and `nvidia-smi` (VRAM column)
- **Windows**: Task Manager → Performance → GPU

Server logs (read the last ~100 lines for OOM / crash reasons):

- macOS: `~/.ollama/logs/server.log`
- Linux: `journalctl -u ollama -n 100 --no-pager`
- Windows: `%LOCALAPPDATA%\Ollama\server.log`

Typical findings and what they mean:

| Symptom in logs / behavior | Cause | Fix |
|---|---|---|
| Killed / OOM / crash on load | Model too big for RAM/VRAM | Smaller model or lower quant (Step 2) |
| Crash mid-conversation | Context window (KV cache) outgrew memory | Lower `num_ctx`, enable flash attention + q8_0 KV cache (Step 3) |
| Painfully slow, "ineffective" | Model spilled from GPU to CPU (`ollama ps` shows low GPU%) | Smaller model so it fits fully on GPU |
| "unsupported architecture" | Ollama too old for the model | Update Ollama first |
| Ignores tools / broken function calls | Model has no tool-calling template (many Hermes builds, Gemma 3 in Ollama) | Use Qwen3 / Qwen2.5-Coder for agent work |

Always update Ollama first: https://ollama.com/download (or `curl -fsSL https://ollama.com/install.sh | sh` on Linux).

## Step 2 — Pick a replacement model that fits

Match the model to available memory (VRAM on PC, unified memory on Mac —
leave ~25% headroom for the OS and KV cache):

| Memory budget | Agent/coding work (tool calling) | General chat / vision |
|---|---|---|
| ~6–8 GB | `qwen3:4b` | `gemma3:4b` |
| ~12–16 GB | `qwen3:8b` or `qwen2.5-coder:7b` | `gemma3:12b-it-qat` |
| ~24 GB | `qwen3:30b-a3b` (MoE — fast) or `qwen2.5-coder:14b` | `gemma3:27b-it-qat` |
| 32 GB+ | `qwen3:32b` or `qwen2.5-coder:32b` | `gemma3:27b` |

Important: **for anything agentic (editing the website, driving ComfyUI),
prefer Qwen over Gemma.** Qwen3 and Qwen2.5-Coder have native tool-calling
support in Ollama; Gemma 3 does not ship a tool-calling template there, which
makes agents silently fail — the "ineffective" symptom. Gemma 3 is the pick
for multimodal chat, not tool use.

## Step 3 — Swap it in

```bash
# Free disk from the broken setup (list first, remove the hermes tags you see)
ollama list
ollama rm <hermes-model-tag>

# Pull the replacement (example for a 16GB machine)
ollama pull qwen3:8b
```

Stability settings — these three fix most mid-session crashes. Set them as
env vars for the Ollama server (macOS: `launchctl setenv KEY value` then
restart Ollama; Linux: `systemctl edit ollama` → `[Service]` →
`Environment=KEY=value`; Windows: System Environment Variables):

```
OLLAMA_CONTEXT_LENGTH=16384   # bounded context; unbounded KV cache is the usual crasher
OLLAMA_FLASH_ATTENTION=1
OLLAMA_KV_CACHE_TYPE=q8_0     # halves KV-cache memory with negligible quality loss
```

## Step 4 — Verify it actually works (don't skip)

```bash
ollama run qwen3:8b "Say hello in five words."
```

Then verify tool calling, since that's what agents depend on:

```bash
curl -s http://localhost:11434/api/chat -d '{
  "model": "qwen3:8b", "stream": false,
  "messages": [{"role":"user","content":"What is the weather in Toronto?"}],
  "tools": [{"type":"function","function":{"name":"get_weather",
    "description":"Get weather for a city",
    "parameters":{"type":"object","properties":{"city":{"type":"string"}},"required":["city"]}}}]
}'
```

A working setup returns a `tool_calls` entry naming `get_weather`. If it
returns prose instead, the model/template doesn't support tools — switch to a
Qwen model.

After both checks pass, watch `ollama ps` during a longer session once:
`100% GPU` means it fits; any CPU split means drop one size tier.

## Step 5 — Hook it up to real work

- **Website changes (this repo)**: Claude Code remains the strongest option.
  If a local model is required, expose Ollama's OpenAI-compatible endpoint
  (`http://localhost:11434/v1`) to a local coding CLI (e.g. Qwen Code).
  Set expectations: local 4B–14B models handle small, single-file edits;
  multi-file refactors of this Next.js site are beyond them.
- **ComfyUI**: use the `comfyui-agent-setup` skill in this repo.
