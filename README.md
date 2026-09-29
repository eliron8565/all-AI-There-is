# AI Atlas — All AI There Is

A polished, bilingual AI-tools directory built for GitHub Pages.

## What is included

- **Hebrew by default** with a full English switch
- **131 AI tools** across chat, coding, research, study, image, video, audio, automation, local AI and more
- Real tool icons loaded from each product's domain
- Responsive desktop, tablet and mobile layout
- Platform availability for every tool: Web, Windows, macOS, Linux, Android and iPhone/iPad
- Platform filter, including a combined mobile-app filter
- Platform badges directly on tool cards and detailed availability inside each tool dialog
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

## Platform metadata

Each tool in `data/tools.json` includes a `platforms` array. Supported values are `web`, `windows`, `macos`, `linux`, `android`, and `ios`. Optional `platformNoteHe` and `platformNoteEn` fields can explain special cases such as IDE extensions or local browser interfaces.


## 2026-09-29 redesign

- Completely rebuilt interface using an AI command-center layout
- Fixed desktop sidebar + mobile bottom navigation
- Smart collections for unlimited free, local AI, students and mobile apps
- 131 AI tools across 30 categories
- 53 newly added tools are marked with a NEW badge
- Newest-first sorting
- 11 verified local/unlimited-free entries
- Added categories including AI Agents, Data & Analytics, 3D & Assets, Legal AI, Marketing & SEO, Sales & CRM, Customer Support, PDF & Documents, and Career & Resume
