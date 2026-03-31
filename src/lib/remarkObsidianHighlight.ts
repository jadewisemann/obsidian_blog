// Custom remark plugin: transforms ==text== into <mark>text</mark>
// Runs over all 'text' nodes in the AST and splits them around ==...== patterns,
// injecting mdxJsxTextElement nodes for each match.
import { visit } from 'unist-util-visit';

const HIGHLIGHT_RE = /==([^=]+)==/g;

export default function remarkObsidianHighlight() {
    return (tree: any) => {
        visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
            if (typeof index !== 'number' || !parent) return;
            if (!HIGHLIGHT_RE.test(node.value)) return;

            // Reset regex state after test()
            HIGHLIGHT_RE.lastIndex = 0;

            const parts: any[] = [];
            let lastIndex = 0;
            let match: RegExpExecArray | null;

            while ((match = HIGHLIGHT_RE.exec(node.value)) !== null) {
                // Plain text before this match
                if (match.index > lastIndex) {
                    parts.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
                }

                // <mark> element via mdxJsxTextElement
                parts.push({
                    type: 'mdxJsxTextElement',
                    name: 'mark',
                    attributes: [],
                    children: [{ type: 'text', value: match[1] }],
                });

                lastIndex = match.index + match[0].length;
            }

            // Remaining plain text after the last match
            if (lastIndex < node.value.length) {
                parts.push({ type: 'text', value: node.value.slice(lastIndex) });
            }

            // Splice the new nodes in place of the original text node
            if (parts.length > 0) {
                parent.children.splice(index, 1, ...parts);
            }
        });
    };
}
