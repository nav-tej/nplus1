#!/usr/bin/env bash
# fix-hermes.sh — one-shot repair for a local Ollama ("Hermes agent") that
# stopped responding. Run ON THE LAPTOP where Ollama lives:
#
#   bash .claude/skills/local-llm-setup/fix-hermes.sh [--yes] [--model TAG] [--keep-hermes]
#
#   --yes          non-interactive: accept all defaults (pull recommended model,
#                  apply stability env vars, restart server)
#   --model TAG    override the auto-recommended replacement model
#   --keep-hermes  never offer to delete installed hermes models
#
# What it does, in order: restart the Ollama server (fixes most hangs), read
# the crash logs, size a Qwen replacement model to this machine's memory,
# apply the three stability env vars, and verify generation + tool calling.
# Windows users: follow SKILL.md manually; this script covers macOS + Linux.

set -u

YES=0
KEEP_HERMES=0
MODEL_OVERRIDE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --yes) YES=1 ;;
    --model) shift; MODEL_OVERRIDE="${1:-}" ;;
    --keep-hermes) KEEP_HERMES=1 ;;
    *) echo "unknown flag: $1"; exit 2 ;;
  esac
  shift
done

OLLAMA_URL="${OLLAMA_HOST:-http://127.0.0.1:11434}"
case "$OLLAMA_URL" in http*) ;; *) OLLAMA_URL="http://$OLLAMA_URL" ;; esac
OS="$(uname -s)"

say()  { printf '\n==> %s\n' "$*"; }
note() { printf '    %s\n' "$*"; }

confirm() { # confirm "question" -> 0 yes / 1 no; --yes answers yes
  [ "$YES" = 1 ] && return 0
  printf '%s [y/N] ' "$1"
  read -r reply
  case "$reply" in [Yy]*) return 0 ;; *) return 1 ;; esac
}

server_up() { curl -s --max-time 5 "$OLLAMA_URL/api/version" >/dev/null 2>&1; }

# ---------------------------------------------------------------- preflight
if [ "$OS" != "Darwin" ] && [ "$OS" != "Linux" ]; then
  echo "This script supports macOS and Linux. On Windows follow SKILL.md manually."
  exit 1
fi
if ! command -v ollama >/dev/null 2>&1; then
  echo "ollama is not installed (or not on PATH)."
  echo "Install it from https://ollama.com/download and re-run this script."
  exit 1
fi
if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required."; exit 1
fi

say "Ollama version: $(ollama --version 2>/dev/null || echo unknown)"
note "If this is more than a few months old, update from https://ollama.com/download —"
note "old builds crash on newer models."

# ------------------------------------------------- step 1: restart the server
# "Not responding" is almost always a hung or OOM-killed server process.
# A restart is harmless (models reload on demand), so do it unconditionally.
if server_up; then
  say "Server is answering at $OLLAMA_URL — restarting anyway to clear any hung request."
else
  say "Server is NOT answering at $OLLAMA_URL — restarting it."
fi

if [ "$OS" = "Darwin" ]; then
  pkill -x ollama 2>/dev/null
  osascript -e 'quit app "Ollama"' >/dev/null 2>&1
  sleep 2
  if [ -d "/Applications/Ollama.app" ]; then
    open -a Ollama
  else
    nohup ollama serve >/tmp/ollama-serve.log 2>&1 &
  fi
else
  if systemctl list-unit-files 2>/dev/null | grep -q '^ollama\.service'; then
    sudo systemctl restart ollama
  else
    pkill -x ollama 2>/dev/null
    sleep 2
    nohup ollama serve >/tmp/ollama-serve.log 2>&1 &
  fi
fi

i=0
until server_up; do
  i=$((i + 1))
  if [ "$i" -gt 30 ]; then
    echo "Server did not come back after 30s. Read the log below, then see SKILL.md Step 1."
    break
  fi
  sleep 1
done
server_up && say "Server is back up."

