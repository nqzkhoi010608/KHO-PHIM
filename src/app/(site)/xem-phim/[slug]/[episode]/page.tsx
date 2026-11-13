import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clapperboard, Play, Star } from 'lucide-react';
import { DeveloperToolsGuard } from '@/components/site/developer-tools-guard';
import { ExpandableContent } from '@/components/site/expandable-content';
import { VsmovPlayer } from '@/components/site/vsmov-player';
import { VsmovWatchSidebar } from '@/components/site/vsmov-watch-sidebar';
import { getVsmovMovie } from '@/lib/vsmov/repository';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; episode: string }> }) {
  const { slug, episode: episodeSlug } = await params;
  const movie = await getVsmovMovie(slug);
  if (!movie) return { title: 'Xem phim · Kho Phim' };
  const episode = movie.allEpisodes.find((item) => item.slug === episodeSlug);
  return { title: `${movie.name}${episode ? ` — Tập ${episode.name}` : ''} · Kho Phim`, description: movie.description };
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string; episode: string }> }) {
  const { slug, episode: episodeSlug } = await params;
  const movie = await getVsmovMovie(slug);
  if (!movie) notFound();

  const episode = movie.allEpisodes.find((item) => item.slug === episodeSlug) ?? null;
  if (movie.allEpisodes.length > 0 && !episode) notFound();

  const serverEpisodes = episode ? movie.servers[episode.serverIndex]?.episodes ?? [] : [];
  const prevEpisode = episode ? serverEpisodes[episode.episodeIndex - 1] ?? null : null;
  const nextEpisode = episode ? serverEpisodes[episode.episodeIndex + 1] ?? null : null;
  const hasEpisodeList = movie.allEpisodes.length > 1;

  return (
    <div className="min-h-screen pb-16 pt-16" style={{ background: 'var(--black)' }}>
      <main className="container-shell pt-3 sm:pt-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            href={`/phim/${movie.slug}`}
            className="inline-flex min-w-0 items-center gap-2 truncate text-sm font-semibold transition-colors hover:text-white"
            style={{ color: 'rgba(245,240,232,0.58)' }}
          >
            <ArrowLeft size={15} className="shrink-0" />
            <span className="truncate">{movie.name}</span>
            <span className="shrink-0" style={{ color: 'rgba(245,240,232,0.3)' }}>/ Tập {episode?.name ?? '—'}</span>
          </Link>
          <div className="hidden shrink-0 items-center gap-2 text-xs sm:flex" style={{ color: 'var(--muted-up)' }}>
            <Clapperboard size={15} style={{ color: 'var(--gold)' }} />
            {movie.quality || 'HD'}
            <span className="opacity-40">•</span>
            {movie.language || 'Vietsub'}
          </div>
        </div>

        <div className={`grid gap-5 ${hasEpisodeList ? 'xl:grid-cols-[minmax(0,1fr)_320px]' : 'mx-auto w-full max-w-5xl'}`}>
          <section className="min-w-0">
            <DeveloperToolsGuard>
              <VsmovPlayer
                key={episode?.slug ?? 'empty'}
                episode={episode}
                prevEpisode={prevEpisode}
                nextEpisode={nextEpisode}
                slug={movie.slug}
              />
            </DeveloperToolsGuard>

            <div className="surface mt-5 overflow-hidden">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b p-5 sm:p-7" style={{ borderColor: 'var(--line)' }}>
                <div>
                  <p className="t-eyebrow-diamond mb-2">Đang xem</p>
                  <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{movie.name}</h1>
                  <p className="mt-1 text-sm" style={{ color: 'var(--muted-up)' }}>
                    {movie.originName}{episode ? ` · Tập ${episode.name}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs sm:hidden" style={{ color: 'var(--muted-up)' }}>
                  <Clapperboard size={15} style={{ color: 'var(--gold)' }} />
                  {movie.quality || 'HD'}
                  <span className="opacity-40">•</span>
                  {movie.language || 'Vietsub'}
                </div>
              </div>

              <div className="relative h-32 overflow-hidden sm:h-44">
                {movie.bannerUrl && <Image src={movie.bannerUrl} alt="" fill quality={100} sizes="(max-width: 1280px) 100vw, 900px" className="object-cover object-[center_24%]" />}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(10,10,20,0.96), rgba(10,10,20,0.38), rgba(10,10,20,0.88))' }} />
                <div className="absolute inset-0 flex items-end p-5 sm:p-7"><p className="t-eyebrow-diamond">Về bộ phim</p></div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-7">
                {[
                  { label: 'Năm', value: movie.year > 0 ? String(movie.year) : '—', icon: <CalendarDays size={14} /> },
                  { label: 'Đánh giá', value: movie.rating > 0 ? `${movie.rating.toFixed(1)} / 10` : 'Chưa có', icon: <Star size={14} fill="currentColor" /> },
                  { label: 'Thể loại', value: movie.categories.slice(0, 2).join(', ') || '—', icon: <Play size={14} /> },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span style={{ color: 'var(--gold)' }}>{icon}</span>
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--muted)' }}>{label}</span>
                      <span className="mt-1 block text-xs font-semibold text-white">{value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t p-5 sm:p-7" style={{ borderColor: 'var(--line)' }}>
                <ExpandableContent content={movie.description} />
              </div>
            </div>
          </section>

          {hasEpisodeList && <VsmovWatchSidebar servers={movie.servers} slug={movie.slug} currentEpisodeSlug={episode?.slug ?? ''} />}
        </div>
      </main>
    </div>
  );
}
