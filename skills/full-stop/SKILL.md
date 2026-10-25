---
name: full-stop
description: Do everything up to merging, then stop and hand the user a ready-to-merge result. Use when they say "full stop" or want to look before it lands, and for client-facing work.
---

# Full stop

Run `full-send` steps 1–5: understand, build, cross-review, verify, integrate. Then stop before merging.

Come back only when either:
- **It's ready to merge.** Give the branch or PR, a link to try it (see "Links" in AGENTS.md), and a few lines on what you verified.
- **It can't work as asked.** Give the specific evidence and the best alternative.

Don't come back with half-finished work or questions you could answer yourself. When the user says "merge it" or "full send", resume `full-send` from step 5, since main may have moved while they looked.
