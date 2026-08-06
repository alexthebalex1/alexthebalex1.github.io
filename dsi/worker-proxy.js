// This file exists purely so the ffmpeg.wasm internal worker can be
// constructed as a same-origin script (required by the browser), while
// its actual code still comes straight from the CDN — including any
// relative imports it makes internally, which only resolve correctly
// when loaded this way (as opposed to being wrapped in a blob: URL).
import "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/worker.js";
