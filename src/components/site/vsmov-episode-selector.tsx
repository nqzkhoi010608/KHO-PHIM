'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ListVideo } from 'lucide-react';
import type { NormalizedServer } from '@/lib/vsmov/normalizer';

export function VsmovEpisodeSelector({
  servers,
  slug,
  episodeCurrent,
}: {
  servers: NormalizedServer[];
  slug: string;
  episodeCurrent: string;
}) {
  const [activeServer, setActiveServer] = useState(0);

  /* Không có server hoặc không có tập nào */
  if (servers.length === 0) {
    return (
      <div>
        <p className="t-eyebrow-diamond mb-4">Danh sách tập</p>
        <div
          className="flex items-center justify-center py-8 text-sm"
          style={{
            borderRadius: 'var(--r-lg)',
            border: '1px dashed rgba(201,168,76,0.12)',
            background: 'rgba(201,168,76,0.02)',
            color: 'var(--muted-up)',
          }}
        >
          Chưa có nguồn phát — vui lòng quay lại sau.
        </div>
      </div>
    );
  }

  const server = servers[activeServer] ?? servers[0];

  if (!server || server.episodes.length === 0) {
    return (
      <div>
        <p className="t-eyebrow-diamond mb-4">Danh sách tập</p>
        <p className="text-sm" style={{ color: 'var(--muted-up)' }}>
          Server này chưa có tập nào.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListVideo size={16} style={{ color: 'var(--gold)' }} />
          <span className="text-[15px] font-bold text-white">Danh sách tập</span>
          {episodeCurrent && (
            <span
              className="text-[11px] font-semibold"
              style={{ padding: '2px 8px', borderRadius: '5px', background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.18)', color: 'var(--gold)' }}
            >
              {episodeCurrent}
            </span>
          )}
        </div>

        {/* Server switcher — chỉ hiện nếu có nhiều hơn 1 server */}
        {servers.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold" style={{ color: 'var(--muted)' }}>Server:</span>
            {servers.map((srv, idx) => (
              <button
                key={idx}
                onClick={() => setActiveServer(idx)}
                className="text-[11px] font-bold transition-all duration-200"
                style={{
                  padding: '3px 10px', borderRadius: '5px',
                  background: idx === activeServer ? 'rgba(201,168,76,0.12)' : 'rgba(245,240,232,0.04)',
                  border: `1px solid ${idx === activeServer ? 'rgba(201,168,76,0.3)' : 'rgba(245,240,232,0.08)'}`,
                  color: idx === activeServer ? 'var(--gold)' : 'var(--muted-up)',
                }}
              >
                {srv.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Episode grid */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))' }}
      >
        {server.episodes.map((ep) => {
          const href = `/xem-phim/${slug}/${ep.slug}`;
          const hasEmbed = !!ep.embedUrl;

          return (
            <Link
              key={ep.slug}
              href={hasEmbed ? href : '#'}
              aria-label={`Tập ${ep.name}`}
              aria-disabled={!hasEmbed}
              className={`flex h-10 items-center justify-center rounded-lg text-[12.5px] font-semibold transition-all duration-200 ${!hasEmbed ? 'pointer-events-none' : ''}`}
              style={{
                background: hasEmbed ? 'rgba(201,168,76,0.07)' : 'rgba(245,240,232,0.02)',
                border: `1px solid ${hasEmbed ? 'rgba(201,168,76,0.14)' : 'rgba(245,240,232,0.05)'}`,
                color: hasEmbed ? 'rgba(245,240,232,0.82)' : 'var(--muted-deep)',
              }}
            >
              {ep.name}
            </Link>
          );
        })}
      </div>

      {/* Total count */}
      <p className="mt-3 text-[11px]" style={{ color: 'var(--muted-deep)' }}>
        {server.episodes.length} tập · {server.name}
      </p>
    </div>
  );
}
