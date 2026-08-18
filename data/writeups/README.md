# Writing a writeup

Every article in this folder is an `.mdx` file: Markdown, plus a handful of
custom components you can drop in like HTML tags. This is a quick syntax
reference, not a style guide.

## Frontmatter

Every file starts with a YAML block. `title`, `date`, and `summary` are
required in practice (the schema in `contentlayer.config.ts` only hard-requires
`title` and `date`); everything else is optional.

```yaml
---
title: 'My Writeup Title'
date: '2026-08-18'
tags: ['c-programming', 'low-level']
draft: false
summary: "One or two sentences shown in list views and social cards."
images: ['/static/images/portfolio/my-post/banner.avif']
authors: ['default']
layout: 'PostLayout'        # PostLayout | PostSimple | PostBanner
lastmod: '2026-08-20'       # only if updated after publishing
bibliography: 'my-post.bib' # for citations, see below
canonicalUrl: 'https://...' # if cross-posted elsewhere
---
```

Set `draft: true` to keep a post out of production while it's still in
progress — it stays visible during `bun run dev`.

## Markdown basics

Standard GFM (GitHub-flavored Markdown) works: `#` headings, `**bold**`,
`_italic_`, `` `code` ``, lists, `> blockquotes`, tables, and `[links](url)`.

````md
## Section heading

Regular paragraph with `inline code` and a [link](https://example.com).

```c
int main(void) {
    return 0;
}
```
````

Fenced code blocks get syntax highlighting, a copy button, and a language
icon automatically — just tag the language after the opening ` ``` `.

## Images

Plain Markdown image syntax works and is automatically routed through
Next's image optimizer:

```md
![Alt text](/static/images/portfolio/my-post/diagram.png)
```

## Math

`remark-math` + KaTeX are wired in, so LaTeX math works inline and as blocks:

```md
Inline: the quorum size is $Q_o = \lceil (n+f+1)/2 \rceil$.

Block:

$$
f + 1 \le n - Q_o
$$
```

## Custom components

These are registered in `components/content/MDXComponents.tsx` and can be
used anywhere in the body like JSX tags.

### `<GithubCard>`

Renders a live-data card (stars, language breakdown, etc.) for a repo.

```mdx
<GithubCard repo="jdecorte-be/minishell" />
<GithubCard repo="owner/repo" description="Optional override text" />
```

### `<Callout>`

GitHub-style alert box. `type` is one of `note` (default) `tip` `important`
`warning` `caution`.

```mdx
<Callout type="warning">
Don't run this against a machine you don't own.
</Callout>
```

### `<Theorem>`

Academic-style box for lemmas, theorems, definitions, etc. Content inside is
parsed as Markdown/MDX, so inline `$math$` works. `type` is one of `theorem`
(default) `lemma` `proposition` `corollary` `definition` `claim` `proof`.
`name` is an optional parenthesized label.

```mdx
<Theorem type="lemma" name="Strong Intersection">
Any two sets of size $Q_o$ overlap in at least $f+1$ honest parties.
</Theorem>
```

## Citations

If you set `bibliography` in the frontmatter (a `.bib` file in `data/`), cite
sources with standard Pandoc syntax and they'll render as a numbered
reference list at the end of the post:

```md
BGP was designed for inter-domain routing [@rekhter2006bgp].
```
