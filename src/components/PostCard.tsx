import React from 'react';

interface PostCardProps {
  title: string;
  excerpt: string;
  href?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ title, excerpt, href = '#' }) => {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        padding: 'calc(var(--spacing-unit) * 8)',
        backgroundColor: 'var(--colors-background-secondary)',
        textDecoration: 'none',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        borderRadius: 'var(--radius-card)', // dynamically injected based on dark/light
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--typography-font-family-body)',
          fontStyle: 'italic',
          fontSize: '1.25rem',
          color: 'var(--colors-text-accent)',
          marginBottom: 'calc(var(--spacing-unit) * 2)',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = 'inset 0 -2px 0 0 var(--colors-text-accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {title}
      </span>
      <p
        style={{
          fontFamily: 'var(--typography-font-family-body)',
          fontSize: '0.875rem',
          color: 'var(--colors-text-muted)',
          lineHeight: '1.625',
          margin: 0,
        }}
      >
        {excerpt}
      </p>
    </a>
  );
};
