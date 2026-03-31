import React from 'react';

// Maps to H1
export const ArticleTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1
    style={{
      position: 'relative',
      fontFamily: 'var(--typography-font-family-headline)',
      fontSize: 'clamp(3rem, 5vw, 4.5rem)',
      fontWeight: 900,
      letterSpacing: '-0.05em',
      lineHeight: 0.9,
      color: 'var(--colors-h1-color)',
      marginBottom: 'calc(var(--spacing-unit) * 8)',
      paddingBottom: '8px',
    }}
  >
    {children}
    {/* Emulated ::after heading divider from Obsidian border theme */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100%',
        height: '2px',
        opacity: 0.5,
        backgroundImage: 'linear-gradient(to left, var(--colors-h1-color) 30%, transparent 70%)',
      }}
    />
  </h1>
);

export const ArticleExcerpt: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: 'var(--typography-font-family-body)',
      fontStyle: 'italic',
      fontSize: '1.5rem',
      color: 'var(--colors-text-muted)',
      maxWidth: '42rem',
      lineHeight: 1.625,
      marginBottom: 'var(--spacing-section)',
    }}
  >
    {children}
  </p>
);

export const ArticleBodyText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: 'var(--typography-font-family-body)',
      fontSize: '1.25rem',
      lineHeight: 1.8,
      color: 'var(--colors-text-normal)',
      marginBottom: 'calc(var(--spacing-unit) * 6)',
    }}
  >
    {children}
  </p>
);

export const ArticleQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <blockquote
    style={{
      padding: 'calc(var(--spacing-unit) * 8) 0',
      borderLeft: '4px solid var(--colors-text-faint)',
      backgroundColor: 'var(--colors-blockquote-background)',
      margin: 'calc(var(--spacing-unit) * 8) 0',
      textAlign: 'center',
    }}
  >
    <p
      style={{
        fontFamily: 'var(--typography-font-family-body)',
        fontStyle: 'italic',
        fontSize: '1.5rem', // Slightly smaller than before to match standard obsidian quote size
        color: 'var(--colors-text-muted)',
        lineHeight: 1.625,
        padding: '0 calc(var(--spacing-unit) * 12)',
        margin: 0,
      }}
    >
      {children}
    </p>
  </blockquote>
);

export const ArticleHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong
    style={{
      fontFamily: 'var(--typography-font-family-headline)',
      fontWeight: 900,
      color: 'var(--colors-text-accent)',
    }}
  >
    {children}
  </strong>
);

export const ArticleImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <figure style={{ marginBottom: 'var(--spacing-section)' }}>
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '614px',
        objectFit: 'cover',
        filter: 'grayscale(100%)',
        transition: 'filter 0.7s ease',
        borderRadius: 'var(--radius-base)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'grayscale(0%)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'grayscale(100%)';
      }}
    />
  </figure>
);

export const ArticleCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div
    style={{
      margin: 'calc(var(--spacing-unit) * 16) 0',
      backgroundColor: 'var(--colors-background-secondary)',
      padding: 'calc(var(--spacing-unit) * 12)',
      borderRadius: 'var(--radius-card)',
    }}
  >
    <h4
      style={{
        fontFamily: 'var(--typography-font-family-label)',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--colors-text-faint)',
        marginBottom: 'calc(var(--spacing-unit) * 6)',
      }}
    >
      {title}
    </h4>
    {children}
  </div>
);

// Optional: Codeblock emulation
export const ArticleCodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre
    style={{
      backgroundColor: 'var(--colors-code-background)',
      color: 'var(--colors-text-normal)',
      padding: 'calc(var(--spacing-unit) * 4)',
      borderRadius: 'var(--radius-base)',
      overflowX: 'auto',
      fontFamily: 'Consolas, monospace',
      fontSize: '0.9rem',
      marginBottom: 'calc(var(--spacing-unit) * 6)',
    }}
  >
    <code>{children}</code>
  </pre>
);

export const Article: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <article>
    {children}
  </article>
);
