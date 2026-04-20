# artfaal.ru

Personal landing page + CV. Static HTML + vanilla JS, no build step.

**Live:** https://artfaal.ru

## Quick start

```bash
# Local server
python3 -m http.server 8080

# Run tests
node test.js

# Generate PDF (Russian)
node generate-cv.js

# Generate PDF (English)
node generate-cv.js --en
```

## Editing content

All text lives in `src/js/content.js`. Edit there, reload browser.

**Important:** if you change Russian text — update English too (`CONTENT.ru` and `CONTENT.en`).

After editing, update `meta.last_updated` date.

## Adding images

```bash
# Convert to WebP (800px wide, quality 82)
cwebp -q 82 -resize 800 0 photo.jpg -o /assets/photo.webp
```

Only `.webp` files are tracked in git. Raw formats (jpg/png) are gitignored.

## Git hooks

Hooks live in `.githooks/` and run automatically:
- **Pre-commit:** runs tests, regenerates PDFs if content changed, updates sitemap lastmod
- Setup: `git config --local core.hooksPath .githooks`

## Deploy

Push to `master` — GitHub Pages deploys automatically. Domain: `artfaal.ru` via Cloudflare DNS.

## Stack

- Vanilla JS (no frameworks, no build step)
- CSS with custom properties
- Chrome headless for PDF generation
- GitHub Pages + Cloudflare
