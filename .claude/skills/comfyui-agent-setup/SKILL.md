---
name: comfyui-agent-setup
description: Connect an AI agent (Claude Code, Claude Desktop, Cursor, Qwen Code, etc.) to ComfyUI for image/video/audio generation — via the first-party Comfy MCP (local or cloud), the in-app Comfy agent, or the third-party ComfyUI-Agent-Kit. Use when the user wants agents to drive ComfyUI, generate media for the website, or asks about Comfy MCP / ComfyUI agent setup.
---

# ComfyUI agent integration

Official docs hub: https://docs.comfy.org/agent-tools — covers Comfy MCP
(https://docs.comfy.org/agent-tools/mcp), the in-app agent
(https://docs.comfy.org/agent-tools/in-app-agent), and Comfy Cloud MCP
(https://docs.comfy.org/agent-tools/cloud). Overview: https://comfy.org/mcp/

Pick a path:

- **Path A — Comfy MCP, local (first-party, recommended)**: Comfy-Org's own
  MCP server drives the ComfyUI on this machine. Free per-generation, private,
  sees your actual nodes/models.
- **Path B — Comfy Cloud MCP (hosted)**: generation on Comfy's cloud GPUs.
  Right choice if local ComfyUI crashes or the GPU is weak.
- **Path C — ComfyUI-Agent-Kit (third-party)**: community alternative with
  extra prompt recipes/templates for multiple agent CLIs.

The **in-app agent** (https://docs.comfy.org/agent-tools/in-app-agent) is the
docked, workflow-aware chat panel inside ComfyUI itself — it streams reasoning
and tool calls and applies edits straight to the canvas. It's powered by the
same Comfy MCP tooling; use it when working inside ComfyUI, and Paths A–C when
driving ComfyUI from an external agent like Claude Code. (Check the docs page
for current availability — it shipped first to Comfy Cloud.)

If the machine also runs a local LLM (see `local-llm-setup` skill), remember
ComfyUI and the LLM compete for the same VRAM — that contention is a common
cause of "everything crashes". Cloud MCP sidesteps it entirely.

## Path A — Comfy MCP local (Comfy-Org/comfy-mcp)

Source: https://github.com/Comfy-Org/comfy-mcp · Docs:
https://docs.comfy.org/agent-tools/mcp

Shortcut: paste `https://docs.comfy.org/agent-tools/mcp#installation` into
your AI client and ask it to set up the local connection.

Requirements: Python ≥ 3.10, `comfy-cli` ≥ 1.14.0 on PATH, a ComfyUI
workspace, and ComfyUI running before tool use.

```bash
pip install comfy-mcp "comfy-cli>=1.14.0"
comfy install     # once, if no ComfyUI workspace exists yet
comfy launch      # ComfyUI must be running

# Register with Claude Code:
claude mcp add comfy-mcp \
  -e COMFY_BIN=/path/to/venv/bin/comfy \
  -e COMFY_API_KEY=<your-api-key> \
  -- comfy-mcp
```

Claude Desktop / Cursor use the same server via `mcpServers` config JSON
(`"command": "comfy-mcp"` with the `COMFY_BIN` env var). Notes:

- ~40 tools: `run_workflow`, `generate_image`, `run_template`,
  `search_templates`, `search_models`, `download_model`, `validate_workflow`,
  `system_stats`, `free_memory`, job status/watch/cancel, logs, etc.
- Non-default ComfyUI port → set `COMFY_LOCAL_URL`; remote ComfyUI →
  `COMFYUI_URL` or `COMFYUI_HOST`/`COMFYUI_PORT`.
- `COMFY_API_KEY` is only needed for partner-API nodes; paid generations
  require spend confirmation.

## Path B — Comfy Cloud MCP (hosted)

Docs: https://docs.comfy.org/agent-tools/cloud

- **Claude Code**: install the `comfy-cloud` plugin from the Comfy Skills
  marketplace — adds the MCP connection and slash commands in one step.
- **Claude Desktop**: Settings → Connectors → Add custom connector →
  `https://cloud.comfy.org/mcp`, then sign in (one-time OAuth, no API keys).

Generates images/video/audio/3D on cloud GPUs; can run alongside Path A —
choose per task where execution should happen.

## Path C — ComfyUI-Agent-Kit (third-party)

Source: https://github.com/SlavaSexton/ComfyUI-Agent-Kit (community project —
review before installing). Needs Node.js, Python 3, git, local ComfyUI at
`http://127.0.0.1:8188`, and an agent CLI on PATH (`claude`/`codex`/`gemini`/`qwen`).

```
/plugin marketplace add SlavaSexton/ComfyUI-Agent-Kit
/plugin install comfyui@comfyui-agent-kit
```

Or the multi-agent installer: `git clone` the repo, then
`./install.sh --comfyui-path /path/to/ComfyUI` (Windows:
`./install.ps1 -ComfyUIPath "E:\path\to\ComfyUI"`). Adds prompt recipes and
500+ workflow templates on top of an MCP driver; workflows persist to
`<ComfyUI>/user/default/workflows/`; optional per-project `.comfyui-agent.json`.

## Verify

Ask the connected agent to "generate a 512x512 test image of a blue square"
and confirm an image comes back (local paths: check ComfyUI's queue at
`http://127.0.0.1:8188`; cloud: output returned via the MCP tool result).

## Use with this website

Generated assets for nplus1/nplusalpha pages belong in `public/`; reference
them from components with `next/image`. Keep source workflows out of the
repo unless they're meant to be shared.
