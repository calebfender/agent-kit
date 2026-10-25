// Run in the YouTube watch-page tab (any agent browser tool that runs page JS) AFTER any pre-roll ad has finished.
// Captures the player's own caption request (it carries the PO token that direct timedtext fetches lack),
// builds a timestamped transcript in ~30s paragraphs, and leaves it on window.__ytIngest.
// Then read it out with: window.__ytIngest.transcript.slice(N, N+25000)  and  window.__ytIngest.meta
const sleep = ms => new Promise(r => setTimeout(r, ms));
const mp = document.getElementById('movie_player');
if (document.querySelector('.ad-showing')) throw new Error('Ad still playing: skip/wait, then re-run');

// 1. Hook XHR + fetch so we can read the timedtext body the player requests.
window.__cap = [];
if (!window.__ytIngestHooked) {
  window.__ytIngestHooked = true;
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u) {
    this.addEventListener('load', () => { if (String(u).includes('timedtext')) window.__cap.push({ u: String(u), t: this.responseText }); });
    return open.apply(this, arguments);
  };
  const f = window.fetch;
  window.fetch = async function (i, ...a) {
    const r = await f.call(this, i, ...a);
    const u = typeof i === 'string' ? i : (i.url || String(i));
    if (u && u.includes('timedtext')) r.clone().text().then(t => window.__cap.push({ u, t }));
    return r;
  };
}

// 2. Force the captions module to (re)load so the player fetches the full track.
const pr = mp.getPlayerResponse();
const tracks = pr.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
if (!tracks.length) throw new Error('No caption tracks on this video: fall back to audio transcription');
const track = tracks.find(t => t.languageCode?.startsWith('en') && t.kind !== 'asr') || tracks.find(t => t.languageCode?.startsWith('en')) || tracks[0];
mp.playVideo();
try { mp.unloadModule('captions'); } catch (e) {}
await sleep(800);
mp.loadModule('captions');
mp.setOption('captions', 'track', { languageCode: track.languageCode, kind: track.kind });
for (let i = 0; i < 20 && !window.__cap.some(c => c.u.includes(pr.videoDetails.videoId) && c.t.length > 100); i++) await sleep(500);
const cap = window.__cap.filter(c => c.u.includes(pr.videoDetails.videoId) && c.t.length > 100).pop();
if (!cap) throw new Error('Caption request not captured: toggle CC in the player and re-run');

// 3. Build ~30s timestamped paragraphs.
const fmt = s => `${Math.floor(s / 3600) ? Math.floor(s / 3600) + ':' : ''}${String(Math.floor(s / 60) % 60).padStart(Math.floor(s / 3600) ? 2 : 1, '0')}:${String(s % 60).padStart(2, '0')}`;
const paras = []; let cur = null;
for (const e of JSON.parse(cap.t).events || []) {
  if (!e.segs) continue;
  const t = e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ').trim();
  if (!t) continue;
  const sec = Math.floor(e.tStartMs / 1000);
  if (!cur || sec - cur.s >= 30) { cur = { s: sec, w: [] }; paras.push(cur); }
  cur.w.push(t);
}
const transcript = paras.map(p => `[${fmt(p.s)}] ${p.w.join(' ')}`).join('\n');

// 4. Metadata (chapters come from the description's timestamp lines when present).
const v = pr.videoDetails;
const meta = {
  id: v.videoId, title: v.title, channel: v.author, lengthSeconds: +v.lengthSeconds,
  url: 'https://www.youtube.com/watch?v=' + v.videoId,
  description: v.shortDescription, captionTrack: { lang: track.languageCode, kind: track.kind || 'manual' },
  extracted: new Date().toISOString(),
};

window.__ytIngest = { transcript, meta };
({ title: v.title, chars: transcript.length, paragraphs: paras.length, chunks: Math.ceil(transcript.length / 25000) });
