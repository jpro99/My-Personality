# Color Survey Teaching App

A classroom tool for the four-color communication survey (Blue, Gold, Green, Orange). Students rank survey statements; teachers decode score codes, scan teams, save results, and share QR profile cards.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # serve production build
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Browser smoke tests (Playwright) |
| `npm run lint` | ESLint |

## Score codes

**New format:** `Bl34-Yl29-Gn18-Or19` — Blue, Gold (Yl), Green (Gn), Orange.

**Legacy format** still works: `B34-G29-R18-O19`.

Each valid survey totals **100** across four colors (10 questions × 10 points each).

## Deploy

Build static assets and host `dist/` on any static host (Netlify, GitHub Pages, school web server). **HTTPS is recommended** for QR sharing and clipboard APIs.

```bash
npm run build
```

## Privacy

- Results save to **browser localStorage** only unless you export CSV.
- Share links encode name + color scores in the URL hash — share only with consent.
- This is a **teaching conversation tool**, not a clinical or employment assessment.

## Reference

See `colors training.pdf` in the repo root for facilitator background material.

## Project structure

```
src/
  data/content.js   # Questions, profiles, coaching copy
  lib/              # Scoring, codes, storage, share
  ui/               # Survey, results, teacher tools
```
