# Portfolio

A static React portfolio with separate pages for Home, Summary, Experience, Skills, Links, and individual project case studies. It has no backend or database.

## Edit your content in one file

All personal content lives in `src/data/portfolio.json`.

| What to change | JSON field |
| --- | --- |
| Browser title and description | `site.title`, `site.description` |
| Navigation labels and order | `site.navigation` |
| Name, role headline, email, phone, location | `profile` |
| Availability message | `profile.availability` |
| Background photograph and crop | `profile.heroImage` |
| CV button label and destination | `profile.resume` |
| Introduction | `summary.paragraphs` |
| Companies and roles | `experiences` |
| Project cards and case studies | `projects` |
| Skill categories and skills | `skillGroups` |
| Education | `education` |
| Languages | `languages` |
| Social links | `links` |

Keep the existing field names. Change their values or copy complete array entries. Arrays appear in the order written in the JSON.

Use double quotes for strings, unquoted `true` / `false` / `null`, and commas between entries. Do not leave a comma after the final entry. JSON does not support comments.

## Add an experience

Copy one existing object inside `experiences`, give it a unique `id`, and edit the details. Here is a complete example object:

```json
{
  "id": "example-company",
  "company": "Example Company",
  "role": "SDET",
  "type": "employment",
  "startDate": "2026-01",
  "endDate": null,
  "description": ["Describe your actual role and scope."],
  "highlights": ["Describe one contribution you want to highlight."],
  "tools": ["Java", "TestNG", "REST Assured"]
}
```

Dates use `YYYY-MM`. Use `null` for a current role's `endDate`, or a date such as `"2026-06"` for a completed role. Put the newest experience first if you want reverse chronological order. No component changes are needed.

An `id` is a stable identifier: use lowercase letters, numbers, and hyphens. Company names can contain normal punctuation and spaces. If you change an existing experience's `id`, update the matching `experienceId` in its projects too. Editing just the displayed company name does not require this.

## Add a project

Copy one object inside `projects`, set a unique `id`, and set `experienceId` to the exact ID of its parent experience. This creates both a card under that company and a page at `/projects/your-project-id`.

```json
{
  "id": "example-api-automation",
  "experienceId": "example-company",
  "title": "API Regression Automation",
  "subtitle": "Service-level test coverage",
  "isDraft": true,
  "cover": {
    "src": "",
    "alt": "API automation project preview"
  },
  "overview": "Replace this with your project context and scope.",
  "responsibilities": ["Describe your contribution."],
  "outcomes": [],
  "tools": ["Java", "REST Assured"],
  "gallery": [],
  "links": []
}
```

This example assumes you added `example-company` above. Otherwise, use an existing experience ID such as `swiggy`.

An empty image `src` hides the image until you have one. Add its actual path or URL when ready. `isDraft: true` displays a draft label on the case-study page. Set it to `false` once the copy is accurate and ready to publish; it does not control whether the project is visible. Add measured outcomes only when you have real results.

Keep unused arrays as `[]`. Empty outcomes, gallery, tools, and project-links sections are omitted automatically. Removing an object from `projects` removes both its card and detail page; old links will show the page-not-found message.

### Add project gallery images

Replace a project's empty `gallery` array with entries like:

```json
[
  {
    "src": "/images/projects/example-report.png",
    "alt": "Automation report showing the tested workflows",
    "caption": "Regression report"
  }
]
```

Upload the actual image before using that path. `caption` is optional. Use distinct image paths within one gallery.

### Add project links

Replace a project's empty `links` array with entries like:

```json
[
  {
    "label": "Source code",
    "url": "https://github.com/your-username/your-project"
  }
]
```

Replace this example URL with a real destination. Project and social links require full `https://` or `http://` URLs.

## Add skills

Add another string to an existing group's `items` array. To create a new category, copy an entire object inside `skillGroups`:

```json
{
  "id": "delivery",
  "title": "Build and delivery",
  "items": ["GitHub Actions", "Docker"]
}
```

Keep category IDs unique. Education entries and social-link entries also need unique IDs within their own lists.

## Change your photo or CV

An image can use a complete image URL or a file committed under `public`.

For example, if you add `public/images/profile/my-photo.jpg`, set:

```json
{
  "src": "/images/profile/my-photo.jpg",
  "alt": "Portfolio background",
  "position": "center center",
  "mobilePosition": "75% center"
}
```

This object replaces `profile.heroImage`. `position` controls the desktop crop, and optional `mobilePosition` controls the phone crop. The background is decorative for screen readers. Keep descriptive alt text on project images.

The JSON path starts with `/images`, not `/public/images`. File names are case-sensitive when deployed. Commit binary images as files; do not paste image contents into JSON. Existing Framer image URLs work without uploading anything now.

For a local CV, add `public/documents/resume.pdf`, then use:

```json
{
  "label": "View CV",
  "url": "/documents/resume.pdf"
}
```

This object replaces `profile.resume`. Its URL can also be your existing Google Drive link. An empty resume URL (`""`) hides the button. Set `profile.availability.visible` to `false` to hide the availability message.

## Pages and navigation

The available section paths are `/`, `/summary`, `/experience`, `/skills`, and `/links`. Change navigation labels or order in JSON, but keep these paths. Creating an entirely new type of page requires a React page component and a route; adding experiences, skills, projects, and gallery images does not.

Project URLs are derived from their IDs, so keep IDs stable after sharing links.

## Local commands

Run these in the repository folder on the computer that will run the site:

```sh
npm ci
npm run dev
```

Additional checks:

```sh
npm run validate
npm run lint
npm run build
```

`validate` checks the JSON structure, required fields, date formats and ordering, unique IDs, navigation paths, and project-to-experience references. It reports field paths such as `projects[2].experienceId`; array indexes start at zero, so `[2]` means the third entry.

Validation runs before the development server starts and before every production build. During an already-running development session, run `npm run validate` after content edits if you want to check them immediately. It does not check factual accuracy, fetch remote URLs, verify image files exist, or validate every CSS crop value.

The Firefox `vscode.dev` editor is for editing and committing. These npm commands run in your local terminal, not in that browser editor. GitHub edits do not automatically update a separate Windows checkout.

## Repository structure

```text
src/
  components/       Shared navigation, layout, images, and project cards
  data/
    portfolio.json  All personal content
  pages/            One component for each page type
  utils/            Reusable formatting helpers
  App.jsx           Page routing
  index.css         Global styles and theme constants
scripts/
  validate-portfolio.mjs
public/             Uploaded images and documents
index.html          Font/icon loading and HTML shell
vercel.json         Routing rules for direct page URLs
```

Change the main colors and font token in `src/index.css`. Icon mappings live in `src/components/Icon.jsx`; navigation icon mappings live in `BottomNav.jsx`. These are presentation settings, not personal data.

## Deployment preparation

The intended Vercel build command is `npm run build`, with output directory `dist`. Keep `vercel.json` at the repository root so direct page and project URLs can load. This repository is prepared for that deployment; deployment setup and live verification are a separate step.

Fonts currently load from Google Fonts, icons from Bootstrap Icons through jsDelivr, and existing photographs/project artwork from Framer. Self-hosting those assets can be done later.
