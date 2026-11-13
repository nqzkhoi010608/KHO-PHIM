import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-32" style={{ background: 'var(--black)' }}>
      {/* Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative z-10 text-center">
        {/* 404 hollow display */}
        <div className="relative mb-2 select-none">
          <span
            className="block font-black leading-none"
            style={{ fontSize: 'clamp(7rem, 20vw, 14rem)', letterSpacing: '-0.04em', color: 'transparent', WebkitTextStroke: '1.5px rgba(201,168,76,0.2)', lineHeight: 1 }}
          >
            404
          </span>
          <span
            className="pointer-events-none absolute inset-0 block font-black leading-none"
            style={{ fontSize: 'clamp(7rem, 20vw, 14rem)', letterSpacing: '-0.04em', background: 'linear-gradient(135deg, rgba(201,168,76,0.12), transparent 60%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}
          >
            404
          </span>
        </div>

        {/* Diamond strip decoration */}
        <div className="mb-8 flex items-center justify-center gap-2 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ width: '7px', height: '7px', borderRadius: '1px', background: i % 2 === 0 ? 'var(--gold)' : 'rgba(201,168,76,0.3)', transform: 'rotate(45deg)', flexShrink: 0 }} />
          ))}
        </div>

        <h1 className="t-h3">Trang không tìm thấy</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed" style={{ color: 'var(--muted-up)' }}>
          Phim có thể đã được di chuyển hoặc đường dẫn không đúng.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary px-6"><Home size={16} /> Về trang chủ</Link>
          <Link href="/tim-kiem" className="btn btn-quiet px-6"><Search size={16} /> Tìm phim</Link>
        </div>
      </div>
    </div>
  );
}
