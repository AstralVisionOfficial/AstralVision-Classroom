# Deployment

Astral Vision is a server-rendered TanStack Start app. Deploy it to Vercel or another SSR-capable host. GitHub Pages is static-only and will not run authenticated routes or server functions.

## Vercel

Use these project settings:

- Install command: `bun install --frozen-lockfile`
- Build command: `NITRO_PRESET=vercel bun run build`
- Package manager: Bun `1.3.3`

Add the app's backend environment variables in Vercel before deploying:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

Optional live-data key:

- `NASA_API_KEY`

## GitHub Actions to Vercel

The workflow in `.github/workflows/deploy.yml` deploys `main` to Vercel. Add these GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The workflow builds Vercel's server output and deploys that prebuilt output, instead of uploading a static `dist` folder.