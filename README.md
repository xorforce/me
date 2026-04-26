# Minimal Portfolio

A clean, minimal portfolio website built with Next.js 15 and intended for server-capable deployment on Vercel.

## Features

- ✨ Built with Next.js 15 and App Router
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- ☁️ Realtime Spotify now-playing via a server route
- 🔧 shadcn/ui components

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run a production build
npm run build
```

## Spotify Now Playing

The homepage includes a Spotify-powered now-playing avatar backed by a live Next.js route handler at `/api/now-playing`.

Required environment variables:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

How it works:

- the frontend polls `/api/now-playing`
- the route handler refreshes a Spotify access token with the stored refresh token
- the server calls Spotify's `currently-playing` API
- the response is sanitized before it reaches the client

This gives you near-realtime updates without a cron snapshot branch.

To fetch a refresh token locally:

1. Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to `.env.local`
2. Add the same redirect URI to your Spotify app settings
3. Run:

```bash
npm run spotify:auth
```

By default the auth helper uses `http://127.0.0.1:3124/callback`. Override it with `SPOTIFY_REDIRECT_URI` if needed.

## Deployment to Vercel

1. Import the repository into Vercel.
2. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` to the project environment variables.
3. Use the default Next.js build settings.
4. Redeploy after adding the environment variables.

Notes:

- This app is no longer configured as a static export because `/api/now-playing` requires a server runtime.
- Vercel Hobby is sufficient for a personal site with lightweight polling.

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
