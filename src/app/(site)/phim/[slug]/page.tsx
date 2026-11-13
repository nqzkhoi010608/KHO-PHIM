import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock3, Globe2, Play, Star, UserRound } from 'lucide-react';
import { ExpandableContent } from '@/components/site/expandable-content';
import { FavoriteButton } from '@/components/site/favorite-button';
import { Reveal } from '@/components/site/motion';
import { VsmovEpisodeSelector } from '@/components/site/vsmov-episode-selector';
import { getVsmovMovie } from '@/lib/vsmov/repository';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = await getVsmovMovie(slug);
  if (!movie) return { title: 'Không tìm thấy phim · Kho Phim' };
  return {
    title: `${movie.name} · Kho Phim`,
    description: movie.description,
    openGraph: { title: movie.name, description: movie.description, images: movie.bannerUrl ? [movie.bannerUrl] : movie.posterUrl ? [movie.posterUrl] : [] },
  };
}

export default async function MovieDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = await getVsmovMovie(slug);
  if (!movie) notFound();

  const firstEpisode = movie.allEpisodes[0] ?? null;
  const watchHref = firstEpisode ? `/xem-phim/${movie.slug}/${firstEpisode.slug}` : null;
  const statusLabel = movie.status === 'completed' ? 'Hoàn tất' : movie.status === 'trailer' ? 'Trailer' : 'Đang cập nhật';
  const statusTone = movie.status === 'completed' ? '#00c9b1' : 'var(--gold)';

  return (
    <div className="min-h-screen pb-16" style={{ background: 'var(--black)' }}>
      <section className="relative isolate overflow-hidden border-b" style={{ minHeight: '620px', borderColor: 'rgba(201,168,76,0.12)' }}>
        {movie.bannerUrl && <Image src={movie.bannerUrl} alt="" fill priority quality={100} sizes="100vw" className="object-cover object-[center_18%]" />}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(5,5,10,0.96) 0%, rgba(5,5,10,0.78) 38%, rgba(5,5,10,0.34) 72%, rgba(5,5,10,0.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, var(--black) 0%, rgba(5,5,10,0.18) 45%, rgba(5,5,10,0.46) 100%)' }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 22% 62%, rgba(201,168,76,0.18), transparent 38%)' }} />

        <div className="container-shell relative z-10 pt-28 lg:pt-36">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white" style={{ color: 'rgba(245,240,232,0.55)' }}><ArrowLeft size={15} /> Trang chủ</Link>
          <div className="grid items-end gap-8 pb-16 md:grid-cols-[220px_minmax(0,720px)] lg:grid-cols-[260px_minmax(0,760px)] lg:gap-12">
            <div className="relative hidden aspect-[2/3] overflow-hidden rounded-2xl border md:block" style={{ borderColor: 'rgba(245,240,232,0.16)', boxShadow: '0 24px 80px rgba(0,0,0,0.62)' }}>{movie.posterUrl && <Image src={movie.posterUrl} alt={`Poster ${movie.name}`} fill quality={100} sizes="260px" className="object-cover" />}</div>
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-2"><span className="badge badge-gold">{movie.quality || 'HD'}</span><span className="badge" style={{ color: statusTone, background: 'rgba(0,201,177,0.08)', border: `1px solid ${statusTone}33` }}>{statusLabel}</span>{movie.episodeCurrent && <span className="badge badge-glass">{movie.episodeCurrent}</span>}</div>
              <h1 className="max-w-4xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">{movie.name}</h1>
              {movie.originName && <p className="mt-4 text-base font-light italic" style={{ color: 'rgba(245,240,232,0.54)' }}>{movie.originName}</p>}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm" style={{ color: 'rgba(245,240,232,0.62)' }}>{movie.rating > 0 && <span className="flex items-center gap-1.5 font-bold text-white"><Star size={15} fill="currentColor" style={{ color: 'var(--gold)' }} /> {movie.rating.toFixed(1)}<span className="font-normal" style={{ color: 'var(--muted)' }}>/10</span></span>}{movie.year > 0 && <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {movie.year}</span>}{movie.duration && <span className="flex items-center gap-1.5"><Clock3 size={14} /> {movie.duration}</span>}{movie.language && <span>{movie.language}</span>}</div>
              <p className="mt-6 line-clamp-3 max-w-2xl whitespace-pre-line text-[15px] leading-8" style={{ color: 'rgba(245,240,232,0.7)' }}>{movie.description || 'Thông tin phim đang được cập nhật.'}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">{watchHref ? <Link href={watchHref} className="btn btn-primary px-7"><Play size={16} fill="currentColor" /> {movie.isMovie ? 'Xem phim' : 'Xem tập đầu'}</Link> : <span className="btn btn-quiet">Chưa có nguồn phát</span>}<FavoriteButton movieSlug={movie.slug} movieTitle={movie.name} posterUrl={movie.posterUrl} bannerUrl={movie.bannerUrl} /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-shell grid gap-6 pt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Reveal><section className="surface overflow-hidden">
          <div className="grid border-b sm:grid-cols-3" style={{ borderColor: 'var(--line)' }}>{[
            { label: 'Thể loại', value: movie.categories.join(', ') || '—', icon: null },
            { label: 'Quốc gia', value: movie.countries.join(', ') || '—', icon: <Globe2 size={14} /> },
            { label: 'Đạo diễn', value: movie.directors.join(', ') || '—', icon: <UserRound size={14} /> },
          ].map(({ label, value, icon }) => <div key={label} className="border-b p-5 last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0" style={{ borderColor: 'var(--line)' }}><p className="t-meta mb-2">{label}</p><p className="flex items-center gap-2 text-sm font-medium text-white">{icon}{value}</p></div>)}</div>
          <div className="p-6 sm:p-8"><p className="t-eyebrow-diamond mb-4">Nội dung phim</p><ExpandableContent content={movie.description} />{movie.actors.length > 0 && <p className="mt-6 text-sm leading-7" style={{ color: 'var(--muted-up)' }}>Diễn viên: <span className="font-semibold text-white">{movie.actors.join(', ')}</span></p>}</div>
          <div className="border-t p-6 sm:p-8" style={{ borderColor: 'var(--line)' }}><VsmovEpisodeSelector servers={movie.servers} slug={movie.slug} episodeCurrent={movie.episodeCurrent} /></div>
        </section></Reveal>

        <Reveal direction="left" delay={0.08}><aside className="surface h-fit p-6"><p className="t-eyebrow-diamond mb-4">Thông tin nhanh</p><div className="space-y-4">{[
          ['Trạng thái', statusLabel], ['Số tập', movie.episodeCurrent || '—'], ['Tổng tập', movie.episodeTotal > 0 ? `${movie.episodeTotal} tập` : '—'], ['Chất lượng', movie.quality || '—'], ['Ngôn ngữ', movie.language || '—'], ['Năm phát hành', movie.year > 0 ? String(movie.year) : '—'],
        ].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 border-b pb-3" style={{ borderColor: 'var(--line-soft)' }}><span className="text-xs" style={{ color: 'var(--muted)' }}>{label}</span><span className="text-right text-xs font-semibold text-white">{value}</span></div>)}</div><div className="mt-6 rounded-xl p-4" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.14)' }}><p className="text-xs font-semibold text-white">Muốn xem tiếp dễ dàng?</p><p className="mt-1 text-xs leading-5" style={{ color: 'var(--muted-up)' }}>Đăng nhập để lưu danh sách yêu thích và tiến trình xem.</p></div></aside></Reveal>
      </div>
    </div>
  );
}
