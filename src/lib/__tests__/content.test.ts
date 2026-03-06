import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { getAllPosts, getPostBySlug } from '../content';
import fs from 'fs/promises';
import path from 'path';

const TEST_CONTENT_DIR = path.join(process.cwd(), 'content');

describe('Content Layer (STABLE)', () => {
    beforeAll(async () => {
        // Create dummy markdown files for testing
        await fs.mkdir(TEST_CONTENT_DIR, { recursive: true });
        await fs.writeFile(
            path.join(TEST_CONTENT_DIR, 'test-post.md'),
            '---\ntitle: Test\ndraft: false\ndate: 2026-01-01\n---\n# Test Content'
        );
        await fs.writeFile(
            path.join(TEST_CONTENT_DIR, 'draft-post.md'),
            '---\ntitle: Draft\ndraft: true\n---\n# Draft Content'
        );
    });

    afterAll(async () => {
        await fs.rm(path.join(TEST_CONTENT_DIR, 'test-post.md'), { force: true });
        await fs.rm(path.join(TEST_CONTENT_DIR, 'draft-post.md'), { force: true });
    });

    it('getAllPosts should return only non-draft posts', async () => {
        const posts = await getAllPosts();
        // Assuming the setup script might have a hello-world.md, filter for our test posts
        const testPosts = posts.filter(p => ['test-post', 'draft-post'].includes(p.meta.slug));

        expect(testPosts).toHaveLength(1);
        expect(testPosts[0].meta.title).toBe('Test');
        expect(testPosts[0].content.trim()).toBe('# Test Content');
    });

    it('getPostBySlug should return correct post content', async () => {
        const post = await getPostBySlug(['test-post']);
        expect(post).not.toBeNull();
        expect(post?.meta.title).toBe('Test');
        expect(post?.content.trim()).toBe('# Test Content');
    });

    it('getPostBySlug should return null for non-existent post', async () => {
        const post = await getPostBySlug(['does-not-exist']);
        expect(post).toBeNull();
    });
});
