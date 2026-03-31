import fs from 'fs/promises';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
// @ts-ignore
import remarkWikiLink from 'remark-wiki-link';
import { SidebarTreeUI } from './SidebarTreeUI';

export interface NavTreeNode {
    title: string;
    href?: string;
    children: NavTreeNode[];
}

function parseMarkdownAstToList(listNode: any): NavTreeNode[] {
    if (!listNode || !listNode.children) return [];

    return listNode.children.map((listItem: any) => {
        let title = 'Untitled';
        let href: string | undefined = undefined;
        let children: NavTreeNode[] = [];

        for (const child of listItem.children) {
            if (child.type === 'paragraph') {
                const textNodes = child.children;
                if (textNodes.length > 0) {
                    const firstNode = textNodes[0];
                    if (firstNode.type === 'wikiLink') {
                        title = firstNode.value;
                        href = '/' + (firstNode.data?.permalink || title);
                    } else if (firstNode.type === 'link') {
                        title = firstNode.children[0]?.value || 'Link';
                        href = firstNode.url;
                    } else if (firstNode.type === 'text') {
                        title = firstNode.value;
                    }
                }
            } else if (child.type === 'list') {
                children = parseMarkdownAstToList(child);
            }
        }

        return { title, href, children };
    });
}

export async function SidebarNavigation() {
    try {
        const navFilePath = path.join(process.cwd(), 'content', '_Navigation.md');
        const fileContent = await fs.readFile(navFilePath, 'utf8');

        // Parse markdown to AST (runSync applies plugins like remarkWikiLink)
        const processor = unified()
            .use(remarkParse)
            .use(remarkWikiLink, {
                pathFormat: 'relative',
                pageResolver: (name: string) => [name],
                hrefTemplate: (permalink: string) => `/${permalink}`
            });
            
        const parsed = processor.parse(fileContent);
        const ast = processor.runSync(parsed);

        // Find all list nodes to act as the root navigation
        let listAst: any = null;
        for (const node of (ast as any).children) {
            if (node.type === 'list') {
                listAst = node;
                break;
            }
        }

        const tree = parseMarkdownAstToList(listAst);

        return (
            <div className="sidebar-nav">
                <div style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    Navigation
                </div>
                <SidebarTreeUI tree={tree} />
            </div>
        );

    } catch (e) {
        // Silently return empty or fallback if _Navigation.md is not found
        return (
            <div className="sidebar-nav-fallback">
                <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Create <code>content/_Navigation.md</code></p>
            </div>
        );
    }
}
