import { z } from 'zod';

export const vsmovMovieSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  thumb_url: z.string().optional().nullable(),
  poster_url: z.string().optional().nullable(),
  episodes: z.unknown().optional(),
}).passthrough();

export type VsmovMovie = z.infer<typeof vsmovMovieSchema>;
