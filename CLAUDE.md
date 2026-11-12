# alinnitu.com

Static personal site, no build step and no framework. Vercel deploys `main` to https://www.alinnitu.com on every push.

## Rules for every page

- **Every HTML page must include the Vercel Web Analytics tag** in its `<head>`, or its visits are not counted:

  ```html
  <script defer src="/_vercel/insights/script.js"></script>
  ```

  This applies to the homepage, `work.html`, every article in `articles/`, and any new page. Check it before committing a new page.
- Every page links `/assets/site.css` and `/assets/site.js` (deferred), the favicon set, and the Google Fonts URL used on the existing pages. Copy the `<head>` and the `site-header` and `site-footer` markup from an existing page.
- Use root-relative paths (`/resources/...`, `/assets/...`) everywhere, so pages work at their clean URLs.

## Structure

- `index.html` is the homepage, in plain semantic HTML. Its sections are hero, expertise, selected work, writing, independent projects, about and contact.
- `work.html` (served at `/work`) holds the depth: case studies for Indra Avitech and PwC, Moonfare and Billie, product notes for Maponim and Next Job Radar, the full experience timeline and the toolkit. Put detail here, not on the homepage.
- `articles/*.html` are the Field Notes articles. `vercel.json` sets `cleanUrls`, so `articles/foo.html` is served at `/articles/foo`.
- `assets/site.css` is the single design system: colour and type tokens on `:root`, then base, chrome, homepage sections, work page and articles. `assets/site.js` adds the header hairline, the mobile menu close and the contact form.
- The contact form posts to Web3Forms. The key is in `site.js`, and it is public by design. Keep its validation, error and success states working.
- `resources/` holds original images and the CV. `resources/web/` holds the resized copies the pages use. Everything in `resources/` is cached for a year, except PDFs, which revalidate on every request. To change an image, give it a new filename.
- `notes/` holds article source documents.
- `CLAUDE.md` and `.claude/` are excluded from deploys by `.vercelignore`.

## Design system

- Light, warm editorial: paper `#F7F6F2`, ink `#1B1C1D`, burnt orange `#CF603F` used sparingly. For small orange text use `--accent-ink`; `--accent` is too light for text.
- Schibsted Grotesk for UI and headings, Newsreader for serif accents and article body, IBM Plex Mono only for dates and small numbers.
- Each section is a label in the left margin plus content on the right (`.section-grid`). Contact is the one dark section.
- No cards-everywhere, badges, decorative diagrams or terminal motifs. Add an element only if it earns its place.

## Publishing an article

Use the `publish-article` skill in `.claude/skills/`. It covers the template, the homepage list and verification.

## Workflow

Commit and push straight to `main` unless asked for a branch. Check layout changes at phone width in WebKit, since mobile Safari has broken layouts here that Chrome rendered fine. Never commit stray personal files, such as CV drafts, that aren't part of the site.
