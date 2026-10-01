# Ankit’s PersonalOS

A retro desktop portfolio built with Next.js 15, React, TypeScript and Tailwind, deployed on Vercel at https://ankitagrawal.com.

## Development

Use Node.js 22.13+ or 24+, then run `yarn install` and `yarn dev`.

Run `yarn lint`, `yarn test` and `yarn build` before publishing.

## Live content

- **Music:** Spotify currently playing, recent plays, short-term top artists and playlists. Playback refreshes every 30 seconds, recent plays every minute, and artists/playlists every five minutes while the page is visible. Configure `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` in the server environment. The refresh token needs `user-read-currently-playing`, `user-read-recently-played`, `user-top-read` and the playlist scopes used by the existing setup.
- **Movies:** Letterboxd RSS from `ankit010201`, including watched dates, ratings and plain-text reviews. Spoiler reviews are collapsed. The original favorites and queue remain curated separately.
- **Videos:** YouTube channel `@4nkitagrawal`. Uses the channel feed, with the public uploads page as a fallback when RSS is unavailable. Playback uses YouTube’s privacy-enhanced embed domain and starts on click.
- **Activity:** All, Cycling, Running, and Hiking filters. Cycling totals, recent rides, and hikes are verified Strava snapshots dated September 30, 2026; the latest-run widget refreshes on Strava. Update the dated snapshots in `src/components/windows/ActivityWindow.tsx` when refreshing activities.

Letterboxd and YouTube upstream data is cached for 15 minutes and the windows check every five minutes. Both include verified September 30, 2026 snapshots if the upstream service is unavailable, with a visible saved-data label. Changing service page formats may require updating a parser. Spotify failures end loading and show an unavailable state without exposing authorization errors or credentials.

The Now, Bookshelf, Food, favorites and movie queue sections contain manually curated information. Update those when new personal details are available.

## Desktop behavior

- Click or tap an app icon, or use Apps in the top bar. App URLs use hashes such as `/#running` and `/#videos`.
- Escape closes the active app; the taskbar restores minimized apps. Windows stay within the available desktop when dragged or resized.
- Help explains the controls. File changes the wallpaper, starts the screensaver, and toggles playful notifications. Screensaver and notifications are opt-in.
- The intro runs once per browser tab and can be skipped. Reduced-motion preferences skip it and turn off decorative animation.
- Photo thumbnails are optimized by Next.js. The viewer supports previous/next buttons, arrow keys, Escape, and keyboard focus management.

## Maintenance

`yarn.lock` is the only dependency lockfile. GitHub Actions runs lint, tests, and the production build for pull requests and main. Window-boundary and OAuth-state regressions have tests alongside the feed parsers. Next.js is pinned to the patched 15.5 line; PostCSS and nanoid resolutions keep its older transitive pins patched. Recheck those resolutions when upgrading Next.js.

For Spotify setup, start the development server and open `http://127.0.0.1:3000/api/spotify/login`. Register `http://127.0.0.1:3000/api/spotify/callback` in Spotify's app settings (adjust both ports if needed). Setup validates a short-lived state cookie and uses the same redirect URI in both steps. These setup endpoints return 404 in production; the deployed feeds continue using the existing server refresh token.

Legacy CV data remains in `src/data/resume-data.tsx` as source material. The live desktop's personal content is in `src/components/windows/`; unused template UI has been removed.
