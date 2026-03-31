import Link from 'next/link';
import { getAllTags } from '@/lib/content';

export async function TagPane() {
    const tags = await getAllTags();

    if (tags.length === 0) {
        return (
            <div style={{ opacity: 0.5, fontSize: '0.85rem', marginTop: '2rem' }}>
                <p>No tags yet.</p>
                <p>Add <code>tags: [tag1, tag2]</code> to your frontmatter.</p>
            </div>
        );
    }

    // Use count to vary font-size for a subtle "cloud" feel (min 0.8rem, max 1.1rem)
    const maxCount = tags[0]?.count ?? 1;
    const minCount = tags[tags.length - 1]?.count ?? 1;
    const range = maxCount - minCount || 1;

    return (
        <div style={{ marginTop: '2rem' }}>
            <div
                style={{
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                }}
            >
                Tags
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {tags.map(({ tag, count }) => {
                    const ratio = (count - minCount) / range;
                    const fontSize = 0.8 + ratio * 0.3; // 0.8rem – 1.1rem
                    return (
                        <Link
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag)}`}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '999px',
                                fontSize: `${fontSize}rem`,
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border-color)',
                                textDecoration: 'none',
                                transition: 'border-color 0.15s, color 0.15s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            #{tag}
                            <span
                                style={{
                                    fontSize: '0.7em',
                                    opacity: 0.6,
                                }}
                            >
                                {count}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
