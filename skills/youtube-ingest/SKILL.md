---
name: youtube-ingest
description: Turn a YouTube video the user sends into a saved, useful digest. Use whenever they paste a youtube.com or youtu.be link and want it summarized, ingested, broken down or mined for ideas.
---

# YouTube ingest

Get the full transcript, work out what the video is and why the user might care, then save a digest they can act on. Don't write a recap.

## 1. Get the transcript

**A. yt-dlp (preferred).** It writes straight to disk:
```bash
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "en.*,en" \
  --sub-format vtt --write-info-json -o "%(id)s.%(ext)s" "$URL"
```
Convert the `.vtt` into timestamped paragraphs of about 30 seconds each, removing the repeated rolling caption lines. If yt-dlp can't reach YouTube, or asks you to sign in or prove you're not a bot, run `yt-dlp -U` once, then switch to B. Don't retry in a loop.

**B. Browser fallback** (the harness's built-in browser, Claude in Chrome, or Playwright).
1. Open the watch URL. In page JS, run `movie_player.mute(); movie_player.playVideo()`.
2. If `.ad-showing` is present, an ad is playing. Click Skip with a real click; a JS `.click()` doesn't work.
3. Run `scripts/extract.js` in the page. It captures the player's own caption request and leaves `window.__ytIngest = {transcript, meta}`.
4. Read the transcript in slices of at most 25,000 characters.

These don't work, so don't try them: `/youtubei/v1/get_transcript`, the nocookie embed, and fetching `captionTracks[].baseUrl` directly.

If the video has no captions, say so and offer to transcribe the audio locally (yt-dlp `-x` plus Whisper). Never guess at content.

## 2. Work out what it is

Read the whole transcript first; for long videos, go section by section and keep timestamps. Then decide:
- **What kind of video it is:** AI or agent workflows, business, coding, content creation, fitness, faith, learning, or something else.
- **Which parts of the user's life it touches,** and how they could actually use it. Search Knowledge (skill `knowledge`) for related past ideas, and read `~/agent-context/AGENTS.md` for their current setup.

Shape the digest to fit. A tooling video needs setups and how to adopt them. A business talk needs the arguments and what to try. A workout needs the program.

## 3. Save it

- **Digest** to Knowledge (skill `knowledge`): title, a TL;DR, key points with timestamps, how the user could use it, the source URL and topic tags.
- **Long notes,** when the video justifies them, to a folder named `<YYYY-MM-DD>-<slug>` under the reference folder named in AGENTS.md (default `~/agent-context/knowledge/reference/`).

## 4. Reply

Give the thesis in two lines, the three or four things most worth acting on, and what you saved where. Offer to turn anything worth building into a skill or a task.
