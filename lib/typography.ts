import localFont from 'next/font/local';

// =============================================================================
// FONT DEFINITIONS
// =============================================================================

const chillax = localFont({
  src: [
    {
      path: '../public/fonts/Chillax-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Chillax-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-chillax',
});

// =============================================================================
// AVAILABLE FONTS
// =============================================================================

export const fonts = {
  chillax,
};

// =============================================================================
// 🎯 CENTRAL FONT CONFIGURATION
// Edit ONLY this object to change fonts across your entire site!
// =============================================================================

export const typography = {
  // Primary font for body text, paragraphs, general content
  primary: fonts.chillax,
  
  // Secondary font for headings, navigation, important text
  secondary: fonts.chillax,
  
  // Display font for large titles, hero text, brand elements
  display: fonts.chillax,
};

const systemMonoStack = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

// =============================================================================
// GENERATED EXPORTS (Don't edit these - they're auto-generated)
// =============================================================================

// Get all font variables for the html element
export const fontVariables = [
  typography.primary.variable,
  typography.secondary.variable,
  typography.display.variable,
].join(' ');

// Get font class names for direct usage
export const fontClasses = {
  primary: typography.primary.className,
  secondary: typography.secondary.className,
  mono: '',
  display: typography.display.className,
};

// Generate CSS variables for use in globals.css
export function getCSSVariables() {
  return {
    '--font-primary': typography.primary.variable.replace('--font-', 'var(--font-') + ')',
    '--font-secondary': typography.secondary.variable.replace('--font-', 'var(--font-') + ')',
    '--font-mono': systemMonoStack,
    '--font-display': typography.display.variable.replace('--font-', 'var(--font-') + ')',
  };
}

// =============================================================================
// FONT PRESETS
// Uncomment and modify the typography object above to use these presets
// =============================================================================

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/*
🎯 TO CHANGE FONTS ACROSS YOUR ENTIRE SITE:

1. Edit the `typography` object above (lines 43-53)
2. Save the file
3. That's it! Your entire site will update automatically.

Example:
export const typography = {
  primary: fonts.chillax,
  secondary: fonts.chillax,
  mono: fonts.jetbrainsMono,
  display: fonts.chillax,
};
*/
