# VSMOV account and watch experience implementation plan

## 1. Persistence schema and API

- Add Supabase migration for user favorites and VSMOV watch progress keyed by movie/episode slug.
- Add authenticated GET/POST/DELETE favorite behavior.
- Add authenticated GET/POST progress behavior with Zod validation and RLS-compatible ownership.

## 2. Auth-aware client behavior

- Make FavoriteButton load saved state and redirect unauthenticated users to login with a safe `next` path.
- Preserve `next` through the OAuth callback.
- Add auth-aware progress status and fallback messaging when Supabase is not configured.

## 3. VSMOV player progress bridge

- Keep `link_embed` as the iframe source.
- Validate postMessage origin and payload.
- Fetch stored progress, request resume from the embed, and persist accepted progress periodically.
- Never access cross-origin iframe DOM or log embed URLs.

## 4. Detail/watch redesign

- Rebuild visual hierarchy around banner, poster, metadata and primary actions.
- Improve banner rendering with correct semantic mapping, `quality`, `sizes`, and less-obscuring overlays.
- Reorganize watch page into player, episode/server rail and progress context with mobile stacking.

## 5. Verification

- Add tests for URL/image/embed mapping, auth-required behavior and progress payload contracts.
- Run typecheck, tests, production build and targeted lint review.

