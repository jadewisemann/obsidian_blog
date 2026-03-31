import React from 'react';
import Link from 'next/link';
import { findPost } from '@/lib/utils/findPost';
import { Post } from '@/lib/content';

// Tag badge — standalone Link, never nested inside another anchor
function TagBadge({ tag }: { tag: string }) {
    return (
        <Link
            href={`/tags/${encodeURIComponent(tag)}`}
            style={{
                display: 'inline-block',
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                marginRight: '0.375rem',
                textDecoration: 'none',
            }}
        >
            #{tag}
        </Link>
    );
}

// Shared card layout — no wrapping <Link> to avoid nested <a> tags.
// Title is the primary link; tag badges are sibling links.
export function PostCardDisplay({ post }: { post: Post }) {
    return (
        <div
            style={{
                padding: '1.25rem 1.5rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--callout-info-bg)',
                borderRadius: '0.75rem',
                margin: '0.75rem 0',
            }}
        >
            <Link
                href={`/${post.meta.slug}`}
                style={{ textDecoration: 'none' }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                    }}
                >
                    {post.meta.title || post.meta.slug}
                </h3>
            </Link>

            {post.meta.date && (
                <p
                    style={{
                        marginTop: '0.3rem',
                        marginBottom: '0.5rem',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                    }}
                >
                    {post.meta.date}
                </p>
            )}

            {post.meta.description && (
                <p
                    style={{
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.55,
                    }}
                >
                    {post.meta.description}
                </p>
            )}

            {Array.isArray(post.meta.tags) && post.meta.tags.length > 0 && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {post.meta.tags.map((tag: string) => (
                        <TagBadge key={tag} tag={tag.trim()} />
                    ))}
                </div>
            )}
        </div>
    );
}

// MDX-invocable version — resolves slug → Post, then renders PostCardDisplay
export async function PostCard({ slug }: { slug: string }) {
    const post = await findPost(slug);

    if (!post) {
        return (
            <div
                style={{
                    padding: '1rem',
                    border: '1px solid #fecaca',
                    backgroundColor: '#fef2f2',
                    color: '#991b1b',
                    borderRadius: '0.375rem',
                    margin: '0.75rem 0',
                }}
            >
                <strong>File not found:</strong> {slug}
            </div>
        );
    }

    return <PostCardDisplay post={post} />;
}
