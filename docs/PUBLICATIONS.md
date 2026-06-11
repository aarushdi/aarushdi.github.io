# Managing publications

All publications live in one file: **`publications/publications.bib`**. It is the
single source of truth. `publications.html` fetches it directly in the browser and
renders it — there is **no build step and no generated data file** to keep in sync.

## Add a publication

1. Open `publications/publications.bib`.
2. Copy an existing entry of the same type and edit its fields (see below).
3. Commit and push. The live site updates itself.

To preview locally first, serve over HTTP (a browser blocks `fetch()` on `file://`):

```bash
python3 -m http.server          # then open http://localhost:8000/publications.html
```

## Examples

Journal article:

```bibtex
@article{rushdi2025example,
  author = {Ahmad A. Rushdi and Other Author},
  title  = {Your Paper Title Here},
  journal = {Journal Name},
  volume = {10}, number = {3}, pages = {100--120},
  year = {2025},
  url = {https://example.com/paper.pdf}
}
```

Workshop paper held at a conference — note that the workshop **and** its host
conference each get their own link:

```bibtex
@inproceedings{rushdi2026example,
  author = {Ahmad A. Rushdi},
  title  = {Your Workshop Paper Title},
  year   = {2026},
  booktitle = {Workshop on Some Topic},            % the venue name
  venueurl  = {https://the-workshop-site.org},      % links the workshop name
  host      = {ICML 2026},                           % the host conference
  hosturl   = {https://icml.cc/},                    % links the host conference
  url       = {https://openreview.net/pdf?id=XXXX}   % the PAPER PDF
}
```

## Entry types

| Type | For | Required | Common optional |
|---|---|---|---|
| `@article` | Journal papers | author, title, journal, year | volume, number, pages, url, venueurl |
| `@inproceedings` | Conference / workshop papers | author, title, booktitle, year | pages, publisher, url, venueurl, host, hosturl |
| `@incollection` | Book chapters | author, title, booktitle, year | pages, publisher, url, venueurl |
| `@techreport` | Technical reports | author, title, institution, year | address, url |

## Fields

- **author** — names joined by ` and ` (e.g. `Ahmad A. Rushdi and Jane Doe`). Your
  name is auto-bolded.
- **title** — paper title.
- **year** — used for sorting (newest first).
- **url** — link to the **paper itself**, as a **direct PDF**. For OpenReview use
  `pdf?id=...`, *not* the `forum?id=...` review page; strip any `&referrer=`/`&noteId=`.
- **journal** — journal name (`@article`).
- **booktitle** — venue name (`@inproceedings`/`@incollection`). For a workshop, put
  just the workshop name here and the host conference in `host`.
- **venueurl** *(optional)* — makes the journal/booktitle name link to the event site.
- **host**, **hosturl** *(optional)* — adds the host conference of a workshop
  (e.g. `ICML 2026`) as a second, separately-linked chunk after the venue.
- **volume**, **number**, **pages** — page ranges use `--` (e.g. `100--120`).
- **institution**, **address** — for `@techreport`.
- **publisher** — for proceedings / chapters.
- **note** — extra note (e.g. `In Arabic`).

## Don't

- Don't hand-edit the rendered list in `publications.html` or add a separate data
  file — everything lives in the `.bib`.
- `js/bibtex-parser.js` only needs editing to change layout/formatting.

## Troubleshooting

- **Nothing shows / blank list** — if previewing locally, use `http://localhost`
  (not a `file://` path); the page fetches the `.bib`, which `file://` blocks.
- **A paper is missing or malformed** — check the entry for balanced braces and
  commas, and that required fields are present.
