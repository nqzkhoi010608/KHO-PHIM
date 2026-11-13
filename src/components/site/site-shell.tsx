import Link from 'next/link';
import { Film, Mail, Send, Shield } from 'lucide-react';
import { SiteHeader } from './site-header';

type GenreItem   = { name: string; slug: string };
type CountryItem = { name: string; slug: string };

export function SiteShell({
  children,
  genreList = [],
  countryList = [],
}: {
  children: React.ReactNode;
  genreList?: GenreItem[];
  countryList?: CountryItem[];
}) {
  return (
    <>
      <SiteHeader genreList={genreList} countryList={countryList} />

      <main className="relative z-10 min-h-screen">{children}</main>

      {/* ══════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════ */}
      <footer className="relative overflow-hidden" style={{ background: 'var(--black-soft)' }}>

        {/* Top gold separator */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.5) 30%, var(--gold-pale) 50%, rgba(201,168,76,0.5) 70%, transparent 95%)' }}
        />
        {/* Diamond on line */}
        <div
          className="absolute left-1/2 top-0 z-10 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{ background: 'var(--gold)', boxShadow: '0 0 10px rgba(201,168,76,0.7)', borderRadius: '1px' }}
        />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.03), transparent 70%)', filter: 'blur(80px)' }}
        />

        <div className="container-shell relative z-10">

          {/* ── Band 1: Slogan + Newsletter ── */}
          <div
            className="flex flex-col gap-6 border-b py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
            style={{ borderColor: 'rgba(201,168,76,0.08)' }}
          >
            {/* Slogan */}
            <div className="max-w-sm">
              <p
                className="text-[22px] font-black leading-tight tracking-tight text-white sm:text-[26px]"
                style={{ letterSpacing: '-0.025em' }}
              >
                Trạm phim mất ngủ.
              </p>
              <p
                className="mt-2 text-[13px] font-light leading-[1.75]"
                style={{ color: 'rgba(245,240,232,0.42)' }}
              >
                Không gian xem phim tiếng Việt gọn gàng, chất lượng cao và tôn trọng thời gian của bạn.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full max-w-sm shrink-0">
              <p
                className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ color: 'rgba(201,168,76,0.7)' }}
              >
                Nhận thông báo phim mới
              </p>
              <form className="flex gap-2">
                <div
                  className="flex flex-1 items-center gap-2 px-3.5"
                  style={{
                    height: '40px',
                    borderRadius: 'var(--r-sm)',
                    background: 'rgba(245,240,232,0.04)',
                    border: '1px solid rgba(201,168,76,0.14)',
                  }}
                >
                  <Mail size={13} style={{ color: 'rgba(201,168,76,0.45)', flexShrink: 0 }} />
                  <input
                    type="email"
                    className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
                    style={{ color: 'var(--white)' }}
                    placeholder="email@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="grid shrink-0 place-items-center transition-opacity hover:opacity-80"
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: 'var(--r-sm)',
                    background: 'linear-gradient(135deg, var(--gold-deep), var(--gold))',
                    color: '#1a0e00',
                  }}
                  aria-label="Đăng ký nhận tin"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* ── Band 2: Brand + Links ── */}
          <div
            className="grid grid-cols-2 gap-8 border-b py-10 sm:grid-cols-4 sm:gap-10"
            style={{ borderColor: 'rgba(201,168,76,0.08)' }}
          >
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80">
                <div
                  className="logo-mark relative grid h-9 w-9 place-items-center overflow-hidden shrink-0"
                  style={{ borderRadius: '10px' }}
                >
                  <Film size={16} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
                </div>
                <div>
                  <span className="block text-[14px] font-black leading-tight text-white" style={{ letterSpacing: '-0.025em' }}>Kho Phim</span>
                  <span className="block text-[8px] font-black uppercase" style={{ letterSpacing: '0.24em', color: 'var(--gold)', marginTop: '-1px' }}>Cinema</span>
                </div>
              </Link>

              <p
                className="mt-4 text-[12.5px] font-light leading-[1.8]"
                style={{ color: 'rgba(245,240,232,0.36)' }}
              >
                Xem phim HD miễn phí. Vietsub & Thuyết minh. Cập nhật nhanh nhất.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {['HD', '4K', 'FHD', 'Vietsub', 'Song ngữ'].map((t) => (
                  <span
                    key={t}
                    className="text-[9.5px] font-black uppercase tracking-[0.08em]"
                    style={{
                      padding: '2px 8px', borderRadius: '4px',
                      background: 'rgba(201,168,76,0.07)',
                      border: '1px solid rgba(201,168,76,0.14)',
                      color: 'rgba(201,168,76,0.6)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Khám phá */}
            <FooterLinkCol
              heading="Khám phá"
              links={[
                { href: '/',                label: 'Trang chủ' },
                { href: '/phim-le',         label: 'Phim lẻ' },
                { href: '/phim-bo',         label: 'Phim bộ' },
                { href: '/hoat-hinh',       label: 'Hoạt hình' },
                { href: '/phim-chieu-rap',  label: 'Phim chiếu rạp' },
                { href: '/tim-kiem',        label: 'Tìm kiếm' },
              ]}
            />

            {/* Thể loại */}
            <FooterLinkCol
              heading="Thể loại"
              links={[
                { href: '/the-loai/hanh-dong',  label: 'Hành động' },
                { href: '/the-loai/tinh-cam',   label: 'Tình cảm' },
                { href: '/the-loai/kinh-di',    label: 'Kinh dị' },
                { href: '/the-loai/hai-huoc',   label: 'Hài hước' },
                { href: '/the-loai/vien-tuong', label: 'Viễn tưởng' },
                { href: '/the-loai/tam-ly',     label: 'Tâm lý' },
              ]}
            />

            {/* Tài khoản */}
            <FooterLinkCol
              heading="Tài khoản"
              links={[
                { href: '/dang-nhap',       label: 'Đăng nhập' },
                { href: '/tai-khoan',       label: 'Hồ sơ cá nhân' },
                { href: '/phim-yeu-thich',  label: 'Phim yêu thích' },
                { href: '/lich-su-xem',     label: 'Lịch sử xem' },
              ]}
            />
          </div>

          {/* ── Band 3: Stats ── */}
          <div
            className="grid grid-cols-2 gap-6 border-b py-8 sm:grid-cols-4"
            style={{ borderColor: 'rgba(201,168,76,0.08)' }}
          >
            {[
              { value: '10,000+', label: 'Bộ phim' },
              { value: 'HD / 4K', label: 'Chất lượng' },
              { value: '100%',    label: 'Miễn phí' },
              { value: '24/7',    label: 'Hoạt động' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p
                  className="text-[22px] font-black tracking-tight sm:text-[26px]"
                  style={{ color: 'var(--gold)', letterSpacing: '-0.02em' }}
                >
                  {value}
                </p>
                <p className="mt-0.5 text-[12px] font-medium" style={{ color: 'rgba(245,240,232,0.38)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* ── Band 4: Bottom bar ── */}
          <div
            className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row"
          >
            <p className="text-[12px] font-light" style={{ color: 'rgba(245,240,232,0.22)' }}>
              © 2026 Kho Phim. Tất cả quyền được bảo lưu.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link href="/chinh-sach-bao-mat" className="text-[12px] transition-colors hover:text-gold" style={{ color: 'rgba(245,240,232,0.22)' }}>
                Chính sách bảo mật
              </Link>
              <div className="h-3 w-px" style={{ background: 'rgba(201,168,76,0.18)' }} />
              <Link href="/dieu-khoan-su-dung" className="text-[12px] transition-colors hover:text-gold" style={{ color: 'rgba(245,240,232,0.22)' }}>
                Điều khoản
              </Link>
              <div className="flex items-center gap-1.5" style={{ color: 'rgba(245,240,232,0.18)' }}>
                <Shield size={11} />
                <span className="text-[11px]">Nội dung được bảo vệ</span>
              </div>
            </div>

            <p className="text-center text-[11px] font-light sm:text-right" style={{ color: 'rgba(245,240,232,0.14)' }}>
              Chỉ phục vụ học tập & giải trí.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── Helper: Footer link column ── */
function FooterLinkCol({ heading, links }: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p
        className="mb-4 text-[9.5px] font-black uppercase tracking-[0.22em]"
        style={{ color: 'rgba(201,168,76,0.55)' }}
      >
        {heading}
      </p>
      <ul className="space-y-2.5">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-block text-[13px] font-medium transition-all duration-200 hover:translate-x-0.5 hover:text-gold"
              style={{ color: 'rgba(245,240,232,0.42)' }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
