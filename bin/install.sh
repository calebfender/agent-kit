#!/usr/bin/env bash
# Wires this kit into Claude Code and Codex. Safe to re-run.
# Backs up existing global files, points both harnesses at ~/agent-context/AGENTS.md,
# and links every skill folder into ~/.claude/skills and ~/.codex/skills.
set -euo pipefail
KIT="$(cd "$(dirname "$0")/.." && pwd -P)"
HOME_KIT="$HOME/agent-context"
BACKUP="$HOME/.agent-context-backup-$(date +%Y-%m-%d)"

# ~/agent-context must point at this checkout, since every file refers to that path.
if [ "$KIT" != "$(cd "$HOME_KIT" 2>/dev/null && pwd -P || true)" ]; then
  if [ -e "$HOME_KIT" ] || [ -L "$HOME_KIT" ]; then
    echo "~/agent-context already exists and isn't this checkout. Move it aside first." >&2; exit 1
  fi
  ln -s "$KIT" "$HOME_KIT"; echo "linked ~/agent-context -> $KIT"
fi

backup() { # backup <file>
  if [ -e "$1" ] || [ -L "$1" ]; then
    mkdir -p "$BACKUP"; cp -a "$1" "$BACKUP/$(echo "${1#$HOME/}" | tr / _)"; echo "backed up $1 -> $BACKUP"
  fi
}

# Claude Code: CLAUDE.md imports the shared file.
mkdir -p "$HOME/.claude"
if ! grep -qs '@~/agent-context/AGENTS.md' "$HOME/.claude/CLAUDE.md"; then
  backup "$HOME/.claude/CLAUDE.md"
  printf '@~/agent-context/AGENTS.md\n' > "$HOME/.claude/CLAUDE.md"; echo "wrote ~/.claude/CLAUDE.md"
fi

# Codex: AGENTS.md is a link to the shared file (only if Codex is installed).
if [ -d "$HOME/.codex" ] || command -v codex >/dev/null; then
  mkdir -p "$HOME/.codex"
  if [ "$(readlink "$HOME/.codex/AGENTS.md" 2>/dev/null || true)" != "$HOME_KIT/AGENTS.md" ]; then
    backup "$HOME/.codex/AGENTS.md"; rm -f "$HOME/.codex/AGENTS.md"
    ln -s "$HOME_KIT/AGENTS.md" "$HOME/.codex/AGENTS.md"; echo "linked ~/.codex/AGENTS.md"
  fi
fi

# Skills: link each folder; never replace a skill the user already has under the same name.
for skill in "$KIT"/skills/*/; do
  name=$(basename "$skill")
  for dir in "$HOME/.claude/skills" "$HOME/.codex/skills"; do
    [ "$dir" = "$HOME/.codex/skills" ] && [ ! -d "$HOME/.codex" ] && continue
    mkdir -p "$dir"
    if [ -L "$dir/$name" ] && [ "$(readlink "$dir/$name")" = "$HOME_KIT/skills/$name" ]; then continue; fi
    if [ -e "$dir/$name" ]; then echo "skipped $dir/$name (already exists, not ours)"; continue; fi
    ln -s "$HOME_KIT/skills/$name" "$dir/$name"; echo "linked $dir/$name"
  done
done

[ -f "$HOME/AGENTS.md" ] && echo "warning: ~/AGENTS.md exists; Claude Code will load it on top of this kit."
leftover=$(grep -ln '{{' "$KIT/AGENTS.md" "$KIT"/context/*.md 2>/dev/null || true)
[ -n "$leftover" ] && echo "warning: unfilled {{placeholders}} remain in: $leftover"
echo "done"
