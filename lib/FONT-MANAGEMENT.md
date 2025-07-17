# 🎯 Centralized Font Management System

## Overview

Your portfolio now has a **truly centralized font management system**. You only need to edit **ONE place** to change fonts across your entire website.

## 🚀 Quick Start

**To change fonts globally:**

1. Open `lib/typography.ts`
2. Edit the `typography` object (lines 64-74)
3. Save the file
4. That's it! Your entire site updates automatically.

## 📍 The Central Configuration

```typescript
// lib/typography.ts
export const typography = {
  primary: fonts.chillax,    // Body text, paragraphs
  secondary: fonts.chillax,  // Headings, navigation
  mono: fonts.jetbrainsMono, // Code blocks
  display: fonts.chillax,    // Hero titles, brand
};
```

## 🎨 Available Fonts

### Google Fonts (Ready to Use)
- `fonts.inter` - Modern, clean sans-serif
- `fonts.outfit` - Geometric sans-serif
- `fonts.spaceGrotesk` - Quirky, friendly sans-serif
- `fonts.jetbrainsMono` - Developer-friendly monospace
- `fonts.playfairDisplay` - Elegant serif for headings

### Custom Fonts
- `fonts.chillax` - Your current custom font
- `fonts.satoshi` - Alternative custom font (add font files to use)

## 🔄 Quick Font Changes

### Switch to Modern & Clean
```typescript
export const typography = {
  primary: fonts.inter,
  secondary: fonts.inter,
  mono: fonts.jetbrainsMono,
  display: fonts.outfit,
};
```

### Use a Single Font Everywhere
```typescript
export const typography = {
  primary: fonts.spaceGrotesk,
  secondary: fonts.spaceGrotesk,
  mono: fonts.jetbrainsMono,
  display: fonts.spaceGrotesk,
};
```

### Use Font Presets
```typescript
export const typography = fontPresets.modern;
// or
export const typography = fontPresets.classic;
// or
export const typography = fontPresets.quirky;
```

## 🛠️ How It Works

1. **Single Source of Truth**: The `typography` object in `lib/typography.ts`
2. **Dynamic CSS Variables**: Font variables are automatically generated and injected
3. **Tailwind Integration**: Uses CSS variables for consistent styling
4. **Automatic Updates**: Change the config once, everything updates

## 📦 Font Roles

- **Primary**: Body text, paragraphs, general content
- **Secondary**: Headings, navigation, important text
- **Mono**: Code blocks, technical content (always monospace)
- **Display**: Large titles, hero text, brand elements

## 💡 Usage in Components

### Tailwind Classes (Recommended)
```jsx
<h1 className="font-display text-3xl">Large Title</h1>
<h2 className="font-secondary text-xl">Section Heading</h2>
<p className="font-primary text-base">Body text</p>
<code className="font-mono text-sm">Code snippet</code>
```

### Direct CSS Variables
```css
.custom-element {
  font-family: var(--font-primary);
}
```

## 🎯 Adding New Fonts

### Add Google Font
1. Import in `lib/typography.ts`:
```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
});
```

2. Add to fonts object:
```typescript
export const fonts = {
  // ... existing fonts
  yourFont,
};
```

3. Use in typography configuration:
```typescript
export const typography = {
  primary: fonts.yourFont,
  // ... other settings
};
```

### Add Custom Font
1. Place font files in `public/fonts/`
2. Define in `lib/typography.ts`:
```typescript
const customFont = localFont({
  src: [
    {
      path: '../public/fonts/custom-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
});
```

## 🏗️ System Architecture

```
lib/typography.ts (Central Config)
       ↓
app/layout.tsx (Injects CSS Variables)
       ↓
app/globals.css (Utility Classes)
       ↓
tailwind.config.ts (Tailwind Integration)
       ↓
All Components (Uses font-* classes)
```

## ✅ Best Practices

1. **Limit Font Count**: Use 2-3 fonts maximum
2. **Keep Mono Monospace**: Always use monospace for code
3. **Test Combinations**: Check readability on different devices
4. **Performance**: More fonts = slower loading
5. **Licensing**: Ensure proper font licensing

## 🔧 Troubleshooting

### Fonts Not Loading
- Check font file paths in `lib/typography.ts`
- Ensure font files exist in `public/fonts/`
- Verify font variable names match

### Styles Not Updating
- Clear browser cache
- Restart development server
- Check for TypeScript errors

### Build Errors
- Ensure all font imports are at module scope
- Check font file paths are correct
- Verify font format compatibility

## 📊 Performance Tips

1. **Preload Critical Fonts**: Next.js handles this automatically
2. **Use WOFF2 Format**: Best compression for modern browsers
3. **Subset Fonts**: Only load needed character sets
4. **Limit Font Weights**: Only include weights you use

## 🎯 Common Patterns

### Brand Consistency
```typescript
export const typography = {
  primary: fonts.inter,
  secondary: fonts.inter,
  mono: fonts.jetbrainsMono,
  display: fonts.inter, // Same as primary for consistency
};
```

### Typography Hierarchy
```typescript
export const typography = {
  primary: fonts.inter,        // Clean body text
  secondary: fonts.outfit,     // Distinctive headings
  mono: fonts.jetbrainsMono,   // Code blocks
  display: fonts.playfairDisplay, // Elegant titles
};
```

## 🎨 Current Configuration

Your site is currently using:
- **Primary**: Chillax (body text)
- **Secondary**: Chillax (headings)
- **Mono**: JetBrains Mono (code)
- **Display**: Chillax (titles)

## 🔄 Migration from Old System

If you had multiple places to edit fonts before, you can now:
1. Remove font imports from individual components
2. Remove CSS font definitions
3. Use the centralized `typography` object
4. Update components to use Tailwind font classes

---

**Remember**: Edit only the `typography` object in `lib/typography.ts` to change fonts across your entire site! 