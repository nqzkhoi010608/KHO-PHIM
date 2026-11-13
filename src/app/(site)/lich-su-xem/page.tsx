import { Clock3 } from 'lucide-react';
import { Reveal } from '@/components/site/motion';
import { WatchHistoryList } from '@/components/site/watch-history-list';

export const metadata = { title: 'Lịch sử xem · Kho Phim' };

export default function HistoryPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)' }}>
      <div className="relative overflow-hidden pt-28 pb-12" style={{ background: 'linear-gradient(180deg, rgba(0,201,177,0.04) 0%, transparent 100%)' }}>
        <div className="pointer-events-none absolute -left-20 -top-20 h-[280px] w-[280px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,201,177,0.06), transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="container-shell relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">Xem tiếp</p>
            <div className="flex items-end justify-between gap-4">
              <h1 className="font-display text-4xl font-black tracking-[-0.03em] text-paper sm:text-5xl">
                Lịch sử xem
              </h1>
              <div className="grid h-11 w-11 place-items-center" style={{ borderRadius: 'var(--r-sm)', background: 'rgba(0,201,177,0.07)', border: '1px solid rgba(0,201,177,0.14)' }}>
                <Clock3 size={20} style={{ color: 'var(--teal)' }} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-shell pb-20 pt-4"><WatchHistoryList /></div>
    </div>
  );
}
