# Managing publications

All publications live **inline in `publications.html`**, inside the
`<script type="application/x-bibtex" id="bibtex-data">` block near the bottom of the
file. That block is the single source of truth — it holds plain BibTeX. The page reads
it directly, so there is **no build step, no fetch, and no separate data file** to keep
in sync, and the page renders whether you **double-click it** or serve it over HTTP.

## Add a publication

1. Open `publications.html` and scroll to the `id="bibtex-data"` block.
2. Copy an existing entry of the same type and edit its fields (see below).
   Append it inside the block, before the closing `</script>`.
3. Commit and push. The live site updates itself.

To preview, just open `publications.html` in your browser (double-click works) or serve
it over HTTP — both render identically.

## Extract a portable `.bib`

The inline block *is* valid BibTeX, so a standalone file is one command away:

```bash
./scripts/extract-bib.sh                  # writes publications/publications.bib
./scripts/extract-bib.sh path/to/out.bib  # or a custom path
```

The extracted file is a derived artifact (git-ignored) — regenerate it anytime; don't
hand-edit it as a source.

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

- Don't put a literal `</script>` inside the block — it would end it early. (Normal
  BibTeX never contains this.)
- Don't hand-edit the JS-rendered list or treat an extracted `publications.bib` as a
  source — everything lives in the `#bibtex-data` block.
- `js/bibtex-parser.js` only needs editing to change layout/formatting.

## Troubleshooting

- **A paper is missing or malformed** — check the entry for balanced braces and
  commas, and that required fields are present.
- **Whole list vanished** — you likely left a stray `</script>` or an unbalanced brace
  inside the block; the parser stops at the first break.
