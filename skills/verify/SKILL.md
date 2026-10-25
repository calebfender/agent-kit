---
name: verify
description: Prove a change works on the real running thing before calling it done. Use before reporting any code, UI, data, automation or media work as finished, and as the verification step of full-send and full-stop.
---

# Verify

Evidence comes from the real thing, not from "it compiles" or "the tests pass". Size the effort to the change: a copy edit needs a look, not a test suite.

**By surface:**
- **Web:** run or deploy it and open it in the harness's built-in browser (or Playwright if that's what's installed). Use the changed paths as a user would, at desktop and phone widths. The console should be clean. Use realistic data; demo data belongs in demos only and comes out before going live.
- **iOS/macOS:** build, run the tests, then launch it and drive the changed screens. Say what only a physical device can confirm.
- **APIs and backends:** call the real endpoints and check both the response and what was stored.
- **Media:** inspect the actual export (`ffprobe`, a full decode), look at frames, and listen to the audio.
- **Data, migrations and transfers:** compare counts or checksums against the source. "Partial" or "queued" is not done.
- **Scripts and automations:** run them once for real, or as a dry run when they're destructive, and check the output.

**Regressions:** run the project's existing checks that cover the code you touched, plus a quick pass over the main flows. Run the whole suite only when it's cheap or the change is broad.

**When something fails,** fix it and verify again. When something can't be verified (it needs a device, a login or credentials only the user has), say exactly what and why.

**Report** in a few lines: what you did, what you saw, and a link to try it (see "Links" in AGENTS.md).
