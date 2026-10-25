# SETUP: instructions for the agent installing this kit

You are setting up this kit for a new user. It's a global AGENTS.md, context files and skills that every agent on their machine will load. It was written for someone else's setup, so **don't assume anything it mentions exists here.** Your job is to find out what this user has, confirm with them what's actually worth having, install what they say yes to, and leave a kit that matches their real setup and nothing more.

Work through the phases in order. Talk to the user in plain language: they may not be technical. Ask about **intent** ("do you want to reach your projects from your phone?"), not implementation ("should I install Tailscale?"), and give a recommendation with every question.

## Phase 1: Look around (don't ask what you can check)

Run the **Check** commands from `REQUIREMENTS.md` and note what's present. Also find:
- OS and machine (`uname -a`, `sw_vers` on macOS).
- Which harnesses are installed and logged in (Claude Code, Codex, T3 Code).
- Existing global agent files: `~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`, `~/AGENTS.md`, `~/.claude/skills/`, `~/.codex/skills/`. **These belong to the user. Never overwrite them without a backup and their OK.**
- MCP servers already configured (`claude mcp list`, `codex mcp list`).
- Where their code lives (`~/code`, `~/Projects`, `~/dev`…) and whether `gh auth status` works.

Install nothing yet.

## Phase 2: Interview

Show the user a short table: each Recommended/Optional item from `REQUIREMENTS.md`, whether it's **installed**, **missing**, or **not applicable**, and one line on what it would get them. Then ask, in one round (use the harness's question tool if it has one, otherwise numbered questions in chat, each with your recommendation):

1. **Name and how they work:** what to call them, voice or typing, how technical they are, what they mostly use agents for (coding, school, content, business…).
2. **Machines:** just this one, or more (a second computer, home server, phone access)? → decides Tailscale.
3. **Models:** which AI subscriptions they have or are willing to pay for (Claude, ChatGPT/OpenAI). → decides cross-review and the Models section. **Never sign them up or spend money; they decide.**
4. **Tasks/notes tool** they already use, if any. → task tracker MCP.
5. **Hosting:** do they deploy web apps, and where?
6. **Each skill:** which ones fit how they work. Recommend keeping the core workflow set (`verify`, `full-send`, `full-stop`, `grill`, `correct`, `delegate`, `knowledge`) and making `cross-review`, `youtube-ingest` and `component-canvas` opt-in based on their answers.
7. **Personal context:** do they want agents to know personal goals and routines (`context/personal.md`) and design taste (`context/design.md`)? Offer to fill them now with a few questions, later, or never.

Push back if an answer contradicts what you found in Phase 1 (e.g. they want phone access but there's only one machine and no Tailscale). Keep the whole interview to one or two rounds.

## Phase 3: Install what they said yes to

For each confirmed item:
- Use the **Install** column of `REQUIREMENTS.md`. If it's out of date or fails, look up the current official install instructions (the tool's own docs) rather than guessing. Prefer the platform's package manager (Homebrew on macOS).
- Anything that needs the user's sign-in (GitHub, Tailscale, Claude, OpenAI, Cloudflare): start it, then tell them exactly what to click. Never ask them to paste a password or API key into chat.
- Anything that costs money: stop and ask first, every time.
- Check each one with its **Check** command after installing. Report any that failed and the fallback you're using instead.

## Phase 4: Tailor the files

1. **Put the repo at `~/agent-context`** (clone or move it there; if they want it elsewhere, symlink `~/agent-context` to it). Every file refers to that path.
2. **Fill `AGENTS.md`:** replace every `{{…}}` with real answers. **Delete** any line, table row or principle that refers to something they declined or don't have. No placeholders and no mentions of tools they don't have may remain: `grep -n '{{' AGENTS.md context/*.md` must print nothing.
3. **Prune skills:** delete the folders of skills they declined (`skills/<name>/`), remove their rows from AGENTS.md, and read each remaining skill once. Where a skill mentions a tool they don't have, edit that line to the fallback from `REQUIREMENTS.md`.
4. **Context files:** fill the ones they want from the interview; delete the ones they don't and their rows. Write `context/stack.md` from what Phase 1 found (machine, OS, runtimes, harnesses, MCPs). Keep every file short.
5. **Knowledge:** if they chose the folder backend, `mkdir -p ~/agent-context/knowledge/reference`.

## Phase 5: Wire it into the harnesses

Run `bin/install.sh`. It backs up any existing global files to `~/.agent-context-backup-<date>/`, then:
- makes `~/.claude/CLAUDE.md` import `~/agent-context/AGENTS.md` (Claude Code), and links `~/.codex/AGENTS.md` to it (Codex). If the user's existing CLAUDE.md/AGENTS.md has content they want kept, merge it into the new AGENTS.md first.
- links each folder in `skills/` into `~/.claude/skills/` and `~/.codex/skills/`.

Don't create `~/AGENTS.md`: Claude Code also loads AGENTS.md files above its working folder, so a home copy gets read twice.

**Optional sync:** if they have more than one machine, offer to make this a private GitHub repo (`gh repo create <name> --private --source . --push`) and clone it to `~/agent-context` on the other machines, then run `bin/install.sh` there too.

## Phase 6: Prove it

- Start a **fresh** Claude Code session in any folder and ask "What's in your global instructions and which skills do you have?" It should describe their AGENTS.md and list only the kept skills. Do the same in Codex if installed.
- Run one real check per installed tool (e.g. `tailscale status`, a Playwright page load, `codex exec "say hi"` for cross-review).
- Report to the user in a few lines: what's installed, what was skipped and why, what still needs them (sign-ins, payments), and one example prompt per kept skill so they know how to use it ("full send: add dark mode to my site", "grill me on this app idea").