# ---------------------------------------------------- step 2: read the logs
say "Recent server log (look for 'out of memory', 'killed', 'unsupported architecture'):"
if [ "$OS" = "Darwin" ]; then
  LOG="$HOME/.ollama/logs/server.log"
  [ -f "$LOG" ] && tail -n 30 "$LOG" || note "no log at $LOG"
else
  if command -v journalctl >/dev/null 2>&1; then
    journalctl -u ollama -n 30 --no-pager 2>/dev/null || note "no journalctl entries for ollama"
  else
    [ -f /tmp/ollama-serve.log ] && tail -n 30 /tmp/ollama-serve.log || note "no log found"
  fi
fi

# ------------------------------------- step 3: size a model to this machine
if [ "$OS" = "Darwin" ]; then
  MEM_GB=$(( $(sysctl -n hw.memsize) / 1073741824 ))
  note_mem="unified memory"
else
  if command -v nvidia-smi >/dev/null 2>&1; then
    MEM_GB=$(( $(nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits | head -1) / 1024 ))
    note_mem="GPU VRAM"
  else
    MEM_GB=$(( $(awk '/MemTotal/{print $2}' /proc/meminfo) / 1048576 ))
    note_mem="system RAM (no NVIDIA GPU detected — expect slow CPU inference)"
  fi
fi

if   [ "$MEM_GB" -ge 32 ]; then REC="qwen2.5-coder:32b"
elif [ "$MEM_GB" -ge 24 ]; then REC="qwen3:30b-a3b"
elif [ "$MEM_GB" -ge 12 ]; then REC="qwen3:8b"
else                            REC="qwen3:4b"
fi
MODEL="${MODEL_OVERRIDE:-$REC}"

say "Detected ${MEM_GB} GB $note_mem → recommended agent model: $REC"
[ -n "$MODEL_OVERRIDE" ] && note "using override: $MODEL"
note "Qwen (not Hermes/Gemma) because agents need Ollama's tool-calling template."

# --------------------------------------------- step 4: swap hermes -> qwen
say "Installed models:"
ollama list 2>/dev/null || note "could not list models"

HERMES_TAGS="$(ollama list 2>/dev/null | awk 'NR>1 {print $1}' | grep -i hermes || true)"
if [ -n "$HERMES_TAGS" ]; then
  note "Hermes models found: $(echo "$HERMES_TAGS" | tr '\n' ' ')"
  if [ "$KEEP_HERMES" = 0 ] && confirm "Delete the Hermes model(s) to free disk? (agents will use $MODEL instead)"; then
    echo "$HERMES_TAGS" | while read -r tag; do
      [ -n "$tag" ] && ollama rm "$tag"
    done
  else
    note "Keeping Hermes models installed (just not using them for agents)."
  fi
fi

if ollama list 2>/dev/null | awk 'NR>1 {print $1}' | grep -qx "$MODEL"; then
  say "$MODEL is already installed."
elif confirm "Pull $MODEL now? (this downloads several GB)"; then
  ollama pull "$MODEL" || { echo "pull failed — check network/disk and re-run"; exit 1; }
else
  note "Skipped pull. Verification below will fail until a model is installed."
fi

