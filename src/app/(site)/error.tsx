'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { ErrorState } from '@/components/shared/section-state';

export default function ErrorPage({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-32"
      style={{ background: 'var(--ink)' }}
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(232,56,44,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container-shell relative z-10 max-w-lg text-center">
        {/* Icon */}
        <div
          className="mx-auto mb-6 grid h-16 w-16 place-items-center"
          style={{
            borderRadius: 'var(--r-xl)',
            background: 'rgba(232,56,44,0.08)',
            border: '1px solid rgba(232,56,44,0.18)',
          }}
        >
          <AlertTriangle size={28} style={{ color: 'var(--signal)' }} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-paper sm:text-3xl" style={{ letterSpacing: '-0.02em' }}>
          Đã có lỗi xảy ra
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          Hệ thống gặp sự cố không mong muốn. Thử tải lại trang hoặc quay về trang chủ.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="btn btn-primary px-6"
          >
            <RefreshCw size={15} />
            Thử lại
          </button>
          <a href="/" className="btn btn-quiet px-6">
            <Home size={15} />
            Trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}
