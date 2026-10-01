# Ankit’s PersonalOS

A retro desktop portfolio built with Next.js 14, React, TypeScript and Tailwind, deployed on Vercel at https://ankitagrawal.com.

## Development

Use Node.js 20.19+, 22.13+ or 24+, then run `yarn install` and `yarn dev`.

Run `yarn lint`, `yarn test` and `yarn build` before publishing.

## Live content

- **Music:** Spotify currently playing, recent plays, short-term top artists and playlists. Playback refreshes every 30 seconds, recent plays every minute, and artists/playlists every five minutes while the page is visible. Configure `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` in the server environment. The refresh token needs `user-read-currently-playing`, `user-read-recently-played`, `user-top-read` and the playlist scopes used by the existing setup.
- **Movies:** Letterboxd RSS from `ankit010201`, including watched dates, ratings and plain-text reviews. Spoiler reviews are collapsed. The original favorites and queue remain curated separately.
- **Videos:** YouTube channel `@4nkitagrawal`. Uses the channel feed, with the public uploads page as a fallback when RSS is unavailable. Playback uses YouTube’s privacy-enhanced embed domain and starts on click.
- **Activity:** All, Cycling, Running, and Hiking filters. Cycling totals, recent rides, and hikes are verified Strava snapshots dated September 30, 2026; run widgets refresh on Strava. Curated race highlights remain available. Update the dated snapshots in `src/components/windows/ActivityWindow.tsx` when refreshing activities.

Letterboxd and YouTube upstream data is cached for 15 minutes and the windows check every five minutes. Both include verified September 30, 2026 snapshots if the upstream service is unavailable, with a visible saved-data label. Changing service page formats may require updating a parser. Spotify failures end loading and show an unavailable state without exposing authorization errors or credentials.

The Now, Bookshelf, Food, favorites and movie queue sections contain manually curated information. Update those when new personal details are available. Guestbook entries are local to the open window and are not stored on a server.
