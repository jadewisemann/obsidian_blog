'use client';

import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { GNB } from './components/GNB';
import { PostCard } from './components/PostCard';
import {
  Article,
  ArticleTitle,
  ArticleExcerpt,
  ArticleImage,
  ArticleBodyText,
  ArticleHighlight,
  ArticleQuote,
  ArticleCard,
} from './components/Article';

// Standard application layout using global CSS logic handled mostly by inline vars.
const AppLayout: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--colors-background-primary)',
        color: 'var(--colors-text-normal)',
        fontFamily: 'var(--typography-font-family-body)',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        paddingTop: '8rem',
        paddingBottom: '6rem',
      }}
    >
      <GNB />

      <main
        style={{
          maxWidth: '1536px',
          margin: '0 auto',
          padding: '0 calc(var(--spacing-unit) * 8)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: 'var(--spacing-section)', // 5rem/6rem desktop
          }}
        >
          {/* Metadata Sidebar (simulated as left column in desktop) */}
          <aside style={{ gridColumn: 'span 3 / span 3' }}>
            <section style={{ marginBottom: '4rem' }}>
              <span
                style={{
                  fontFamily: 'var(--typography-font-family-label)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--colors-text-muted)',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              >
                Published
              </span>
              <time
                style={{
                  fontFamily: 'var(--typography-font-family-headline)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                }}
              >
                October 24, 2024
              </time>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['#minimalism', '#digital_hygiene'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--typography-font-family-label)',
                      fontSize: '0.75rem',
                      backgroundColor: 'var(--colors-background-modifier-border)',
                      color: 'var(--colors-text-muted)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-base)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3
                style={{
                  fontFamily: 'var(--typography-font-family-headline)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--colors-text-muted)',
                  marginBottom: '1.5rem',
                }}
              >
                Backlinks
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <li>
                  <PostCard
                    title="[[The Library of Babel]]"
                    excerpt="Exploring the infinite digital shelf and the necessity of curated silence..."
                  />
                </li>
                <li>
                  <PostCard
                    title="[[Rituals of Focus]]"
                    excerpt="Why the architecture of our physical space dictates the depth of our..."
                  />
                </li>
              </ul>
            </section>
          </aside>

          {/* Main Article Content */}
          <div style={{ gridColumn: 'span 8 / span 8', gridColumnStart: 5 }}>
            <Article>
              <header style={{ marginBottom: 'calc(var(--spacing-unit) * 20)' }}>
                <ArticleTitle>The Architecture of Stillness</ArticleTitle>
                <ArticleExcerpt>
                  In a world of perpetual notification, the most radical act is the creation of a void.
                </ArticleExcerpt>
              </header>

              <ArticleImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsK8fGv3HjojXgw9ix_9CL_DiT4yMmGmrnVOl5SKhX8F_f_cnaOJDPG8TuVYUs1Hq5CO0qoM97XwBFOxYbgd7BbQsj0XK1T9qGIEnqVHzuJpzKtf9QQ6I9jtCUb4cPyvOn7EW-QHOtbcvrqIEEFmQtdLRGQVhuyaraGeEl-lwxEvpeqiwf0XE1tlZR7GC7OrnQ_j6rfjctyjk0LcVVlHJgwzvQK5NQAkDj9hTUMYXfw150hfm-CToCEtRV3jPUyNLdpV9U5yFrGlE"
                alt="minimalist concrete building interior"
              />

              <div style={{ maxWidth: '65ch', margin: '0 0' }}>
                <ArticleBodyText>
                  We are currently living in the era of the "unfiltered stream." Every interface is
                  designed to push more content, more context, and more connection into our limited
                  cognitive bandwidth. To fight back, we must treat our digital environments not as
                  utilities, but as <ArticleHighlight>physical architecture</ArticleHighlight>.
                </ArticleBodyText>

                <ArticleBodyText>
                  Just as a Brutalist cathedral uses massive concrete walls to isolate the devotee
                  from the noise of the city, our digital tools should be configured to create
                  silence. This isn't just about "Do Not Disturb" modes; it is about the
                  fundamental design of the tools we use to think.
                </ArticleBodyText>

                <ArticleQuote>
                  "Stillness is not the absence of movement, but the presence of focus."
                </ArticleQuote>

                <ArticleBodyText>
                  Consider the way we organize knowledge. In a traditional folder system, we are
                  filing things away to be forgotten. In a networked thought environment, like the
                  one this blog is built upon, we are creating a{' '}
                  <ArticleHighlight>living topography</ArticleHighlight>.
                </ArticleBodyText>

                <ArticleCard title="A Protocol for Stillness">
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      'Remove all algorithmic feeds from the primary workspace.',
                      'Use high-contrast, text-only interfaces for deep work.',
                      'Embrace the "empty state" as a productive plateau.',
                    ].map((item, id) => (
                      <li key={id} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: 'var(--colors-text-faint)',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontFamily: 'var(--typography-font-family-body)', fontSize: '1.125rem' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ArticleCard>

                <ArticleBodyText>
                  Finally, we must address the code of our environment. The logic that governs our attention is often invisible. By making it explicit, we reclaim our agency.
                </ArticleBodyText>
              </div>
            </Article>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider initialTheme="light">
      <AppLayout />
    </ThemeProvider>
  );
}