# ------------------------------------- step 5: apply stability env vars
say "Applying stability settings (these fix most mid-session crashes):"
note "OLLAMA_CONTEXT_LENGTH=16384  OLLAMA_FLASH_ATTENTION=1  OLLAMA_KV_CACHE_TYPE=q8_0"
if confirm "Apply these to the Ollama server config and restart it?"; then
  if [ "$OS" = "Darwin" ]; then
    launchctl setenv OLLAMA_CONTEXT_LENGTH 16384
    launchctl setenv OLLAMA_FLASH_ATTENTION 1
    launchctl setenv OLLAMA_KV_CACHE_TYPE q8_0
    PROFILE="$HOME/.zprofile"
    if ! grep -q 'OLLAMA_CONTEXT_LENGTH' "$PROFILE" 2>/dev/null; then
      {
        echo ''
        echo '# Ollama stability settings (added by fix-hermes.sh)'
        echo 'launchctl setenv OLLAMA_CONTEXT_LENGTH 16384'
        echo 'launchctl setenv OLLAMA_FLASH_ATTENTION 1'
        echo 'launchctl setenv OLLAMA_KV_CACHE_TYPE q8_0'
      } >> "$PROFILE"
      note "Persisted to $PROFILE so they survive reboots."
    fi
    osascript -e 'quit app "Ollama"' >/dev/null 2>&1; pkill -x ollama 2>/dev/null; sleep 2
    [ -d "/Applications/Ollama.app" ] && open -a Ollama || nohup ollama serve >/tmp/ollama-serve.log 2>&1 &
  else
    if systemctl list-unit-files 2>/dev/null | grep -q '^ollama\.service'; then
      sudo mkdir -p /etc/systemd/system/ollama.service.d
      sudo tee /etc/systemd/system/ollama.service.d/stability.conf >/dev/null <<'EOF'
[Service]
Environment=OLLAMA_CONTEXT_LENGTH=16384
Environment=OLLAMA_FLASH_ATTENTION=1
Environment=OLLAMA_KV_CACHE_TYPE=q8_0
EOF
      sudo systemctl daemon-reload
      sudo systemctl restart ollama
    else
      pkill -x ollama 2>/dev/null; sleep 2
      OLLAMA_CONTEXT_LENGTH=16384 OLLAMA_FLASH_ATTENTION=1 OLLAMA_KV_CACHE_TYPE=q8_0 \
        nohup ollama serve >/tmp/ollama-serve.log 2>&1 &
      note "No systemd unit found — started manually; add the env vars to your shell profile to persist."
    fi
  fi
  i=0; until server_up || [ $((i+=1)) -gt 30 ]; do sleep 1; done
fi

# ------------------------------------------------- step 6: verify (don't skip)
say "Verifying generation with $MODEL (first run loads the model — may take a minute)..."
GEN=$(curl -s --max-time 300 "$OLLAMA_URL/api/generate" -d "{
  \"model\": \"$MODEL\", \"stream\": false, \"prompt\": \"Say hello in five words.\"
}")
if echo "$GEN" | grep -q '"response"'; then
  note "generation OK"
else
  echo "GENERATION FAILED. Raw reply: ${GEN:-<empty — request timed out or server crashed>}"
  echo "Re-read the log above; likely the model doesn't fit — re-run with a smaller one:"
  echo "  bash $0 --model qwen3:4b"
  exit 1
fi

say "Verifying tool calling (what your agents depend on)..."
TOOL=$(curl -s --max-time 300 "$OLLAMA_URL/api/chat" -d "{
  \"model\": \"$MODEL\", \"stream\": false,
  \"messages\": [{\"role\":\"user\",\"content\":\"What is the weather in Toronto?\"}],
  \"tools\": [{\"type\":\"function\",\"function\":{\"name\":\"get_weather\",
    \"description\":\"Get weather for a city\",
    \"parameters\":{\"type\":\"object\",\"properties\":{\"city\":{\"type\":\"string\"}},\"required\":[\"city\"]}}}]
}")
if echo "$TOOL" | grep -q 'tool_calls'; then
  note "tool calling OK"
else
  echo "TOOL CALLING FAILED — the model answered in prose instead of calling the tool."
  echo "Agents will silently misbehave. Use a Qwen model (see SKILL.md Step 2)."
  exit 1
fi

say "Load check — should say 100% GPU (any CPU split → drop one size tier):"
ollama ps

say "Done. The Hermes agent stack is healthy again, running on $MODEL."
note "Point your agent/CLI at $OLLAMA_URL (OpenAI-compatible: $OLLAMA_URL/v1, model \"$MODEL\")."
