---
name: publish-article
description: Publish a new Field Notes article on alinnitu.com. Use when Alin shares article text or a document and asks to add it to the site, or asks to add, publish, or update an article.
---

# Publish a Field Notes article

Articles are standalone static HTML pages in `articles/`, linked from the Field Notes section (`#notes`) of `index.html`.

## 1. Create the page

- Copy the newest file in `articles/` as the template. Keep its `<style>` block, header, author block and footer.
- Name the file with a short kebab-case slug: `articles/<slug>.html`. The live URL is `/articles/<slug>`, with no `.html`.
- Update `<title>` to "<Title> | Alin Nitu", plus `meta description`, `og:title`, `og:description`, and `og:image` if the article has an image.
- **Make sure the analytics tag is in `<head>`:**

  ```html
  <script defer src="/_vercel/insights/script.js"></script>
  ```

- Fill in the head block:
  - Kicker: "N° <nn>" and the category labels.
  - Title, with the closing phrase in `<em>`.
  - Dek, which is the standfirst.
  - Meta: author, publish date in the form "19 Oct 2026", and reading time. Reading time is the word count divided by 200, rounded.
- Use Alin's text verbatim. Don't rewrite it. Turn existing numbered points into `h2`s with `<span class="n">0N</span>`. Set the final line or question as `<p class="closer">`.
- List the `h2`s in the `aside.toc` contents list. If there are no headings, remove the aside.
- Add the AI-assistance note (`<p class="ai-note">`) only if Alin asks for it on that article.

## 2. Images

- Save images to `resources/` or `resources/articles/`. Use a new filename for any changed image, because resources are cached for a year.
- Use `<figure><div class="panel"><img ... width height loading="lazy"></div><figcaption>Fig. NN — …</figcaption></figure>`.
- Write descriptive `alt` text.
- Check that screenshots don't expose personal or company details Alin hasn't redacted.

## 3. Homepage (`index.html`, `#notes`)

- Add the article to the Field Notes list with the next free number. Make it an `<a href="/articles/<slug>">` with the label "<Category> · Published <date> · <n> min", the serif title and the dek.
- Items that aren't published yet are non-link `<div>`s marked "Coming soon", greyed out (`color:#8D9299`). Renumber them so published articles come first.
- Update the issue strip ("Issue NN · <Month Year>" and "<N> articles published…").

## 4. Verify, then ship

- Serve the site locally (`python3 -m http.server 8080`). Render the article and the `#notes` section at 1440px in Chrome and at iPhone width in WebKit. Confirm the document has no horizontal overflow at 390px.
- Run `grep -L "_vercel/insights" index.html articles/*.html`. It must print nothing.
- Commit to `main` and push. Vercel deploys within about 30 seconds.
