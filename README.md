# Ahmad A. Rushdi - Personal Website

Personal homepage: [aarushdi.github.io](https://aarushdi.github.io)

Last Updated: November 2024

## 📁 Folder Structure

```
aarushdi.github.io/
├── index.html              # Main landing page (home)
├── publications.html       # Publications page (BibTeX-powered)
├── talks.html             # Invited talks
├── projects.html          # Selected projects
├── README.md              # This file
│
├── assets/                # Images and icons
│   ├── Ahmad_web_bw.png  # Profile photo
│   └── favicon.ico       # Site icon
│
├── css/                   # Stylesheets
│   └── styles.css        # Main stylesheet (emerald/teal theme)
│
├── js/                    # JavaScript files
│   ├── bibtex-data.js    # Auto-generated BibTeX data (don't edit)
│   └── bibtex-parser.js  # BibTeX parser and renderer
│
├── publications/          # Publication management
│   ├── publications.bib  # Master BibTeX file (edit this!)
│   └── update-bibtex.sh  # Script to regenerate bibtex-data.js
│
├── docs/                  # Documentation
│   ├── HOW-TO-ADD-PUBLICATIONS.txt  # Quick guide
│   └── README-BIBTEX.md             # Detailed BibTeX docs
│
└── viz/                   # Project visualizations and assets
    ├── app/
    ├── bio/
    ├── collision/
    ├── library/
    ├── mesh/
    ├── UQ/
    └── VPS/
```

## 🚀 Quick Start

### Updating Publications

1. Edit `publications/publications.bib` to add new papers
2. Run: `cd publications && ./update-bibtex.sh`
3. Refresh `publications.html` in your browser

See `docs/HOW-TO-ADD-PUBLICATIONS.txt` for details.

### Updating Content

- **Biography**: Edit `index.html` (main page)
- **Talks**: Edit `talks.html`
- **Projects**: Edit `projects.html`
- **Styles**: Edit `css/styles.css`

## 🎨 Design Features

- **Modern emerald/teal color theme**
- **Responsive design** (works on mobile & desktop)
- **Interactive elements** with hover effects and animations
- **BibTeX integration** for easy publication management
- **Arabic + English typography** with Google Fonts (Cairo, Nunito)

## 📝 Key Files

### Main Pages
- `index.html` - Home page with biography and recent activities
- `publications.html` - Dynamically loads from BibTeX
- `talks.html` - List of invited talks
- `projects.html` - Selected research projects

### Configuration
- `css/styles.css` - All styling (colors, fonts, animations)
- `publications/publications.bib` - Publication data in BibTeX format

### Scripts
- `publications/update-bibtex.sh` - Regenerates JS data from BibTeX
- `js/bibtex-parser.js` - Parses and formats BibTeX entries

## 🔧 Maintenance

### Adding a Publication
```bash
# 1. Edit the BibTeX file
open publications/publications.bib

# 2. Regenerate the data file
cd publications && ./update-bibtex.sh

# 3. Verify
open publications.html
```

### Changing Colors
Edit `css/styles.css` and modify the CSS variables in `:root`:
```css
:root {
    --emerald-primary: #047857;
    --emerald-light: #10b981;
    --teal-accent: #14b8a6;
    /* ... */
}
```

## 📱 Mobile Support

The site is fully responsive with breakpoints at:
- `900px` - Tablets and larger phones
- `480px` - Small phones (portrait)

## 🌐 Deployment

This site is hosted on GitHub Pages. To deploy changes:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Changes will appear at `aarushdi.github.io` within a few minutes.

## 📚 Documentation

- `docs/HOW-TO-ADD-PUBLICATIONS.txt` - Step-by-step publication guide
- `docs/README-BIBTEX.md` - Complete BibTeX system documentation

## 🎯 Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables, animations, gradients
- **JavaScript** - BibTeX parsing and dynamic content
- **BibTeX** - Academic publication management
- **GitHub Pages** - Hosting and deployment

---

**Ahmad A. Rushdi**
Research Scientist
Director, Industry Research
Stanford HAI

Last updated: November 2024
