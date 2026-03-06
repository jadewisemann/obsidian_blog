// @status: STABLE - DO NOT MODIFY WITHOUT EXPLICIT USER APPROVAL
import remarkGfm from 'remark-gfm';
// @ts-ignore
import remarkWikiLink from 'remark-wiki-link';

// vercel-react-best-practices: server-hoist-static-io
// Hoisting the MDX options to prevent recreation on every render
export const markdownOptions = {
    mdxOptions: {
        remarkPlugins: [
            remarkGfm,
            [remarkWikiLink, {
                pathFormat: 'relative',
                wikiLinkClassName: 'wiki-link',
                hrefTemplate: (permalink: string) => `/${permalink}`
            }],
        ],
        rehypePlugins: [],
    }
};
