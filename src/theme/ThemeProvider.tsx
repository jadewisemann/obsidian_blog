'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, ThemeTokens, ThemeName } from './theme.config';

interface ThemeContextType {
  themeName: ThemeName;
  tokens: ThemeTokens;
  toggleTheme: () => void;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeName;
}

// Helper to convert JS object to CSS variables
const objectToCssVariables = (
  obj: any,
  prefix: string = '-'
): Record<string, string> => {
  return Object.keys(obj).reduce((acc, key) => {
    const newPrefix = `${prefix}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      return { ...acc, ...objectToCssVariables(obj[key], newPrefix) };
    }
    return { ...acc, [newPrefix]: obj[key] };
  }, {});
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'light',
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);
  const tokens = themes[themeName];
  const cssVars = objectToCssVariables(tokens);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const cssVarsString = Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');

  return (
    <ThemeContext.Provider
      value={{ themeName, tokens, toggleTheme, setTheme: setThemeName }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        :root { ${cssVarsString} }
        /* Add standardized dark mode class for Tailwind-compatible plugins if needed */
        ${themeName === 'dark' ? ':root { color-scheme: dark; }' : ''}
        body {
          background-color: var(--colors-background-primary);
          color: var(--colors-text-normal);
          font-family: var(--typography-font-family-body);
        }
      `}} />
      <div className={themeName} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
