import { Heart } from 'lucide-react';
import { FavoriteList } from '@/components/site/favorite-list';
import { Reveal } from '@/components/site/motion';

export const metadata = { title: 'Phim yêu thích · Kho Phim' };

export default function FavoritesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)' }}>
      <div className="relative overflow-hidden pt-28 pb-12" style={{ background: 'linear-gradient(180deg, rgba(245,184,0,0.04) 0%, transparent 100%)' }}>
        <div className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,184,0,0.07), transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="container-shell relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">Bộ sưu tập cá nhân</p>
            <div className="flex items-end justify-between gap-4">
              <h1 className="font-display text-4xl font-black tracking-[-0.03em] text-paper sm:text-5xl">
                Phim yêu thích
              </h1>
              <div className="grid h-11 w-11 place-items-center" style={{ borderRadius: 'var(--r-sm)', background: 'rgba(245,184,0,0.08)', border: '1px solid rgba(245,184,0,0.16)' }}>
                <Heart size={20} style={{ color: 'var(--gold)' }} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-shell pb-20 pt-4"><FavoriteList /></div>
    </div>
  );
}
