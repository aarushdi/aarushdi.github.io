# BibTeX-Based Publications System

This website uses a BibTeX file to manage publications, making it easy to add new papers without editing HTML.

## How It Works

1. **publications.bib** - The single source of truth: every publication lives here
2. **bibtex-parser.js** - Fetches `publications.bib`, then parses and formats the entries
3. **publications.html** - Loads `publications.bib` directly in the browser and renders it

There is no generated/intermediate data file and no build step. `publications.html`
calls `fetch('publications/publications.bib')` at load time. (The former
`js/bibtex-data.js` + `update-bibtex.sh` were removed because the generated copy
could silently drift out of sync with the `.bib`.)

## Adding New Publications

1. Open `publications.bib` in a text editor
2. Add your new BibTeX entry (example below)
3. Commit and push — done.

To preview locally, serve over HTTP (`fetch` is blocked on `file://` URLs):
`python3 -m http.server`, then open `http://localhost:8000/publications.html`.

### Example BibTeX Entry

```bibtex
@article{rushdi2025example,
  author = {Ahmad A. Rushdi and Other Author},
  title = {Your Paper Title Here},
  journal = {Journal Name},
  volume = {10},
  number = {3},
  pages = {100--120},
  year = {2025},
  url = {https://example.com/paper}
}
```

### Supported Entry Types

- `@article` - Journal articles
- `@inproceedings` - Conference papers
- `@techreport` - Technical reports
- `@incollection` - Book chapters
- `@book` - Books

### Supported Fields

- `author` - Author names separated by "and" (your name will be auto-bolded)
- `title` - Paper title
- `year` - Publication year
- `url` - Link to paper (optional)
- `journal` - Journal name (for articles)
- `booktitle` - Conference/book name (for proceedings/chapters)
- `volume`, `number`, `pages` - Publication details
- `institution`, `address` - For technical reports
- `publisher` - Publisher name
- `note` - Additional notes (e.g., "In Arabic")

## Features

- ✅ Automatically sorts publications by year (newest first)
- ✅ Auto-bolds "Ahmad A. Rushdi" in author lists
- ✅ Formats venues based on entry type (journal, conference, etc.)
- ✅ Maintains consistent formatting across all entries

## Troubleshooting

**Publications not showing?**
- Check browser console (F12) for errors
- If previewing locally, use `http://localhost` (via `python3 -m http.server`),
  not a `file://` path — the page fetches the `.bib` and `fetch` is blocked on `file://`
- Make sure BibTeX entries are properly formatted (matching braces, etc.)

**Wrong formatting?**
- Check that entry type (`@article`, `@inproceedings`, etc.) is correct
- Verify required fields are present (author, title, year)
- Check for special characters that need escaping

## Files

- `publications.bib` - The single source of truth for publications (edit this)
- `bibtex-parser.js` - Core parsing/formatting logic (edit only to change layout)
- Do **not** add a separate data file or hand-edit the rendered list in
  `publications.html` — keep everything in the `.bib`
