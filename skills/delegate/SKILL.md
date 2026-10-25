---
name: delegate
description: Hand work to other agents and models and keep them on track. Use when work splits into independent parts, needs a different model's strengths, is cheap reading/searching that shouldn't use the expensive model, or when background agents are running and need checking.
---

# Delegate

Get exact model IDs from the harness's live catalog (in T3 Code: `orchestrator_capabilities`), not from memory. If the harness can't reach another model, say so; never claim a review or delegation happened that didn't.

## Who does what

The roster lives in the "Models" section of AGENTS.md. The default shape:

- **Lead** (a top Claude model) is the daily driver and runs the work.
- **Second opinion** (a top GPT model, via Codex) comes in when the lead needs help. Strong at debugging and reading large codebases.
- **Cheap worker** (a small, fast model from either family) does reading, searching, collecting, basic research, small tasks with no decisions.
- Reviews: whoever didn't write it reviews it (skill `cross-review`).

If only one provider is set up, the roster collapses to one family: lead plus a cheaper model of the same family for grunt work.

## How many and how

- Use as many agents as the work needs: zero for a simple task, dozens when it genuinely splits.
- Give each a self-contained brief with a finish condition.
- Workers don't spawn workers, and the parent owns the integrated result.

## Watch background agents

- Give each brief a budget: roughly how long it should take, and "if the same check fails 3 times, stop and report what's blocking instead of retrying."
- While any run in the background, check on them every 20-30 minutes.
- Stop any that are repeating the same action, past their budget, or popping windows on the user's screen. A stuck agent burns tokens for nothing; stopping it early and finishing the work yourself is fine.
