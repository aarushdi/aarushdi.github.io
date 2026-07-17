# aarushdi.github.io — project notes

Static personal site (GitHub Pages). No build step; plain HTML/CSS/JS. Pages:
`index.html` (home + Recent), `publications.html`, `talks.html`, `projects.html`.
Shared styling in `css/styles.css`. Figures live in `viz/`.

## Publications workflow (IMPORTANT — read before editing publications)

Publications are the **single source of truth embedded inline** in
`publications.html`, in the `<script type="application/x-bibtex" id="bibtex-data">`
block near the bottom. The page parses that block directly (no `fetch`, no build), so
`publications.html` renders correctly whether **double-clicked (`file://`)** or served
over HTTP. There is **no `publications/publications.bib` source file** anymore — that
path is a git-ignored, regenerable artifact.

- **Add / edit a paper:** edit the `@entry` inside the `#bibtex-data` block. That's it.
- **Ordering:** the page sorts by `year` (newest first); within a year, entries render
  in block order. To pin a paper to the very top, make it the first entry in the block.
- **Status badges:** an optional `status={...}` field renders a pill. The slug is
  `status.toLowerCase().replace(/[^a-z0-9]+/g,'-')`, used as `.pub-status--<slug>`.
  `spotlight` is a bright-blue outline pill; `Best Paper · Societal Impact` is a gold
  outline pill (with 🏆, `.pub-status--best-paper-societal-impact`). All badges share the
  same outline-pill shape — only the color differs. Any other value falls back to green. Add CSS for a new named badge if you want custom
  styling. Omit `status` for already-published papers (no badge).
- **Never** reintroduce `fetch('publications/publications.bib')` — it breaks `file://`.
- **Extract a portable `.bib`:** `./scripts/extract-bib.sh` (writes
  `publications/publications.bib`; round-trips exactly). Don't treat that file as a source.
- Full field guide: `docs/PUBLICATIONS.md`.

## Figures / lightbox

`.media-row img` are click-to-zoom (lightbox in the inline script at the bottom of
`projects.html`). Give a single wide figure a fixed `height` (it centers via
`object-fit: contain`); the lightbox opens the full-resolution source. Photo-heavy
figures should be JPEG (small); diagram/plot figures PNG. Figures pulled from a paper
PDF: `pdftoppm -png -r 300 -f <page> -l <page> -x -y -W -H main.pdf out` to crop.
