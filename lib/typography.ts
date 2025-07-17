import { Inter, JetBrains_Mono, Playfair_Display, Outfit, Space_Grotesk, MuseoModerno } from 'next/font/google';
import localFont from 'next/font/local';

// =============================================================================
// FONT DEFINITIONS
// =============================================================================

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const museoModerno = MuseoModerno({
  subsets: ['latin'],
  variable: '--font-museo-moderno',
});

// Custom fonts
const roundo = localFont({
  src: [
    {
      path: '../public/fonts/Roundo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Roundo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-roundo',
});

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

const nunito = localFont({
  src: [
    {
      path: '../public/fonts/Nunito-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Nunito-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-nunito',
});

const hoover = localFont({
  src: [
    {
      path: '../public/fonts/Hoover-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Hoover-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-hoover',
});

const panchang = localFont({
  src: [
    {
      path: '../public/fonts/Panchang-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Panchang-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-panchang',
});

const tanker = localFont({
  src: [
    {
      path: '../public/fonts/Tanker-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Tanker-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-tanker',
});

// =============================================================================
// AVAILABLE FONTS
// =============================================================================

export const fonts = {
  inter,
  jetbrainsMono,
  playfairDisplay,
  outfit,
  spaceGrotesk,
  roundo,
  chillax,
  nunito,
  hoover,
  panchang,
  tanker,
  museoModerno,
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
  
  // Monospace font for code (keep as monospace)
  mono: fonts.jetbrainsMono,
  
  // Display font for large titles, hero text, brand elements
  display: fonts.chillax,
};

// =============================================================================
// GENERATED EXPORTS (Don't edit these - they're auto-generated)
// =============================================================================

// Get all font variables for the html element
export const fontVariables = [
  typography.primary.variable,
  typography.secondary.variable,
  typography.mono.variable,
  typography.display.variable,
].join(' ');

// Get font class names for direct usage
export const fontClasses = {
  primary: typography.primary.className,
  secondary: typography.secondary.className,
  mono: typography.mono.className,
  display: typography.display.className,
};

// Generate CSS variables for use in globals.css
export function getCSSVariables() {
  return {
    '--font-primary': typography.primary.variable.replace('--font-', 'var(--font-') + ')',
    '--font-secondary': typography.secondary.variable.replace('--font-', 'var(--font-') + ')',
    '--font-mono': typography.mono.variable.replace('--font-', 'var(--font-') + ')',
    '--font-display': typography.display.variable.replace('--font-', 'var(--font-') + ')',
  };
}

// =============================================================================
// FONT PRESETS
// Uncomment and modify the typography object above to use these presets
// =============================================================================

export const fontPresets = {
  // Modern & Clean
  modern: {
    primary: fonts.inter,
    secondary: fonts.inter,
    mono: fonts.jetbrainsMono,
    display: fonts.outfit,
  },
  
  // Quirky & Friendly
  quirky: {
    primary: fonts.spaceGrotesk,
    secondary: fonts.spaceGrotesk,
    mono: fonts.jetbrainsMono,
    display: fonts.spaceGrotesk,
  },
  
  // Classic & Elegant
  classic: {
    primary: fonts.inter,
    secondary: fonts.playfairDisplay,
    mono: fonts.jetbrainsMono,
    display: fonts.playfairDisplay,
  },
  
  // Current (Roundo)
  current: {
    primary: fonts.roundo,
    secondary: fonts.roundo,
    mono: fonts.jetbrainsMono,
    display: fonts.roundo,
  },
  
  // Alternative (Chillax)
  chillax: {
    primary: fonts.chillax,
    secondary: fonts.chillax,
    mono: fonts.jetbrainsMono,
    display: fonts.chillax,
  },
};

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/*
🎯 TO CHANGE FONTS ACROSS YOUR ENTIRE SITE:

1. Edit the `typography` object above (lines 64-74)
2. Save the file
3. That's it! Your entire site will update automatically.

Examples:

// Use the modern preset
export const typography = fontPresets.modern;

// Mix and match
export const typography = {
  primary: fonts.inter,
  secondary: fonts.playfairDisplay,
  mono: fonts.jetbrainsMono,
  display: fonts.outfit,
};

// Use all the same font
export const typography = {
  primary: fonts.spaceGrotesk,
  secondary: fonts.spaceGrotesk,
  mono: fonts.jetbrainsMono,
  display: fonts.spaceGrotesk,
};
*/ 