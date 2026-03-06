import Link from 'next/link';
import { getAllPosts } from '@/lib/content';

export const metadata = {
  title: 'Jade\'s Obsidian Blog',
  description: 'Minimalist static site generated from Obsidian vault',
};

// vercel-react-best-practices: server-hoist-static-io
// The rendering happens natively on the React Server Component layer.
export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="prose">
      <h1>Jade&apos;s Reflections</h1>
      <p style={{ color: 'var(--text-muted)' }}>Writings compiled from my personal Obsidian vault.</p>

      <div style={{ marginTop: 'var(--space-xl)' }}>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {posts.length > 0 ? posts.map((post) => (
            <li key={post.meta.slug} style={{ marginBottom: 'var(--space-md)' }}>
              <Link href={`/${post.meta.slug}`} style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {post.meta.title || post.meta.slug}
              </Link>
              {post.meta.date && <div style={{ fontSize: '0.9em', color: 'var(--text-muted)', marginTop: '4px' }}>{post.meta.date}</div>}
            </li>
          )) : <li style={{ color: 'var(--text-muted)' }}>No posts found. Start writing in the `content` folder!</li>}
        </ul>
      </div>
    </div>
  );
}
