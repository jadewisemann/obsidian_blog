import React from 'react';
import Link from 'next/link';
import { Callout } from './Callout';

function extractText(children: React.ReactNode): string {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(extractText).join('');
    if (React.isValidElement(children)) return extractText((children as React.ReactElement<any>).props.children);
    return '';
}

export const MDXComponents = {
    a: ({ href, children, ...props }: React.ComponentPropsWithoutRef<'a'>) => {
        // If it's a relative link (like a wiki link), use Next.js Link
        if (href && href.startsWith('/')) {
            return <Link href={href} {...props}>{children}</Link>;
        }
        return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    },

    blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => {
        // Detect Obsidian Callouts
        const rawText = extractText(props.children);
        const match = rawText.match(/^\s*\[!(\w+)\]\s*(.*)/);

        if (match) {
            const variant = match[1].toLowerCase() as any;
            const title = match[2].trim() || variant.charAt(0).toUpperCase() + variant.slice(1);

            // Attempt to render the children without the first line containing the [!type] syntax
            return <Callout variant={variant} title={title}>{props.children}</Callout>;
        }

        return <blockquote {...props}>{props.children}</blockquote>;
    }
};
