---
name: full-send
description: Take a change all the way to merged, verified and live without the user. Use when they say "full send", "just get it done", "ship it", or want something finished on their own projects and never thought about again.
---

# Full send

The user wants the result, not a check-in. Finish it.

1. **Understand the outcome.** If their intent is genuinely unclear, ask once at the start. Technical ambiguity is yours to resolve. After that, don't stop for input.
2. **Build** in your own worktree (or branch) off the latest main, so parallel agents never edit the same checkout.
3. **Review it** with `cross-review` for anything substantial. Trivial changes skip this.
4. **Verify it** with `verify` on the real running thing.
5. **Integrate.** Other agents may have merged work into the same repo. Update from the latest main, resolve conflicts, rerun the checks, and re-verify the paths both changes touch. If integration changed behavior or needed real conflict resolution, run `cross-review` again on the result.
6. **Confidence gate.** Merge only if any required cross-review passed on the final revision (an exhausted review with an open blocking finding is a hard stop), and you'd put it at 8/10 or better that it works and breaks nothing. Below that, keep working. If you're truly stuck, stop and report the way `full-stop` does.
7. **Merge and ship.** Right before merging, check main again. If it moved, repeat step 5 on the new main. Then merge and push. If the project deploys from main, deploy it and confirm the live version is the new one.
8. **Hand back** one short message: what shipped, a link the user can open (see "Links" in AGENTS.md), and what you verified. If a task tracker is set up (AGENTS.md), log the session and complete the related task.

**Limits:**
- Client work stops before anything the client sees: messaging, sending a preview, or a production deploy. For client work, behave like `full-stop` unless the user says otherwise.
- Never force-push, and never spend money.
