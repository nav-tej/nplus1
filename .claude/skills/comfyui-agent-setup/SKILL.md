---
name: comfyui-agent-setup
description: Connect an AI agent (Claude Code, Qwen Code, etc.) to ComfyUI for image/video/audio generation — either locally via ComfyUI-Agent-Kit or hosted via Comfy Cloud MCP. Use when the user wants agents to drive ComfyUI, generate media for the website, or asks about ComfyUI MCP / Agent Kit setup.
---

# ComfyUI agent integration

Two supported paths. Pick based on hardware:

- **Local (ComfyUI-Agent-Kit)** — free per-generation, private, uses this
  machine's GPU. Right choice if the GPU comfortably runs ComfyUI already.
- **Comfy Cloud MCP** — generation runs on Comfy.org's cloud GPUs (public
  beta). Right choice if local ComfyUI crashes or the GPU is weak, since only
  the agent runs locally.

If the machine also runs a local LLM (see `local-llm-setup` skill), remember
ComfyUI and the LLM compete for the same VRAM — that contention is a common
cause of "everything crashes". Cloud MCP sidesteps it entirely.

## Path A — Local: ComfyUI-Agent-Kit

Source: https://github.com/SlavaSexton/ComfyUI-Agent-Kit (third-party
marketplace — review the repo before installing).

Prerequisites: Node.js + npm, Python 3, git, a local ComfyUI install
(Desktop app or source from comfy.org), and at least one agent CLI on PATH
(`claude`, `codex`, `gemini`, or `qwen`).

Claude Code install (plugin method, run inside Claude Code):

```
/plugin marketplace add SlavaSexton/ComfyUI-Agent-Kit
/plugin install comfyui@comfyui-agent-kit
```

Multi-agent installer (also configures qwen/gemini/codex CLIs):

```bash
git clone https://github.com/SlavaSexton/ComfyUI-Agent-Kit.git
cd ComfyUI-Agent-Kit
./install.sh --comfyui-path /path/to/ComfyUI     # Linux/macOS
# Windows: ./install.ps1 -ComfyUIPath "E:\path\to\ComfyUI"
```

The installer is idempotent and re-runnable; it auto-detects installed agents
and hardware. What you get: a ~90-tool MCP driver (`comfyui-mcp` npm package)
that lets the agent build/edit/validate graphs, queue generations, download
models, and manage VRAM, plus prompt recipes and 500+ workflow templates.

Key config:

- ComfyUI server expected at `http://127.0.0.1:8188` (start ComfyUI before
  the agent needs it)
- Optional per-project config: `.comfyui-agent.json`
- Generated workflows persist to `<ComfyUI>/user/default/workflows/`

## Path B — Hosted: Comfy Cloud MCP

Docs: https://docs.comfy.org/agent-tools/cloud · https://comfy.org/mcp/

- **Claude Code**: install the `comfy-cloud` plugin from the Comfy Skills
  marketplace (Comfy-Org's Claude Code plugin repo) — it adds the MCP
  connection and slash commands in one step.
- **Claude Desktop**: Settings → Connectors → Add custom connector →
  `https://cloud.comfy.org/mcp`, then sign in when prompted.

Auth is a one-time OAuth sign-in; no API keys to manage. Capabilities:
generate images/video/audio/3D on cloud GPUs, search templates/models/nodes,
run and share saved workflows from chat.

## Verify

Ask the connected agent to "generate a 512x512 test image of a blue square"
and confirm an image comes back (Path A: check ComfyUI's queue at
`http://127.0.0.1:8188`; Path B: output returned via the MCP tool result).

## Use with this website

Generated assets for nplus1/nplusalpha pages belong in `public/`; reference
them from components with `next/image`. Keep source workflows out of the
repo unless they're meant to be shared.
