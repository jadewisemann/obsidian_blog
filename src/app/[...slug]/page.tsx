import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { markdownOptions } from '@/lib/markdown';
import { MDXComponents } from '@/components/md/MDXComponents';
import Link from 'next/link';

// vercel-react-best-practices: server-dedup-props
// SSG parameters generation avoiding runtime blocking
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.meta.slug.split('/'),
    }));
}

interface PostProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PostProps) {
    const slug = (await params).slug;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Not Found' };
    }

    return {
        title: post.meta.title || post.meta.slug,
    };
}

export default async function PostPage({ params }: PostProps) {
    const slug = (await params).slug;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // vercel-react-best-practices: server-hoist-static-io
    // We avoid shipping raw markdown to client (AST handles the rendering on Server Component)
    return (
        <article className="prose">
            <Link href="/" style={{ marginBottom: 'var(--space-lg)', display: 'inline-block' }}>← Back to Index</Link>

            <h1>{post.meta.title || post.meta.slug}</h1>
            {post.meta.date && <p style={{ fontSize: '0.9em', color: 'var(--text-muted)' }}>{post.meta.date}</p>}

            <div style={{ marginTop: 'var(--space-xl)' }}>
                <MDXRemote
                    source={post.content}
                    options={markdownOptions as any}
                    components={MDXComponents}
                />
            </div>
        </article>
    );
}
