import Link from 'next/link';
import { ArrowRight, Clock3, Heart, Settings2, UserRound } from 'lucide-react';

export const metadata = { title: 'Tài khoản · Kho Phim' };

export default function AccountPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--ink)' }}
    >
      {/* Header area */}
      <div
        className="relative overflow-hidden pt-28 pb-12"
        style={{
          background: 'linear-gradient(180deg, rgba(232,56,44,0.05) 0%, transparent 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,56,44,0.07), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="container-shell relative z-10">
          <p className="eyebrow mb-4">Không gian của bạn</p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h1
              className="font-display text-4xl font-black tracking-[-0.03em] text-paper sm:text-5xl"
            >
              Tài khoản
            </h1>
            <Link href="/dang-nhap" className="btn btn-primary w-fit px-6">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>

      {/* Tiles */}
      <div className="container-shell pb-20">
        {/* Avatar area */}
        <div
          className="mb-8 flex items-center gap-4 p-5"
          style={{
            borderRadius: 'var(--r-xl)',
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            boxShadow: 'var(--shadow-panel)',
          }}
        >
          {/* Avatar placeholder */}
          <div
            className="grid h-14 w-14 shrink-0 place-items-center"
            style={{
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(232,56,44,0.2), rgba(245,184,0,0.1))',
              border: '2px solid rgba(232,56,44,0.2)',
            }}
          >
            <UserRound size={24} style={{ color: 'var(--signal)' }} />
          </div>

          <div>
            <p className="text-[15px] font-bold text-paper">Khách</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Đăng nhập để đồng bộ dữ liệu xem phim
            </p>
          </div>

          <Link
            href="/dang-nhap"
            className="btn btn-quiet ml-auto px-4 text-[13px]"
          >
            Đăng nhập
          </Link>
        </div>

        {/* Feature tiles */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/lich-su-xem" className="account-tile group">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center transition-all duration-300 group-hover:scale-110"
              style={{
                borderRadius: 'var(--r-sm)',
                background: 'rgba(232,56,44,0.09)',
                border: '1px solid rgba(232,56,44,0.18)',
              }}
            >
              <Clock3 size={18} style={{ color: 'var(--signal)' }} />
            </div>
            <span>
              <strong>Lịch sử xem</strong>
              <small>Tiếp tục những phim đang xem dở</small>
            </span>
            <ArrowRight size={16} className="ml-auto transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--muted-deep)' }} />
          </Link>

          <Link href="/phim-yeu-thich" className="account-tile group">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center transition-all duration-300 group-hover:scale-110"
              style={{
                borderRadius: 'var(--r-sm)',
                background: 'rgba(245,184,0,0.08)',
                border: '1px solid rgba(245,184,0,0.16)',
              }}
            >
              <Heart size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <span>
              <strong>Phim yêu thích</strong>
              <small>Những phim bạn đã lưu để xem</small>
            </span>
            <ArrowRight size={16} className="ml-auto transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--muted-deep)' }} />
          </Link>

          <div className="account-tile">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center"
              style={{
                borderRadius: 'var(--r-sm)',
                background: 'rgba(0,201,177,0.07)',
                border: '1px solid rgba(0,201,177,0.14)',
              }}
            >
              <Settings2 size={18} style={{ color: 'var(--teal)' }} />
            </div>
            <span>
              <strong>Cài đặt</strong>
              <small>Đăng nhập để truy cập tính năng này</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
