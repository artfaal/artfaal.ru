# Vendored web fonts

WOFF2 files are unmodified downloads from the Google Fonts CSS API. The exact
URLs and SHA-256 checksums are recorded in [sources.json](sources.json).
Unicode ranges and weight ranges are retained in [fonts.css](../styles/fonts.css).

Each family is distributed under the SIL Open Font License. Its copyright
notice and license are included alongside the font files:

- [Caveat](caveat-OFL.txt)
- [IBM Plex Mono](ibmplexmono-OFL.txt)
- [Inter Tight](intertight-OFL.txt)
- [JetBrains Mono](jetbrainsmono-OFL.txt)

Fonts are kept under `src/` because `assets/` is reserved for site images and PDFs.
Update font files, CSS, checksums, and licenses together. The site must remain
independent of external font services at runtime.
