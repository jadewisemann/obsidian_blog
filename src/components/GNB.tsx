'use client';

import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

export const GNB: React.FC = () => {
  const { toggleTheme, themeName } = useTheme();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: 'var(--colors-background-primary)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 'calc(var(--spacing-unit) * 6) calc(var(--spacing-unit) * 8)',
          maxWidth: '1536px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            color: 'var(--colors-text-normal)',
            textTransform: 'uppercase',
            fontFamily: 'var(--typography-font-family-headline)',
          }}
        >
          Aether Folio
        </div>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-element)',
          }}
        >
          {['Home', 'About', 'Topics'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: 'var(--typography-font-family-headline)',
                fontWeight: 700,
                letterSpacing: '-0.05em',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                textDecoration: 'none',
                color: item === 'Topics' ? 'var(--colors-text-accent)' : 'var(--colors-text-normal)',
                opacity: item === 'Topics' ? 1 : 0.6,
                borderBottom: item === 'Topics' ? '2px solid var(--colors-text-accent)' : 'none',
                paddingBottom: item === 'Topics' ? '4px' : '0',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                if (item !== 'Topics') e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                if (item !== 'Topics') e.currentTarget.style.opacity = '0.6';
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(var(--spacing-unit) * 4)' }}>
          {/* Theme Toggle Button for Demo Purposes */}
          <button
            onClick={toggleTheme}
            style={{
              padding: 'calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4)',
              cursor: 'pointer',
              backgroundColor: 'var(--colors-interactive-normal)',
              color: 'var(--colors-text-normal)',
              border: '1px solid var(--colors-background-modifier-border)',
              borderRadius: 'var(--radius-base)',
              fontFamily: 'var(--typography-font-family-label)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
            }}
          >
            {themeName === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          </button>
        </div>
      </div>
      
      {/* Divider */}
      <div
        style={{
          backgroundColor: 'var(--colors-background-modifier-border)',
          height: '1px',
          width: '100%',
        }}
      />
    </header>
  );
};
