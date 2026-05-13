// Simple BibTeX parser and renderer for publications
class BibTeXParser {
    constructor() {
        this.entries = [];
    }

    // Parse BibTeX content
    parse(content) {
        // More robust regex that handles various line endings and whitespace
        const entryRegex = /@(\w+)\s*\{([^,]+),\s*([\s\S]*?)\n\s*\}/gm;
        let match;

        while ((match = entryRegex.exec(content)) !== null) {
            const type = match[1];
            const key = match[2];
            const fields = this.parseFields(match[3]);

            this.entries.push({
                type: type,
                key: key,
                ...fields
            });
        }

        console.log(`Parsed ${this.entries.length} entries from BibTeX file`);
        return this.entries;
    }

    parseFields(fieldsStr) {
        const fields = {};
        // More robust regex that handles nested braces and escaped characters
        const fieldRegex = /(\w+)\s*=\s*\{((?:[^{}]|\{[^}]*\})*)\}/g;
        let match;

        while ((match = fieldRegex.exec(fieldsStr)) !== null) {
            fields[match[1]] = match[2].trim();
        }

        return fields;
    }

    // Format author names: bold the target author
    formatAuthors(authors, boldName = "Ahmad A. Rushdi") {
        if (!authors) return "";

        const authorList = authors.split(" and ").map(author => {
            author = author.trim();
            if (author.includes(boldName)) {
                return `<b>${author}</b>`;
            }
            return author;
        });

        return authorList.join(", ");
    }

    // Generate HTML for a single entry
    renderEntry(entry) {
        const authors = this.formatAuthors(entry.author);
        const title = entry.title || "";
        const year = entry.year || "";
        const url = entry.url || "";

        let venue = "";

        // Handle different entry types
        if (entry.journal) {
            // Journal article
            venue = `<em>${entry.journal}</em>`;
            if (entry.volume && entry.number && entry.pages) {
                venue += ` ${entry.volume}(${entry.number}):${entry.pages}`;
            } else if (entry.volume && entry.number) {
                venue += ` ${entry.volume}(${entry.number})`;
            } else if (entry.volume && entry.pages) {
                venue += `, ${entry.volume}:${entry.pages}`;
            } else if (entry.volume) {
                venue += `, ${entry.volume}`;
            } else if (entry.pages) {
                venue += `, ${entry.pages}`;
            }
        } else if (entry.booktitle) {
            // Conference/proceedings or book chapter
            if (entry.type === 'inproceedings' || entry.type === 'incollection') {
                venue = 'In <em>' + entry.booktitle + '</em>';
                if (entry.volume) {
                    venue += `, volume ${entry.volume}`;
                }
                if (entry.pages) {
                    venue += `, ${entry.pages}`;
                }
                if (entry.publisher) {
                    venue += `. ${entry.publisher}`;
                }
            } else {
                venue = `<em>${entry.booktitle}</em>`;
                if (entry.pages) {
                    venue += `, ${entry.pages}`;
                }
            }
        } else if (entry.institution) {
            // Technical report
            venue = `Technical Report, ${entry.institution}`;
            if (entry.address) venue += `, ${entry.address}`;
        }

        let html = '<li><p>';
        html += authors + '. ';

        if (url) {
            html += `<a href="${url}">${title}.</a> `;
        } else {
            html += `${title}. `;
        }

        if (venue) {
            html += venue;
            if (!venue.endsWith('.')) html += '.';
            html += ' ';
        }

        html += `${year}.`;

        // Add note if present (e.g., "In Arabic")
        if (entry.note) {
            html += ` ${entry.note}.`;
        }

        html += '</p></li>';

        return html;
    }

    // Render all entries
    renderAll(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        // Sort by year (descending)
        const sorted = this.entries.sort((a, b) => {
            return parseInt(b.year) - parseInt(a.year);
        });

        let html = '';
        sorted.forEach(entry => {
            html += this.renderEntry(entry);
        });

        container.innerHTML = html;
    }
}

// Load and render publications from embedded data (no CORS issues)
function loadPublicationsFromData(bibContent, containerId) {
    try {
        console.log(`Loading ${bibContent.length} characters from BibTeX data`);

        const parser = new BibTeXParser();
        parser.parse(bibContent);
        parser.renderAll(containerId);

        console.log('Publications rendered successfully');
    } catch (error) {
        console.error('Error loading BibTeX data:', error);
        console.error('Error details:', error.message, error.stack);
        document.getElementById(containerId).innerHTML =
            `<li><p style="color: red;">Error loading publications: ${error.message}. Please check the console for details.</p></li>`;
    }
}

// Load and render publications from file (requires web server)
async function loadPublications(bibFile, containerId) {
    try {
        console.log(`Fetching BibTeX file: ${bibFile}`);
        const response = await fetch(bibFile);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const bibContent = await response.text();
        console.log(`Loaded ${bibContent.length} characters from BibTeX file`);

        const parser = new BibTeXParser();
        parser.parse(bibContent);
        parser.renderAll(containerId);

        console.log('Publications rendered successfully');
    } catch (error) {
        console.error('Error loading BibTeX file:', error);
        console.error('Error details:', error.message, error.stack);
        document.getElementById(containerId).innerHTML =
            `<li><p style="color: red;">Error loading publications: ${error.message}. Please check the console for details.</p></li>`;
    }
}
