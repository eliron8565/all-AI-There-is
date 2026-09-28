# AI Atlas — All AI There Is

A modern, searchable directory of AI tools, built as a static website for GitHub Pages.

## Included

- Responsive Hebrew-first UI with English toggle
- Dark / light themes
- Search by tool, maker, use case or tag
- Category and pricing filters
- Student-offer filter
- Favorites saved locally in the browser
- Random "Surprise me" discovery
- Tool details modal with official links
- Data-driven catalog in `data/tools.json`

## Student information

Student offers can change by country, institution and date. The site deliberately links users to the official provider before purchase or signup.

Examples verified while building the first version:
- GitHub Copilot: verified students in GitHub Education can access Copilot Student for free.
- Notion: eligible higher-education students can get the Education plan free; AI feature availability/pricing can differ from the workspace plan.
- Perplexity: Education Pro is offered to verified students and educators at a discount.
- Cursor: current student/campus promotions can vary; check Cursor's official student pages for active eligibility.
- Adobe: student/teacher plans and Firefly options vary by plan and region.

## Add another AI tool

Edit `data/tools.json` and add an object:

```json
{
  "name": "Tool name",
  "maker": "Company",
  "url": "https://official-site.example",
  "category": "Category",
  "pricing": "freemium",
  "student": false,
  "studentOffer": "",
  "tags": ["chat", "study"],
  "desc": "Short description"
}
```

Supported `pricing` values: `free`, `freemium`, `paid`.

## Publish on GitHub Pages

In the repository open **Settings → Pages** and choose **Deploy from a branch**, then select **main** and **/(root)**.  
The website will then be available through the repository's GitHub Pages URL.

---

Built to be easy to expand: the UI code does not need to change when new tools are added to the JSON catalog.
