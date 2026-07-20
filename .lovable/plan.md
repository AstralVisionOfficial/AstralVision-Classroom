## Goal
Make Astral Vision deploy cleanly outside Lovable, especially on Vercel and GitHub.

## What I found
- The app is a TanStack Start SSR app, not a static Vite/Solid site.
- `.github/workflows/deploy.yml` is currently configured as “Deploy Vite Solid Site” and uploads `dist`, which is the wrong deployment shape for this project.
- `vite.config.ts` uses the raw TanStack Start plugin, but the project already includes Lovable’s TanStack deployment config package that should wire the custom `src/server.ts` entry and production output correctly.
- There are both `bun.lock` and `package-lock.json`, which can make Vercel/GitHub choose different package managers and produce inconsistent builds.

## Plan
1. Replace the Vite config with the Lovable TanStack config wrapper.
   - Keep React, Tailwind, tsconfig paths, and TanStack Start support.
   - Wire `tanstackStart.server.entry` to the existing `src/server.ts` wrapper.

2. Add Vercel deployment config.
   - Add `vercel.json` so Vercel knows this is a server-rendered TanStack app rather than a plain static `dist` upload.
   - Ensure all routes are handled by the server output.

3. Replace the GitHub Pages workflow.
   - GitHub Pages is static hosting and is not appropriate for the current SSR/auth/server-function app.
   - Replace it with a GitHub Actions workflow that builds the app and deploys to Vercel using Vercel’s CLI, requiring Vercel secrets in the GitHub repo.

4. Standardize package-manager expectations.
   - Keep the project aligned around the lockfile/build command that works best for this app.
   - Avoid deployment platforms accidentally using the wrong install path.

5. Add a short deployment note.
   - Document the needed Vercel/GitHub secrets and the correct commands so future publishing is straightforward.

## Technical details
- Required GitHub repository secrets for Vercel deploy will be:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
- Required runtime/build environment variables on Vercel will include the existing public backend variables already used by the app.
- GitHub Pages will not support authenticated routes or TanStack server functions for this app without converting it to a static-only build, which would remove key functionality.