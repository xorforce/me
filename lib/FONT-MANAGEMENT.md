# Typography System

The site now uses a single font family, Intel One Mono (variable), for all typography roles.

## Source of truth

- Font loader: `lib/typography.ts`
- Tailwind bindings: `tailwind.config.ts`
- Global typographic behavior: `app/globals.css`
- Root usage: `app/layout.tsx`

## Current mapping

- `font-primary`: Intel One Mono
- `font-secondary`: Intel One Mono
- `font-display`: Intel One Mono
- `font-mono`: Intel One Mono

## Notes

- Next injects the `--font-intel-one-mono` variable on the root `html` element.
- Tailwind font utilities point directly to that variable.
- The variable font supports weight 400–700 (upright + italic).
- If you change the site font again, update `lib/typography.ts` and keep `tailwind.config.ts` aligned.
