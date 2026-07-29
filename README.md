# DSi Sound Converter

A single-page site that converts any uploaded audio file to **mono, 16000 Hz,
AAC** — the maximum spec the Nintendo DSi Sound app can play — entirely
client-side (no server, no upload of your audio anywhere). It uses
[ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) loaded from a CDN to
do the actual encoding.

## Run it

Browsers block ES module imports and Web Workers when a page is opened
directly from disk (`file://...`), so you need to serve the folder over
`http://` — any static server works:

```bash
cd audio-converter
python3 -m http.server 8000
# then open http://localhost:8000
```

or

```bash
npx serve .
```

Then open the printed URL, drop in an audio file, and click **Convert**.

## About the "16 bit" request

AAC is a compressed (lossy) format — it doesn't store fixed-depth PCM
samples the way an uncompressed WAV file does, so there's no literal
"16-bit AAC" setting. The page converts what maps cleanly onto AAC:

- **Channels:** forced to mono (`-ac 1`)
- **Sample rate:** 16000 Hz by default, editable in the LCD readout (`-ar`)
- **Format:** AAC in an ADTS container, i.e. a `.aac` file (`-c:a aac -f adts`)
- **Bitrate:** defaults to 16 kbps (a literal read of "16 bitrate"), editable
  in the bitrate field — raise it if 16 kbps sounds too compressed for your
  source material

## Files

- `index.html` — everything (markup, styles, and the conversion logic) in
  one file, so it's easy to drop on any static host (GitHub Pages, Netlify,
  S3, etc.)
