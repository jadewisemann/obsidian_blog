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

            // Calculate relative path for slug (e.g., 'category/post-name.md' -> 'category/post-name')
            const relativePath = path.relative(contentDirectory, filePath);
            const slug = relativePath.replace(/\.md$/, '');

            return {
                meta: { ...data, slug } as PostMeta,
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

        return {
            meta: { ...data, slug: slugPath.join('/') } as PostMeta,
            content,
        };
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            return null;
        }
        throw err;
    }
}
