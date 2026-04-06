# Minimal Portfolio

A clean, minimal portfolio website built with Next.js 15 and deployed as static HTML on GitHub Pages.

## Features

- ✨ Built with Next.js 15 and App Router
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Static HTML export for GitHub Pages
- 🔧 shadcn/ui components

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build static files
npm run build:static
```

## Spotify Now Playing

The homepage includes a Spotify-powered now-playing avatar inspired by Daniel Voigt's article on building a current-track widget with Next.js. The main site still deploys as a static export on GitHub Pages, but Spotify refreshes are now decoupled from the Pages deploy.

For live data in GitHub Actions, add these repository secrets:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

How it works now:

- `.github/workflows/deploy.yml` only runs for normal site deploys on `main` pushes or manual dispatch
- `.github/workflows/spotify-refresh.yml` runs every 5 minutes and on manual dispatch
- the refresh workflow updates `spotify-now-playing.json` on the dedicated `spotify-data` branch
- the homepage fetches `https://raw.githubusercontent.com/xorforce/me/spotify-data/spotify-now-playing.json` first and falls back to the local `public/spotify-now-playing.json`

This keeps the music state updating without rebuilding and redeploying the full site every few minutes.

To generate a local snapshot manually:

```bash
npm run spotify:generate
```

On localhost, the homepage prefers the local `public/spotify-now-playing.json` file first, so local testing still works without waiting for the remote snapshot branch.

To fetch a refresh token locally:

1. Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to `.env.local`
2. Add the same redirect URI to your Spotify app settings
3. Run:

```bash
npm run spotify:auth
```

By default the auth helper uses `http://127.0.0.1:3124/callback`. Override it with `SPOTIFY_REDIRECT_URI` if needed.

If you ever move the site off GitHub Pages, the same mechanism can stay in place by pointing the client at a different JSON endpoint with `NEXT_PUBLIC_SPOTIFY_NOW_PLAYING_URL`.

## Deployment to GitHub Pages

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Push to main branch**:
   - The GitHub Actions workflow will automatically build and deploy your site
   - Your site will be available at `https://<username>.github.io/<repository-name>`

3. **Manual deployment** (optional):
   - You can also trigger deployment manually from the Actions tab

### Configuration

The project is already configured for static export with:
- `output: 'export'` in `next.config.mjs`
- GitHub Actions workflow in `.github/workflows/deploy.yml`
- `.nojekyll` file to bypass Jekyll processing

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── podcasts/
│   ├── talks/
│   ├── writing/
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── public/               # Static assets
├── .github/workflows/    # GitHub Actions
└── next.config.mjs       # Next.js configuration
```

## License

MIT License - feel free to use this as a template for your own portfolio! 
