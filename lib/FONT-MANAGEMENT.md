# Typography System

The site now uses a single font family, IBM Plex Mono, for all typography roles.

## Source of truth

- Font loader: `lib/typography.ts`
- Tailwind bindings: `tailwind.config.ts`
- Global typographic behavior: `app/globals.css`
- Root usage: `app/layout.tsx`

## Current mapping

- `font-primary`: IBM Plex Mono
- `font-secondary`: IBM Plex Mono
- `font-display`: IBM Plex Mono
- `font-mono`: IBM Plex Mono

## Notes

- Next injects the `--font-ibm-plex-mono` variable on the root `html` element.
- Tailwind font utilities point directly to that variable.
- If you change the site font again, update `lib/typography.ts` and keep `tailwind.config.ts` aligned.
