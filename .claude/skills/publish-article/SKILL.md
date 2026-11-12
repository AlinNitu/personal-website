---
name: publish-article
description: Publish a new Field Notes article on alinnitu.com. Use when Alin shares article text or a document and asks to add it to the site, or asks to add, publish, or update an article.
---

# Publish a Field Notes article

Articles are static HTML pages in `articles/`, styled entirely by `/assets/site.css`, and listed in the Writing section (`#writing`) of `index.html`.

## 1. Create the page

- Copy the newest file in `articles/` as the template. It has no inline styles, and its `<head>`, header, article-end block and footer are shared markup.
- Name it with a short kebab-case slug: `articles/<slug>.html`. The live URL is `/articles/<slug>`, without `.html`.
- Update `<title>` ("<Title> | Alin Nitu"), the `meta description`, `og:title` and `og:description`. Set `og:image` if there's an image.
- **Make sure `<head>` has the analytics tag:** `<script defer src="/_vercel/insights/script.js"></script>`.
- In `header.article-head`, fill in:
  - The kicker: `<span class="no">N° nn</span>` plus categories.
  - The serif `h1`, with its closing phrase in `<em>`.
  - The `.dek` standfirst.
  - The `.meta` line: author, a date like "19 Oct 2026", and reading time. Reading time is the word count divided by 200, rounded.
- Use Alin's text verbatim and never rewrite it. Put the body in `<article class="prose-article">`.
  - Numbered points become `h2` headings with `<span class="n">0N</span>`.
  - The final line or question becomes `<p class="closer">`.
- List the `h2` headings in `aside.toc`. Remove the aside if there are none.
- Add `<p class="ai-note">` only if Alin asks for it on that article.

## 2. Images

- Save images to `resources/` or `resources/articles/`. Give any changed image a new filename, because resources are cached for a year.
- Use `<figure><div class="panel"><img ... width height loading="lazy"></div><figcaption>Fig. NN — …</figcaption></figure>`.
- Write descriptive `alt` text.
- Check screenshots for personal or company details Alin hasn't redacted.

## 3. Homepage (`index.html`, `#writing`)

- Add an `<a class="post" href="/articles/<slug>">` at the top of `.posts`. It needs a `.date`, a serif `h3` title with a short description, and a `.cat` category with `<small>n min read</small>`.
- Unpublished pieces stay as `<div class="post soon">` with "Coming soon" in `.date`.
- If the article relates to a case study, link it from `work.html` too, with a "Related reading" line.

## 4. Verify, then ship

- Serve the site locally with clean URLs. Render the article and `#writing` at 1440px in Chrome and at iPhone width in WebKit. Confirm there's no horizontal overflow at 390px.
- Run `grep -L "_vercel/insights" index.html work.html articles/*.html`. It must print nothing.
- Commit to `main` (never `git add -A`; stage files by name) and push. Vercel deploys within about 30 seconds.
