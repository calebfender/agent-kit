---
name: knowledge
description: Save to or look up Knowledge, the long-term memory every agent shares. Use when something is worth keeping for the user or the next agent (a decision, preference, how something is set up, research, a digest, an idea), and before answering about anything they mentioned before or redoing research.
---

# Knowledge

Knowledge is the one memory every agent shares, across harnesses (Claude Code, Codex, T3 Code) and machines. It's not the user's notes: write to their notes only when they ask.

**Where it lives** is set in the "Knowledge" line of AGENTS.md. Two supported backends:

- **An MCP memory server** with save/search tools (for example a `remember` / `recall` pair). Use its tools.
- **A plain folder** (default: `~/agent-context/knowledge/`, synced by git like the rest of this repo). One markdown file per entry, named `<topic>-<slug>.md`, with a first line `tags: a, b, c` and a `Updated: YYYY-MM-DD` line. Search it with `grep -ril` / `rg` before answering.

## Look things up first

- Search Knowledge before answering about anything the user mentioned before, their preferences, past ideas or saved content, and before redoing research.

## Save

- Save what another agent or the user would want later: decisions and why, preferences, how things are set up, research and digests, ideas they want kept.
- Search first and update the existing entry rather than creating a duplicate.
- Reuse existing tags; the first tag is the main topic.
- Link related entries by name.
- Your harness's private memory is only for notes about how you work. Anything worth sharing goes to Knowledge too.
