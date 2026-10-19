# alinnitu.com

Static personal site, no build step. Vercel deploys `main` to https://www.alinnitu.com on every push.

## Rules for every page

- **Every HTML page must include the Vercel Web Analytics tag** in its `<head>`, or its visits are not counted:

  ```html
  <script defer src="/_vercel/insights/script.js"></script>
  ```

  This applies to the homepage, every article in `articles/`, and any new page. Check it before committing a new page.
- Use root-relative paths (`/resources/...`, `/favicon.svg`) in pages under `articles/`, so they work at their clean URLs.
- Include the favicon links that the existing pages use.

## Structure

- `index.html` is the homepage. It runs on the `support.js` template runtime (`{{ }}` bindings, `sc-if`, `sc-for`, `image-slot`). Edit its markup carefully and keep the bindings intact.
- `articles/*.html` are standalone static pages with no runtime script. `vercel.json` sets `cleanUrls`, so `articles/foo.html` is served at `/articles/foo`.
- `resources/` holds images and the CV. Everything there is cached for a year, except PDFs, which revalidate on every request. To change an image, give it a new filename.
- `notes/` holds article source documents.

## Publishing an article

Use the `publish-article` skill in `.claude/skills/`. It covers the template, the homepage card, the issue strip and verification.

## Workflow

Commit and push straight to `main` unless asked for a branch. Check layout changes at phone width in WebKit, since mobile Safari has broken layouts here that Chrome rendered fine.
