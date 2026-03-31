// @status: STABLE - DO NOT MODIFY WITHOUT EXPLICIT USER APPROVAL
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import matter from 'gray-matter';

// vercel-react-best-practices: server-hoist-static-io
// Hoist static paths to module level to avoid re-evaluating on every function call.
const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMeta {
    slug: string;
    title?: string;
    date?: string;
    draft?: boolean;
    [key: string]: any;
}

export interface Post {
    meta: PostMeta;
    content: string; // AST or raw markdown string
}

/**
 * Gets all raw file paths inside the content directory recursively.
 */
async function getAllFilePaths(dirPath: string): Promise<string[]> {
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });

        // vercel-react-best-practices: async-parallel
        // Run all directory traverals in parallel
        const files = await Promise.all(
            entries.map(async (entry) => {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    // Skip hidden directories like .git
                    if (entry.name.startsWith('.')) return [];
                    return getAllFilePaths(fullPath);
                } else if (entry.isFile() && fullPath.endsWith('.md')) {
                    // Skip system files like _Navigation.md
                    if (entry.name.startsWith('_')) return [];
                    return [fullPath];
                }
                return [];
            })
        );

        return files.flat();
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

/**
 * Returns all blog posts parsed with gray-matter, excluding drafts.
 */
export async function getAllPosts(): Promise<Post[]> {
    const filePaths = await getAllFilePaths(contentDirectory);

    // vercel-react-best-practices: async-parallel
    const posts = await Promise.all(
        filePaths.map(async (filePath) => {
            const fileContents = await fs.readFile(filePath, 'utf8');
            const { data, content } = matter(fileContents);

            const relativePath = path.relative(contentDirectory, filePath);
            const slug = relativePath.replace(/\.md$/, '');
            const metaDate = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date;

            return {
                meta: { ...data, slug, date: metaDate } as PostMeta,
                content,
            };
        })
    );

    // Filter out drafts and sort by date if available
    return posts
        .filter((post) => !post.meta.draft)
        .sort((a, b) => {
            if (!a.meta.date || !b.meta.date) return 0;
            return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
        });
}

// ─── Tag System ───────────────────────────────────────────────────────────────

export interface TagInfo {
    tag: string;
    count: number;
}

/**
 * Aggregates all unique tags and their post counts across all content files.
 */
export async function getAllTags(): Promise<TagInfo[]> {
    const posts = await getAllPosts();

    const tagMap = new Map<string, number>();

    for (const post of posts) {
        const tags: string[] = Array.isArray(post.meta.tags) ? post.meta.tags : [];
        for (const tag of tags) {
            const normalized = tag.trim();
            if (normalized) {
                tagMap.set(normalized, (tagMap.get(normalized) ?? 0) + 1);
            }
        }
    }

    return Array.from(tagMap.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Returns all posts that contain the given tag in their frontmatter.
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => {
        const tags: string[] = Array.isArray(post.meta.tags) ? post.meta.tags : [];
        return tags.some((t) => t.trim() === tag);
    });
}

// ──────────────────────────────────────────────────────────────────────────────

/**
 * Gets a specific post by slug path segments.
 * Supports slugs like ['category', 'my-post']
 */
export async function getPostBySlug(slugPath: string[]): Promise<Post | null> {
    const decodedSlugPath = slugPath.map((segment) => decodeURIComponent(segment));
    const fullPath = path.join(contentDirectory, ...decodedSlugPath) + '.md';

    try {
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const metaDate = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date;

        return {
            meta: { ...data, slug: slugPath.join('/'), date: metaDate } as PostMeta,
            content,
        };
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            return null;
        }
        throw err;
    }
}
