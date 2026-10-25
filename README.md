# agent-kit

A starter setup for coding agents (Claude Code, Codex, T3 Code): one global `AGENTS.md` every agent reads, a few context files, and a set of skills for how work gets done: build it, verify it, have another model review it, and ship it without check-ins.

It's adapted from my own setup. It's a template, not a copy: an agent installs it **for you**, checks what you actually have, asks what you want, and removes everything that doesn't fit.

## Install

1. Have Claude Code (or Codex) installed and signed in.
2. Clone this repo: `git clone https://github.com/calebfender/agent-kit ~/agent-context`
3. Open an agent in that folder and say:

   > Read SETUP.md and set this up for me.

It will look at your machine, ask you a handful of questions (what you use agents for, how many computers you have, which AI subscriptions you have), install only what you agree to, fill in `AGENTS.md`, and test it. It won't spend money or ask you to paste passwords or keys.

## What's in it

| | |
|---|---|
| `AGENTS.md` | The global instructions: when to use which skill, working principles, models, environment, hard rules. |
| `SETUP.md` | The runbook the installing agent follows. |
| `REQUIREMENTS.md` | Every outside tool the kit mentions (Tailscale, a second AI account, Playwright, yt-dlp…), what it's for, how to check and install it, and what happens without it. |
| `context/` | Templates for design taste, personal goals, machines and installed software. Optional. |
| `skills/` | `full-send`, `full-stop`, `verify`, `cross-review`, `delegate`, `grill`, `correct`, `knowledge`, `youtube-ingest`, `component-canvas`. |
| `bin/install.sh` | Points Claude Code and Codex at this folder and links the skills. Backs up whatever was there. |

## Using it

- **"Full send: add a contact form to my site."** The agent builds, verifies, gets a review, and merges.
- **"Full stop: …"** Same, but it stops before merging so you can look.
- **"Grill me on this app idea."** It questions you until the plan is clear, before building anything.
- **Paste a YouTube link.** You get a digest saved to your notes.
- **Correct it twice on the same thing.** It fixes the cause, not just the instance.

Credits: `grill` adapts Matt Pocock's skill (MIT), `correct` adapts Lauren Tan's from pstack, `component-canvas` is Julien Thibeaut's (MIT, vendored unchanged; see its `SOURCE.md`).
