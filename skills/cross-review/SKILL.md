---
name: cross-review
description: Have the other model family review substantial work, fix what holds up, and repeat until the reviewers agree. Use after implementing anything substantial, before merging, or when the user says "cross-review", "have the other model check it".
---

# Cross-review

Different model families catch different mistakes. Work written by a Claude model is reviewed by a GPT model, and the other way round. The roster (which models play which role) is in the "Models" section of AGENTS.md. Skip this for trivial changes.

1. **Freeze what's being reviewed.** Commit the work so the reviewer sees a fixed revision. Gather the goal and finish condition, the repo path, base and head revisions, how to run and verify it, and what's out of scope.
2. **Pick the reviewer from the other family.** Get exact model IDs from the harness's live catalog (in T3 Code: `orchestrator_capabilities`), not from memory.
   - A Claude model wrote it: the GPT reviewer from the roster, high reasoning effort (higher for risky changes).
   - A GPT model wrote it: the Claude lead from the roster.
   - The other family is unavailable (no account, out of usage, or the harness can't reach it): use a fresh agent of the same family that didn't write the code, with no context from the author beyond the brief, and **say it was a same-family review**. Don't wait for limits to reset or buy credits.
3. **Delegate the review** (in T3 Code: `delegate_task`; in plain Claude Code: run `codex exec` or a fresh subagent; see SETUP). The review is read-only: the reviewer must not edit files. Its brief is self-contained: intent, paths, revisions, the diff command and the verification recipe. Ask for findings with:
   - file:line
   - severity: **blocking**, **should fix** or **nit**
   - a concrete failure scenario
   - evidence

   Don't tell it what conclusion to reach. It may send a cheap model to gather facts.
4. **Triage every finding.** Fix it, or reject it with evidence. Never drop one silently.
5. **Run the next round as a new review task.** Include the original brief, the previous findings, what changed, and each rejection with its reasoning. The reviewer confirms the fixes and either accepts or contests the rejections.
6. **Stop** when no blocking findings remain and the reviewer accepts the rejections: the review **passed**. After three rounds without that, the review is **exhausted**: give the user both positions in two lines. An exhausted review with an open blocking finding means the work must not be merged.
7. **Report briefly:** passed or exhausted, rounds run, what was fixed, what was rejected and why. Never claim a cross-family review happened when it didn't.
