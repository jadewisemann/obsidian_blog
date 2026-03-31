// Custom Remark plugin to transform standalone wiki-links into PostCard components
import { visit } from 'unist-util-visit';

export default function remarkMocCards() {
    return (tree: any) => {
        visit(tree, 'listItem', (node: any, index?: number, parent?: any) => {
            // Check if the list item contains exactly one paragraph
            if (node.children && node.children.length === 1 && node.children[0].type === 'paragraph') {
                const paragraph = node.children[0];
                
                // Check if the paragraph contains exactly one wikiLink
                if (paragraph.children && paragraph.children.length === 1 && paragraph.children[0].type === 'wikiLink') {
                    const wikiLink = paragraph.children[0];
                    const targetSlug = wikiLink.data?.permalink || wikiLink.value;
                    
                    // Replace the ENTIRE listItem with the PostCard MDX component
                    // This prevents the rendering of an empty bullet point `<li>`
                    if (parent && typeof index === 'number') {
                        parent.children[index] = {
                            type: 'mdxJsxFlowElement',
                            name: 'PostCard',
                            attributes: [
                                {
                                    type: 'mdxJsxAttribute',
                                    name: 'slug',
                                    value: targetSlug
                                }
                            ],
                            children: []
                        };
                    }
                }
            }
        });
    };
}
