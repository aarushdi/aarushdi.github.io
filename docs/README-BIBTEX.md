# BibTeX-Based Publications System

This website uses a BibTeX file to manage publications, making it easy to add new papers without editing HTML.

## How It Works

1. **publications.bib** - Your master BibTeX file containing all publications
2. **bibtex-data.js** - Auto-generated JavaScript file (embedded BibTeX data)
3. **bibtex-parser.js** - JavaScript parser that reads and formats the entries
4. **publications.html** - Dynamically loads and displays publications

## Adding New Publications

### Method 1: Add to BibTeX file (Recommended)

1. Open `publications.bib` in a text editor
2. Add your new BibTeX entry (example below)
3. Run the update script: `./update-bibtex.sh`
4. Open `publications.html` in your browser to verify

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
- ✅ Works offline (no web server needed)
- ✅ Maintains consistent formatting across all entries

## Manual Regeneration

If the script doesn't work, you can manually regenerate `bibtex-data.js`:

```bash
cat publications.bib | sed 's/\\/\\\\/g' | sed "s/'/\\\\'/g" | \
awk 'BEGIN {print "const BIBTEX_DATA = \`"} {print} END {print "\`;"}' > bibtex-data.js
```

## Troubleshooting

**Publications not showing?**
- Check browser console (F12) for errors
- Verify `bibtex-data.js` exists and has content
- Make sure BibTeX entries are properly formatted (matching braces, etc.)

**Wrong formatting?**
- Check that entry type (`@article`, `@inproceedings`, etc.) is correct
- Verify required fields are present (author, title, year)
- Check for special characters that need escaping

## Files Not to Edit Directly

- `bibtex-data.js` - Auto-generated, will be overwritten
- The publications list in `publications.html` - Now dynamic

## Files to Keep

- `publications.bib` - Your master source of truth for publications
- `update-bibtex.sh` - Helper script to regenerate data file
- `bibtex-parser.js` - Core parsing logic
