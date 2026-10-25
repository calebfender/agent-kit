# Requirements

Everything this kit mentions that lives outside the repo, which skill needs it, how to check for it, and what to do without it. SETUP walks this list with the user. Nothing here is mandatory except an agent harness and git.

Tiers:
- **Core**: needed for the kit to work at all.
- **Recommended**: most skills get noticeably better with it.
- **Optional**: only if the user does that kind of work.

## Core

| Thing | Used by | Check | Install | Without it |
|---|---|---|---|---|
| An agent harness: Claude Code and/or Codex CLI (T3 Code is a GUI on top of both) | everything | `claude --version`, `codex --version` | Claude Code: `npm i -g @anthropic-ai/claude-code` or the native installer at docs.claude.com. Codex: `npm i -g @openai/codex` | Nothing works |
| git | sync, full-send, worktrees | `git --version` | macOS: `xcode-select --install`. Linux: package manager | Nothing works |
| GitHub account + `gh` CLI | full-send/full-stop (PRs, merges), sync | `gh auth status` | `brew install gh` / package manager, then `gh auth login` (the user signs in themselves) | Work stays local; no PRs |

## Recommended

| Thing | Used by | Check | Install | Without it |
|---|---|---|---|---|
| A second model family (Claude **and** OpenAI accounts) | cross-review, delegate | Claude Code and Codex both logged in: `claude` then `/status`; `codex login status` | Claude: Claude Pro/Max subscription or API key. OpenAI: ChatGPT Plus/Pro sign-in in Codex (`codex login`). **Costs money: the user decides.** | cross-review becomes a same-family review by a fresh agent, and says so |
| T3 Code | cross-provider delegation from one chat (`delegate_task`, `orchestrator_capabilities`), built-in preview browser | The T3 Code app is installed and the agent sees `t3-code` MCP tools | https://t3.codes (desktop app) | Delegate via `codex exec "<brief>"` from Claude Code, or Claude subagents only |
| A browser the agent can drive | verify (web), youtube-ingest fallback, component-canvas checks | Harness built-in browser, or Playwright MCP (`claude mcp list` shows `playwright`) | `claude mcp add playwright -- npx @playwright/mcp@latest` (and `codex mcp add playwright -- npx @playwright/mcp@latest`) | verify falls back to curl and screenshots the user takes |
| Knowledge backend | knowledge, youtube-ingest, grill | AGENTS.md "Knowledge" line points somewhere that exists | Default needs nothing: the `knowledge/` folder in this repo. An MCP memory server is optional | Agents forget between sessions |

## Optional

| Thing | Used by | Check | Install | Without it |
|---|---|---|---|---|
| Tailscale | "Links" in AGENTS.md: opening things running on one machine from a phone or another computer | `tailscale status` | https://tailscale.com/download, sign in, then `tailscale serve --bg --https=<port> http://127.0.0.1:<port>` to publish a port to your own devices. Free for personal use | Use localhost links; only worth it with 2+ machines or a home server |
| A second always-on machine (home server, mini PC, VPS) | Long-running agents and services | — | User's call | Everything runs on the laptop |
| A task tracker with an MCP (Linear, Notion, GitHub Issues, Todoist…) | full-send hand-back ("log the session"), grill summaries | `claude mcp list` | Add that tool's official MCP server | Skip logging; summaries go in the repo |
| yt-dlp | youtube-ingest | `yt-dlp --version` | `brew install yt-dlp` / `pipx install yt-dlp` | Browser fallback (`skills/youtube-ingest/scripts/extract.js`) |
| ffmpeg / ffprobe | verify (media) | `ffmpeg -version` | `brew install ffmpeg` / package manager | Can't inspect media exports |
| Whisper (local) | youtube-ingest for videos without captions | `whisper --help` or `mlx_whisper --help` | `pipx install openai-whisper` (Apple Silicon: `pipx install mlx-whisper`) | Report "no captions" |
| Cloudflare account + `wrangler` | Hosting line in AGENTS.md | `npx wrangler whoami` | `npm i -g wrangler`, `wrangler login` | Pick whatever host the user already has |
| A secrets manager CLI (1Password `op`, Bitwarden `bw`, or just a `chmod 600` env file) | Hard rule: never paste keys in chat | `op --version` | 1Password: `brew install 1password-cli` | Keep a `~/.config/agent-secrets/credentials.env` with mode 600 and never print it |
| Design skills: `frontend-design` (Anthropic) and similar | design work | Listed in the harness's skills | Claude Code: `/plugin` and add Anthropic's skills marketplace | Fine without |

## Ideas this kit came from, not included

The original owner runs several private services these skills used to call. They aren't in this repo. If the user wants one, an agent can build a small version; offer, don't build unprompted.

- **Demos page:** one CLI (`demo start <name> -- <cmd>`) that picks a free port, publishes it on Tailscale and lists every running prototype on one page, auto-stopping idle ones.
- **Ask page:** a phone-friendly, one-question-per-screen form that agents post questions to and read answers back from, instead of long chat interviews.
- **Library:** a home-screen of every app you've built, with tap-to-wake for sleeping local apps.
- **Command Center:** one MCP for projects, tasks, notes, calendar and shared agent memory.
- **Client previews** and **self-hosted video links** on Cloudflare (password-protected client site previews; Loom-style video sharing on R2).
