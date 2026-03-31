// @status: STABLE - DO NOT MODIFY WITHOUT EXPLICIT USER APPROVAL
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
// @ts-ignore
import remarkWikiLink from 'remark-wiki-link';
import remarkMocCards from './remarkMocCards';

// vercel-react-best-practices: server-hoist-static-io
// Hoisting the MDX options to prevent recreation on every render
export const markdownOptions: any = {
    mdxOptions: {
        remarkPlugins: [
            remarkBreaks,
            remarkGfm,
            [remarkWikiLink, {
                pathFormat: 'relative',
                wikiLinkClassName: 'wiki-link',
                pageResolver: (name: string) => [name],
                hrefTemplate: (permalink: string) => `/${permalink}`
            }],
            remarkMocCards, // Custom plugin to convert standalone links to PostCards
        ],
        rehypePlugins: [],
    }
};
