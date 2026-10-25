# Personal resume (GitHub Pages)

Static fullstack resume for **Dang Anh Van** - two-column layout, responsive, and a **vector PDF** generated from the same HTML/CSS (Chromium print pipeline, not canvas screenshots).

**Live site:** [https://davan1802-tech.github.io](https://davan1802-tech.github.io)

## Features

- Single-page CV: `index.html` + `style.css`
- **Download PDF** - real text in the PDF (selectable / editable in typical PDF tools)
- **Print / PDF typography** - slightly larger fonts under `@media print` than on screen
- **GitHub Actions** - on push to `main`, installs Playwright, runs `npm run pdf`, deploys `index.html`, `style.css`, and `Dang_Anh_Van_Fullstack_Developer_CV.pdf` to Pages

## Tech stack

- HTML5, CSS3 (no UI framework)
- System fonts (Georgia, Helvetica Neue, etc.)
- [Playwright](https://playwright.dev/) (Chromium) - dev dependency for `npm run pdf` only

## Local preview

1. Clone the repo.
2. Open `index.html` in a browser (double-click or a local static server, etc.).

The download link points to `Dang_Anh_Van_Fullstack_Developer_CV.pdf`. If that file is missing, generate it (below).

## Regenerate the CV PDF

Requires **Node.js 18+** (CI uses 20).

```bash
npm ci
npx playwright install chromium
npm run pdf
```

This runs `scripts/generate-pdf.mjs`, opens `index.html` with **print** media, and writes `Dang_Anh_Van_Fullstack_Developer_CV.pdf` next to `index.html`.

On Windows, close the PDF if it is open - otherwise the write step can fail with `EBUSY`.

To use an already installed Google Chrome instead of downloading Chromium, run
`PLAYWRIGHT_CHANNEL=chrome npm run pdf` (macOS/Linux).

## Deploy

Push to **`main`**. Workflow: [.github/workflows/static.yml](.github/workflows/static.yml) (build PDF, stage `_site`, deploy to GitHub Pages).

## Repository layout

| Path | Role |
|------|------|
| `index.html` | CV markup |
| `style.css` | Screen + print styles |
| `Dang_Anh_Van_Fullstack_Developer_CV.pdf` | Built CV (optional commit; CI rebuilds) |
| `package.json` | npm script `pdf` |
| `package-lock.json` | Lockfile for CI `npm ci` |
| `scripts/generate-pdf.mjs` | Playwright to PDF |
| `.github/workflows/static.yml` | Pages deploy + PDF build |
| `README.md` | This file |

`node_modules/` is gitignored; install locally with `npm ci`.

## Editing content

Change **`index.html`** and **`style.css`**, then run **`npm run pdf`** and commit the updated PDF if you want the download on raw clones to match without waiting for CI.

## Content verification before applying

This draft targets the [GCT Solutions TypeScript/Python Fullstack role](https://gct-solutions.net/career/recruitment/fullstack-dev-typescript-python).
TypeScript and Python skills were confirmed by the CV owner. The following project-specific additions are hypothetical and must be verified or replaced with actual work before submitting this CV:

- ZLP: Python/FastAPI endpoints for warehouse summaries and LLM-assisted insights, with Pydantic validation; the Python, FastAPI, and Pydantic stack entries and related framework skills are unverified.
- Digital Payment Gateway: Python scripts for PostgreSQL reconciliation, discrepancy detection, and reports; the Python stack entry is unverified.

These draft statements are included in both the HTML and generated PDF. Seven years refers to overall software engineering experience, not Python/TypeScript tenure. No new English proficiency equivalence or JD-specific vendor experience is asserted.
