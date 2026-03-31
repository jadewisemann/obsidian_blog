import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// @ts-ignore
import remarkWikiLink from 'remark-wiki-link';
import remarkMocCards from './remarkMocCards';
import remarkObsidianHighlight from './remarkObsidianHighlight';

// vercel-react-best-practices: server-hoist-static-io
// Hoisting the MDX options to prevent recreation on every render
export const markdownOptions: any = {
    mdxOptions: {
        remarkPlugins: [
            remarkBreaks,
            remarkGfm,
            // Feature 3: LaTeX math — must run before other plugins
            remarkMath,
            // Feature 1: Wiki-links with alias support [[target|alias]]
            // remark-wiki-link splits on aliasDivider: value = display text, data.alias = target
            [remarkWikiLink, {
                pathFormat: 'relative',
                wikiLinkClassName: 'wiki-link',
                aliasDivider: '|',
                pageResolver: (name: string) => [name],
                hrefTemplate: (permalink: string) => `/${permalink}`,
            }],
            remarkMocCards,
            // Feature 2: ==highlight== → <mark>
            remarkObsidianHighlight,
        ],
        rehypePlugins: [
            // Feature 3: Render math nodes as KaTeX HTML (server-side, no JS needed client-side)
            [rehypeKatex, { output: 'html' }],
        ],
    }
};

