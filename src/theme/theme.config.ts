export type ThemeName = 'light' | 'dark';

export interface ThemeTokens {
  rgb: Record<string, string>;
  colors: Record<string, string>;
  typography: {
    fontFamilyHeadline: string;
    fontFamilyBody: string;
    fontFamilyLabel: string;
  };
  spacing: {
    unit: string;
    section: string;
    element: string;
    inline: string;
  };
  radius: {
    base: string;
    card: string;
  };
}

const sharedTypographySpacing = {
  typography: {
    fontFamilyHeadline: '"Inter", sans-serif',
    fontFamilyBody: '"Newsreader", serif',
    fontFamilyLabel: '"Space Grotesk", sans-serif',
  },
  spacing: {
    unit: '4px',
    section: '5rem',
    element: '2rem',
    inline: '1rem',
  },
  radius: {
    base: '4px',
    card: '8px',
  },
};

export const themes: Record<ThemeName, ThemeTokens> = {
  light: {
    ...sharedTypographySpacing,
    rgb: {
      bg_dark2_x: '191, 186, 187',
      bg_dark_x: '204, 204, 204',
      bg_x: '226, 226, 226',
      bg_highlight_x: '200, 200, 200',
      bg_highlight_dark_x: '191, 186, 187',
      bg_highlight_dimmed_x: '220, 218, 218',
      terminal_black_x: '226, 226, 226',
      fg_x: '85, 85, 85',
      fg_dark_x: '119, 119, 119',
      comment_x: '160, 160, 160',
      blue0_x: '0, 111, 137',
      blue_x: '0, 132, 163',
      cyan_x: '0, 133, 134',
      magenta_x: '137, 103, 136',
      pink_x: '127, 76, 126',
      orange_x: '167, 107, 72',
      yellow_x: '196, 133, 98',
      green_x: '98, 133, 98',
      teal_x: '0, 111, 112',
      red_x: '220, 82, 132',
      red1_x: '190, 60, 109',
    },
    colors: {
      backgroundPrimary: 'rgb(var(--rgb-bg_x))',
      backgroundSecondary: 'rgb(var(--rgb-bg_dark_x))',
      backgroundModifierBorder: 'rgb(var(--rgb-bg_highlight_x))',
      backgroundModifierHover: 'rgb(var(--rgb-bg_highlight_x))',
      textNormal: 'rgb(var(--rgb-fg_x))',
      textFaint: 'rgb(var(--rgb-comment_x))',
      textMuted: 'rgb(var(--rgb-fg_dark_x))',
      textAccent: 'rgb(var(--rgb-magenta_x))',
      textAccentHover: 'rgb(var(--rgb-cyan_x))',
      h1Color: 'rgb(var(--rgb-red_x))',
      h2Color: 'rgb(var(--rgb-magenta_x))',
      h3Color: 'rgb(var(--rgb-blue_x))',
      h4Color: 'rgb(var(--rgb-yellow_x))',
      h5Color: 'rgb(var(--rgb-cyan_x))',
      h6Color: 'rgb(var(--rgb-green_x))',
      codeBackground: 'rgb(var(--rgb-bg_highlight_dimmed_x))',
      blockquoteBackground: 'rgb(var(--rgb-bg_dark_x))',
      interactiveNormal: 'rgb(var(--rgb-bg_dark_x))',
      interactiveHover: 'rgb(var(--rgb-bg_x))',
    },
  },
  dark: {
    ...sharedTypographySpacing,
    rgb: {
      bg_dark2_x: '45, 45, 45',
      bg_dark_x: '60, 60, 60',
      bg_x: '75, 75, 75',
      bg_highlight_x: '108, 100, 101',
      bg_highlight_dark_x: '119, 119, 119',
      bg_highlight_dimmed_x: '119, 119, 119', // Use same as dark highlight for dark mode
      terminal_black_x: '75, 75, 75',
      fg_x: '221, 221, 221',
      fg_dark_x: '168, 168, 168',
      comment_x: '119, 119, 119',
      blue0_x: '151, 189, 222',
      blue_x: '162, 200, 233',
      cyan_x: '111, 189, 190',
      magenta_x: '165, 166, 197',
      pink_x: '178, 179, 218',
      orange_x: '255, 229, 179',
      yellow_x: '255, 223, 155',
      green_x: '152, 189, 153',
      teal_x: '107, 202, 203',
      red_x: '227, 136, 163',
      red1_x: '235, 153, 177',
    },
    colors: {
      backgroundPrimary: 'rgb(var(--rgb-bg_x))',
      backgroundSecondary: 'rgb(var(--rgb-bg_dark_x))',
      backgroundModifierBorder: 'rgb(var(--rgb-bg_highlight_x))',
      backgroundModifierHover: 'rgb(var(--rgb-bg_highlight_x))',
      textNormal: 'rgb(var(--rgb-fg_x))',
      textFaint: 'rgb(var(--rgb-comment_x))',
      textMuted: 'rgb(var(--rgb-fg_dark_x))',
      textAccent: 'rgb(var(--rgb-magenta_x))',
      textAccentHover: 'rgb(var(--rgb-cyan_x))',
      h1Color: 'rgb(var(--rgb-red_x))',
      h2Color: 'rgb(var(--rgb-magenta_x))',
      h3Color: 'rgb(var(--rgb-blue_x))',
      h4Color: 'rgb(var(--rgb-yellow_x))',
      h5Color: 'rgb(var(--rgb-cyan_x))',
      h6Color: 'rgb(var(--rgb-green_x))',
      codeBackground: 'rgb(var(--rgb-bg_highlight_dark_x))',
      blockquoteBackground: 'rgb(var(--rgb-bg_dark_x))',
      interactiveNormal: 'rgb(var(--rgb-bg_dark_x))',
      interactiveHover: 'rgb(var(--rgb-bg_x))',
    },
  },
};
