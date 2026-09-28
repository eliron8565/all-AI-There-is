# AI Atlas — All AI There Is

A polished, bilingual AI-tools directory built for GitHub Pages.

## What is included

- **Hebrew by default** with a full English switch
- **78 AI tools** across chat, coding, research, study, image, video, audio, automation, local AI and more
- Real tool icons loaded from each product's domain
- Responsive desktop, tablet and mobile layout
- Dark / light mode
- Search by tool, maker, category, description or tag
- Category, pricing, student and favorites filters
- Sort by recommended order, A–Z, Z–A or free-first
- Featured-tool spotlight
- Student Hub with clearly described offers
- Favorites stored locally in the browser
- Tool detail dialog with official link and copy-link action
- Animated UI with reduced-motion support
- SEO metadata and custom AI Atlas favicon

## Student offers

Student benefits change over time, by country and by institution. The directory only marks offers as student offers when the catalog has a clear current basis for doing so, and users are always directed to the provider's official website before purchasing or signing up.

Current highlighted entries include:
- GitHub Copilot Student
- Perplexity Education Pro
- Adobe student/teacher Creative Cloud offers that include Firefly features
- Notion Education Plan information, with a note that AI availability depends on the current workspace plan

## Project structure

```
/
├── index.html
├── styles.css
├── app.js
├── assets/
│   └── favicon.svg
└── data/
    └── tools.json
```

## Add or edit a tool

Edit `data/tools.json`. Each entry supports bilingual descriptions:

```json
{
  "name": "Tool name",
  "maker": "Company",
  "url": "https://official-site.example",
  "category": "Coding",
  "pricing": "freemium",
  "student": false,
  "studentOfferHe": "",
  "studentOfferEn": "",
  "tags": ["coding", "agent"],
  "descHe": "תיאור בעברית",
  "descEn": "English description"
}
```

Supported pricing values: `free`, `freemium`, `paid`.

## GitHub Pages

Publish from **Settings → Pages → Deploy from a branch → main → /(root)**.

The expected public URL is:

`https://eliron8565.github.io/all-AI-There-is/`

## Notes

The site is intentionally data-driven. Adding tools to `data/tools.json` automatically updates search, counts, filters, categories and cards without needing to change the HTML.
