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