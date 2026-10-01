#!/usr/bin/env bash
# End-to-end tests for fix-hermes.sh against the mock Ollama in this directory.
# Safe to run anywhere Linux-ish with python3 — no real Ollama or models involved.
#
#   bash .claude/skills/local-llm-setup/test/run-tests.sh
set -u

HERE="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$HERE/../fix-hermes.sh"
WORK="$(mktemp -d)"
trap 'pkill -x ollama 2>/dev/null; rm -rf "$WORK"' EXIT

mkdir -p "$WORK/bin"
cp "$HERE/mock-ollama" "$WORK/bin/ollama"
chmod +x "$WORK/bin/ollama"
export PATH="$WORK/bin:$PATH"
export OLLAMA_MOCK_STATE="$WORK/state"
mkdir -p "$OLLAMA_MOCK_STATE"

PASS=0; FAIL=0
check() { # check "name" expected_exit actual_exit
  if [ "$2" = "$3" ]; then PASS=$((PASS+1)); echo "PASS: $1"
  else FAIL=$((FAIL+1)); echo "FAIL: $1 (expected exit $2, got $3)"; fi
}

# Clear any leftover mock (or real) server so tests own port 11434.
# Bracketed pattern so pkill -f can't match its own (or a caller's) cmdline.
pkill -x ollama 2>/dev/null
pkill -f '[o]llama serve' 2>/dev/null
sleep 1

# 1. Happy path: server down, hermes installed, --yes repairs everything
printf 'hermes3:8b\nnous-hermes2:latest\n' > "$OLLAMA_MOCK_STATE/models.txt"
echo normal > "$OLLAMA_MOCK_STATE/mode"
OUT="$(bash "$SCRIPT" --yes 2>&1)"; RC=$?
check "full repair (dead server, hermes swap, verify)" 0 "$RC"
echo "$OUT" | grep -q "tool calling OK" || { FAIL=$((FAIL+1)); echo "FAIL: missing tool-calling verification"; }
ollama list | grep -qi hermes && { FAIL=$((FAIL+1)); echo "FAIL: hermes not removed"; }

# 2. Model answers prose instead of tool_calls -> must exit 1
echo prose > "$OLLAMA_MOCK_STATE/mode"
bash "$SCRIPT" --yes >/dev/null 2>&1; RC=$?
check "prose instead of tool_calls fails loudly" 1 "$RC"

# 3. Generation error (OOM-style) -> must exit 1
echo genfail > "$OLLAMA_MOCK_STATE/mode"
bash "$SCRIPT" --yes >/dev/null 2>&1; RC=$?
check "generation failure fails loudly" 1 "$RC"

# 4. --keep-hermes + --model override
echo normal > "$OLLAMA_MOCK_STATE/mode"
printf 'hermes3:8b\nqwen3:4b\n' > "$OLLAMA_MOCK_STATE/models.txt"
OUT="$(bash "$SCRIPT" --yes --keep-hermes --model qwen3:4b 2>&1)"; RC=$?
check "--keep-hermes with --model override" 0 "$RC"
ollama list | grep -qi hermes || { FAIL=$((FAIL+1)); echo "FAIL: hermes was deleted despite --keep-hermes"; }
echo "$OUT" | grep -q "using override: qwen3:4b" || { FAIL=$((FAIL+1)); echo "FAIL: --model override ignored"; }

# 5. Unknown flag rejected
bash "$SCRIPT" --bogus >/dev/null 2>&1; RC=$?
check "unknown flag rejected" 2 "$RC"

echo
echo "$PASS passed, $FAIL failed"
[ "$FAIL" = 0 ]
