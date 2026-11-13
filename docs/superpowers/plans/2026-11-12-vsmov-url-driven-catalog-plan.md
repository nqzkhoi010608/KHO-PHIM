# VSMOV URL-driven catalogue implementation plan

## 1. Make the VSMOV source file authoritative

- Keep only page/API URLs in `src/lib/demo-data/vsmov-sources.ts`.
- Reuse the parser to normalize both `/phim/{slug}` and `/api/phim/{slug}`.
- Add tests for duplicate slugs, invalid hosts, and API path conversion.

## 2. Normalize the API contract correctly

- Extend the normalized movie model with `bannerUrl`.
- Map `poster_url` to `bannerUrl` and `thumb_url` to `posterUrl`.
- Keep episode `link_embed` as `embedUrl` only after HTTPS/allowed-host validation.
- Add unit tests proving image and embed mapping.

## 3. Build the dynamic catalogue repository

- Fetch configured detail endpoints with `Promise.allSettled`.
- Return successful movies as the existing `Movie` UI shape, mapping banner/poster and episode data automatically.
- Use normalized API data for homepage, search, lists, sitemap, and related movie sections.
- Retain local demo data only as a compatibility fallback for existing non-VSMOV tests.

## 4. Connect pages and cards to the dynamic data

- Update `getHomeCatalog` and `listMovies` to use fetched VSMOV movies.
- Update detail hero/metadata to use `bannerUrl` and `posterUrl` correctly.
- Ensure hero/card CTAs use the first real episode slug instead of hard-coded `1`.
- Keep `/phim/[slug]` and `/xem-phim/[slug]/[episode]` server-rendered with Promise params.

## 5. Verify playback and failure states

- Confirm the player receives `link_embed` through the normalized episode model.
- Reject malformed/untrusted embeds without rendering an iframe.
- Keep partial API failures isolated to the failing source.
- Test typecheck, unit tests, lint output, and production build.

## Files expected to change

- `src/lib/vsmov/normalizer.ts`
- `src/lib/vsmov/repository.ts`
- `src/lib/catalog/repository.ts`
- `src/app/(site)/phim/[slug]/page.tsx`
- `src/app/sitemap.ts`
- homepage/card components only where hard-coded episode/image semantics require it
- `tests/vsmov-sources.test.ts` plus a normalizer/repository test

