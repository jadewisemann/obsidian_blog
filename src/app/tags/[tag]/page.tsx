import { getAllTags, getPostsByTag } from '@/lib/content';
import { PostCardDisplay } from '@/components/md/PostCard';
import Link from 'next/link';

interface TagPageProps {
    params: Promise<{ tag: string }>;
}

// SSG: pre-render one page per unique tag at build time
export async function generateStaticParams() {
    const tags = await getAllTags();
    return tags.map(({ tag }) => ({
        tag: encodeURIComponent(tag),
    }));
}

export async function generateMetadata({ params }: TagPageProps) {
    const { tag } = await params;
    const decoded = decodeURIComponent(tag);
    return {
        title: `#${decoded} — Obsidian Blog`,
        description: `All posts tagged with "${decoded}"`,
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag } = await params;
    const decoded = decodeURIComponent(tag);
    const posts = await getPostsByTag(decoded);

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <Link
                    href="/"
                    style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        display: 'inline-block',
                        marginBottom: '1rem',
                    }}
                >
                    ← Back to Index
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h1
                        style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            margin: 0,
                        }}
                    >
                        #{decoded}
                    </h1>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-muted)',
                            padding: '0.2rem 0.6rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: '999px',
                        }}
                    >
                        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                    </span>
                </div>
            </div>

            {/* Post feed */}
            {posts.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No posts found with this tag.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {posts.map((post) => (
                        <PostCardDisplay key={post.meta.slug} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
