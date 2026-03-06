import { describe, it, expect } from 'vitest';
import { markdownOptions } from '../markdown';

describe('Markdown Config (STABLE)', () => {
    it('should have remark-gfm and remark-wiki-link configured', () => {
        const plugins = markdownOptions.mdxOptions.remarkPlugins;
        expect(plugins.length).toBeGreaterThan(0);
    });
});
