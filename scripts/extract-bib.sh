#!/usr/bin/env bash
#
# Extract a portable publications.bib from the single source of truth
# (the inline <script id="bibtex-data"> block in publications.html).
#
# Usage:
#   ./scripts/extract-bib.sh                 # writes publications/publications.bib
#   ./scripts/extract-bib.sh path/to/out.bib # writes to a custom path
#
set -euo pipefail

cd "$(dirname "$0")/.."
src="publications.html"
out="${1:-publications/publications.bib}"

awk '
  /<script type="application\/x-bibtex" id="bibtex-data">/ { grab=1; next }
  grab && /<\/script>/                                     { grab=0 }
  grab                                                     { print }
' "$src" > "$out"

echo "Wrote $out ($(grep -c '^@' "$out") entries)."
