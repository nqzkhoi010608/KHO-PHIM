'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Film, Menu, Search, UserRound, X } from 'lucide-react';

type GenreItem   = { name: string; slug: string };
type CountryItem = { name: string; slug: string };

export function SiteHeader({
  genreList,
  countryList,
}: {
  genreList: GenreItem[];
  countryList: CountryItem[];
}) {
  const [scrolled,       setScrolled]       = useState(false);
  const [scrollY,        setScrollY]        = useState(0);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openSection,    setOpenSection]    = useState<-1 | 0 | 1>(-1);
  const [searchFocused,  setSearchFocused]  = useState(false);
  /* Mobile search overlay */
  const [mobileSearch,   setMobileSearch]   = useState(false);
  const mobileSearchRef  = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 20); setScrollY(window.scrollY); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [mobileOpen]);

  /* Tự focus input khi mở mobile search */
  useEffect(() => {
    if (mobileSearch) {
      setTimeout(() => mobileSearchRef.current?.focus(), 80);
    }
  }, [mobileSearch]);

  useEffect(() => { setMobileOpen(false); setMobileSearch(false); }, [pathname]);

  const navLinks = [
    { href: '/phim-le', label: 'Phim Lẻ' },
    { href: '/phim-bo', label: 'Phim Bộ' },
  ];

  const bgOpacity = Math.min(0.3 + (scrollY / 60) * 0.6, 0.94);
  const H = '36px';

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: `rgba(5,5,10,${bgOpacity})`,
            backdropFilter:       scrolled ? 'blur(40px) saturate(160%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(160%)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent',
            boxShadow:    scrolled ? '0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(201,168,76,0.05)' : 'none',
          }}
        />

        {/* ── Mobile Search Overlay — chiếm toàn bộ header width ── */}
        <AnimatePresence>
          {mobileSearch && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex items-center gap-2 px-4 lg:hidden"
              style={{ background: 'rgba(5,5,10,0.97)' }}
            >
              <Search size={15} style={{ color: 'rgba(201,168,76,0.5)', flexShrink: 0 }} />
              <form action="/tim-kiem" className="flex-1">
                <input
                  ref={mobileSearchRef}
                  name="q"
                  type="search"
                  className="w-full bg-transparent text-[14px] outline-none"
                  style={{ color: 'var(--white)', caretColor: 'var(--gold)' }}
                  placeholder="Tìm phim, diễn viên, thể loại..."
                  aria-label="Tìm kiếm phim"
                />
              </form>
              <button
                onClick={() => setMobileSearch(false)}
                className="grid shrink-0 place-items-center rounded-lg"
                style={{ width: '30px', height: '30px', color: 'rgba(245,240,232,0.5)' }}
                aria-label="Đóng tìm kiếm"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container-shell relative z-10 flex items-center gap-3">

          {/* ── LEFT: Burger + Logo + Nav ── */}
          <div className="flex flex-1 items-center gap-3 lg:gap-6">

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="grid place-items-center rounded-xl transition-all duration-200 lg:hidden"
              style={{
                width: H, height: H, flexShrink: 0,
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid rgba(201,168,76,0.14)',
                color: 'rgba(245,240,232,0.7)',
              }}
              aria-label="Mở menu"
            >
              <Menu size={17} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity duration-200 hover:opacity-80">
              <div
                className="logo-mark relative grid place-items-center overflow-hidden"
                style={{ width: H, height: H, borderRadius: '10px', flexShrink: 0 }}
              >
                <Film size={16} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
              </div>
              <div className="hidden sm:block">
                <span className="block text-[14.5px] font-black leading-tight text-white" style={{ letterSpacing: '-0.025em' }}>
                  Kho Phim
                </span>
                <span
                  className="block text-[8px] font-black uppercase leading-tight"
                  style={{ letterSpacing: '0.24em', color: 'var(--gold)', marginTop: '-1px' }}
                >
                  Cinema
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Điều hướng chính">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-all duration-200"
                    style={{ color: active ? 'var(--white)' : 'rgba(245,240,232,0.5)' }}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-lg" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.14)' }} />
                    )}
                    <span className="relative">{label}</span>
                    {active && (
                      <span
                        className="absolute inset-x-3 bottom-0 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--gold-deep), var(--gold-pale))', boxShadow: '0 0 8px rgba(201,168,76,0.5)' }}
                      />
                    )}
                  </Link>
                );
              })}

              <DropdownMenu label="Thể Loại" pathname={pathname} items={genreList.map((g) => ({ label: g.name, href: `/the-loai/${g.slug}` }))} width={300} />
              <DropdownMenu label="Quốc Gia" pathname={pathname} items={countryList.map((c) => ({ label: c.name, href: `/quoc-gia/${c.slug}` }))} width={300} />
            </nav>
          </div>

          {/* ── RIGHT: Search + Login ── */}
          <div className="flex items-center gap-2">

            {/* Search pill — desktop only */}
            <form
              action="/tim-kiem"
              className="relative hidden lg:block"
              style={{ width: searchFocused ? '340px' : '220px', transition: 'width 0.35s var(--ease)' }}
            >
              <Search
                size={13}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300"
                style={{ color: searchFocused ? 'var(--gold)' : 'rgba(245,240,232,0.3)' }}
              />
              <input
                name="q"
                className="w-full bg-transparent pl-9 pr-4 text-[13px] outline-none"
                style={{
                  height: H,
                  borderRadius: 'var(--r-pill)',
                  background: searchFocused ? 'rgba(201,168,76,0.07)' : 'rgba(245,240,232,0.04)',
                  border: `1px solid ${searchFocused ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
                  boxShadow: searchFocused ? '0 0 0 3px rgba(201,168,76,0.08)' : 'none',
                  color: 'var(--white)',
                  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                }}
                placeholder="Tìm phim, diễn viên..."
                aria-label="Tìm kiếm phim"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </form>

            {/* Mobile search icon — mở overlay, KHÔNG navigate */}
            <button
              onClick={() => setMobileSearch(true)}
              className="grid place-items-center rounded-xl transition-all duration-200 lg:hidden"
              style={{
                width: H, height: H, flexShrink: 0,
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid rgba(201,168,76,0.14)',
                color: 'rgba(245,240,232,0.6)',
              }}
              aria-label="Tìm kiếm"
            >
              <Search size={15} />
            </button>

            {/* Login button — desktop only (mobile có trong drawer) */}
            <Link
              href="/dang-nhap"
              className="btn btn-primary hidden shrink-0 items-center gap-1.5 font-bold lg:flex"
              style={{
                height: H, minHeight: H,
                borderRadius: 'var(--r-pill)',
                paddingLeft: '16px', paddingRight: '16px',
                fontSize: '12.5px',
              }}
            >
              <UserRound size={14} strokeWidth={2.5} />
              Thành Viên
            </Link>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════
          MOBILE DRAWER
          ════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(5px)' }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 flex w-[min(84vw,300px)] flex-col overflow-hidden"
              style={{
                background: 'rgba(5,5,10,0.98)',
                backdropFilter: 'blur(44px)',
                borderRight: '1px solid rgba(201,168,76,0.12)',
                boxShadow: '10px 0 70px rgba(0,0,0,0.65)',
              }}
            >
              {/* Gold top line */}
              <div className="h-[2px] shrink-0" style={{ background: 'linear-gradient(90deg, transparent, var(--gold) 40%, var(--gold-pale) 60%, transparent)' }} />

              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%)', filter: 'blur(40px)' }}
              />

              {/* Header */}
              <div
                className="flex shrink-0 items-center justify-between px-4 py-3.5"
                style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
              >
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <div
                    className="logo-mark relative grid place-items-center overflow-hidden"
                    style={{ width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0 }}
                  >
                    <Film size={13} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
                  </div>
                  <span className="text-[14.5px] font-black text-white" style={{ letterSpacing: '-0.02em' }}>Kho Phim</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid place-items-center rounded-lg"
                  style={{ width: '30px', height: '30px', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.12)', color: 'rgba(245,240,232,0.5)', flexShrink: 0 }}
                  aria-label="Đóng menu"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="nice-scroll flex-1 overflow-y-auto px-3 pb-4 pt-2">
                <div className="space-y-0.5">
                  {navLinks.map(({ href, label }) => {
                    const active = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-200"
                        style={{
                          background: active ? 'rgba(201,168,76,0.09)' : 'transparent',
                          color: active ? 'var(--gold)' : 'rgba(245,240,232,0.72)',
                          borderLeft: active ? '2px solid rgba(201,168,76,0.5)' : '2px solid transparent',
                        }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>

                <SidebarAccordion
                  label="Thể Loại"
                  isOpen={openSection === 0}
                  onToggle={() => setOpenSection(openSection === 0 ? -1 : 0)}
                  items={genreList.map((g) => ({ label: g.name, href: `/the-loai/${g.slug}` }))}
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                />

                <SidebarAccordion
                  label="Quốc Gia"
                  isOpen={openSection === 1}
                  onToggle={() => setOpenSection(openSection === 1 ? -1 : 1)}
                  items={countryList.map((c) => ({ label: c.name, href: `/quoc-gia/${c.slug}` }))}
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                />
              </nav>

              {/* Bottom CTA */}
              <div
                className="shrink-0 px-4 pb-5 pt-3"
                style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
              >
                <Link
                  href="/dang-nhap"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-primary w-full justify-center text-[13.5px]"
                >
                  <UserRound size={15} />
                  Thành Viên
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Desktop dropdown ── */
function DropdownMenu({
  label, pathname, items, width,
}: {
  label: string; pathname: string;
  items: { label: string; href: string }[];
  width: number;
}) {
  return (
    <div className="group relative">
      <button
        className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-all duration-200"
        style={{ color: 'rgba(245,240,232,0.5)' }}
      >
        {label}
        <ChevronDown size={11} className="transition-transform duration-300 group-hover:rotate-180" style={{ color: 'rgba(201,168,76,0.45)' }} />
      </button>

      <div
        className="invisible absolute left-0 top-[calc(100%+8px)] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
        style={{ width, transitionProperty: 'opacity, transform', transform: 'translateY(-4px)' }}
      >
        <div
          style={{
            borderRadius: 'var(--r-lg)',
            background: 'rgba(8,8,16,0.97)',
            backdropFilter: 'blur(44px) saturate(150%)',
            WebkitBackdropFilter: 'blur(44px) saturate(150%)',
            border: '1px solid rgba(201,168,76,0.14)',
            boxShadow: '0 36px 100px rgba(0,0,0,0.65), 0 1px 0 rgba(201,168,76,0.07) inset',
            overflow: 'hidden',
          }}
        >
          <div
            className="nice-scroll overflow-y-auto p-2"
            style={{ maxHeight: '300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px' }}
          >
            {items.map(({ label: l, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="truncate rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200"
                  style={{
                    background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: active ? 'var(--gold)' : 'rgba(245,240,232,0.62)',
                    borderLeft: active ? '2px solid rgba(201,168,76,0.5)' : '2px solid transparent',
                  }}
                >
                  {l}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile sidebar accordion ── */
function SidebarAccordion({
  label, isOpen, onToggle, items, pathname, onNavigate,
}: {
  label: string; isOpen: boolean; onToggle: () => void;
  items: { label: string; href: string }[]; pathname: string; onNavigate: () => void;
}) {
  return (
    <div className="mt-1" style={{ borderTop: '1px solid rgba(201,168,76,0.07)' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-200"
        style={{
          background: isOpen ? 'rgba(201,168,76,0.07)' : 'transparent',
          color: isOpen ? 'var(--gold)' : 'rgba(245,240,232,0.72)',
          borderLeft: isOpen ? '2px solid rgba(201,168,76,0.5)' : '2px solid transparent',
          marginTop: '2px',
        }}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: isOpen ? 'var(--gold)' : 'rgba(201,168,76,0.4)', flexShrink: 0 }}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-1 px-1 pb-2 pt-1.5">
              {items.map(({ label: l, href }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    className="truncate rounded-lg px-3 py-2 text-[12.5px] font-medium transition-all duration-200"
                    style={{
                      background: active ? 'rgba(201,168,76,0.1)' : 'rgba(245,240,232,0.03)',
                      color: active ? 'var(--gold)' : 'rgba(245,240,232,0.6)',
                      border: `1px solid ${active ? 'rgba(201,168,76,0.22)' : 'rgba(245,240,232,0.06)'}`,
                    }}
                  >
                    {l}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
