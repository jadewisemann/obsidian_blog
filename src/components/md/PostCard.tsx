import React from 'react';
import Link from 'next/link';
import { findPost } from '@/lib/utils/findPost';

export async function PostCard({ slug }: { slug: string }) {
    const post = await findPost(slug);

    if (!post) {
        return (
            <div style={{
                padding: '1rem',
                border: '1px solid #fecaca',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                borderRadius: '0.375rem',
                margin: '1rem 0'
            }}>
                <strong>File not found:</strong> {slug}
            </div>
        );
    }

    return (
        <Link 
            href={`/${post.meta.slug}`} 
            style={{ textDecoration: 'none' }}
        >
            <div style={{
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--callout-info-bg)',
                borderRadius: '0.75rem',
                margin: '1rem 0',
                transition: 'box-shadow 0.2s',
                cursor: 'pointer'
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                }}>
                    {post.meta.title || post.meta.slug}
                </h3>
                {post.meta.date && (
                    <p style={{
                        marginTop: '0.25rem',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)'
                    }}>
                        {post.meta.date}
                    </p>
                )}
                {post.meta.description && (
                    <p style={{
                        marginTop: '0.5rem',
                        marginBottom: 0,
                        color: 'var(--text-secondary)'
                    }}>
                        {post.meta.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
