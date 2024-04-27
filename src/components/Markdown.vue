<template>
    <div class="markdown" v-html="markdown.render(source)"></div>
</template>

<script setup lang="ts">
import "highlight.js";
import "highlight.js/styles/github-dark.css";

import MarkdownIt from "markdown-it";
// @ts-ignore
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItAnchor from "markdown-it-anchor";
// @ts-ignore
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
// @ts-ignore
import MarkdownItSub from "markdown-it-sub";
// @ts-ignore
import MarkdownItSup from "markdown-it-sup";
// @ts-ignore
import MarkdownItTasklists from "markdown-it-task-lists";
import MarkdownItTOC from "markdown-it-toc-done-right";

const markdown = new MarkdownIt()
    .use(MarkdownItAbbr)
    .use(MarkdownItAnchor)
    .use(MarkdownItFootnote)
    .use(MarkdownItHighlightjs)
    .use(MarkdownItSub)
    .use(MarkdownItSup)
    .use(MarkdownItTasklists)
    .use(MarkdownItTOC);

defineProps<{
    source: string
}>()
</script>

<style lang="scss">
/* Basic Structure for Markdown Content */
.markdown {

    /* Paragraphs */
    p {
        margin-top: 8px;
        margin-bottom: 8px;
        line-height: 1.6;
        /* Improve readability */
    }

    /* Headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 1.2em;
        /* Consistent spacing above headings */
        margin-bottom: 0.8em;
        font-weight: 600;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.75em;
    }

    /* ... (adjust font sizes as needed) */

    /* Links */
    a {
        color: #007bff;
        /* Standard blue link color */
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    /* Lists (Ordered and Unordered) */
    ul,
    ol {
        margin-top: 0.5em;
        margin-bottom: 1em;
        padding-left: 2em;

        /* Indent list items */
        li {
            margin-bottom: 0.3em;
        }
    }

    ul {
        li {
            list-style: disc;

            ul {
                li {
                    list-style: square;
                }
            }

            ol {
                li {
                    list-style: lower-alpha;
                }
            }
        }
    }

    ol {
        li {
            list-style: decimal;

            ol {
                li {
                    list-style: lower-alpha;
                }
            }

            ul {
                li {
                    list-style: square;
                }
            }
        }
    }

    /* Block Quotes */
    blockquote {
        border-left: 4px solid #ccc;
        padding-left: 1em;
        color: #6c757d;
        /* Slightlymuted color for quotes */
    }

    /* Code Blocks and Inline Code */
    code {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: small;
        color: #77d48d;
        padding: 2px 4px;
    }

    pre {
        /* For code blocks */
        padding: 1em;
        overflow: auto;
        /* Enable horizontal scrolling for long lines */
    }

    /* Images */
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1em auto;
        /* Center images */
    }

    /* Horizontal Rule */
    hr {
        border: 0;
        /* Remove default border */
        border-top: 1px solid #ccc;
        /* Add a simple top border */
        margin: 1em 0;
        /* Add spacing above and below */
    }
}
</style>
