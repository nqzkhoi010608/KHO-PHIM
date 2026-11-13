'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ListVideo } from 'lucide-react';
import type { NormalizedServer } from '@/lib/vsmov/normalizer';

export function VsmovWatchSidebar({
  servers,
  slug,
  currentEpisodeSlug,
}: {
  servers: NormalizedServer[];
  slug: string;
  currentEpisodeSlug: string;
}) {
  const [activeServer, setActiveServer] = useState(0);

  if (servers.length === 0) {
    return (
      <aside
        className="p-5"
        style={{
          borderRadius: 'var(--r-xl)',
          background: 'var(--panel)',
          border: '1px solid var(--line)',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--muted-up)' }}>
          Chưa có danh sách tập.
        </p>
      </aside>
    );
  }

  const server = servers[activeServer] ?? servers[0];

  return (
    <aside
      className="flex flex-col overflow-hidden"
      style={{
        borderRadius: 'var(--r-xl)',
        background: 'var(--panel)',
        border: '1px solid var(--line)',
        maxHeight: '600px',
      }}
    >
      {/* Header */}
      <div
        className="shrink-0 flex items-center gap-2 border-b px-4 py-3.5"
        style={{ borderColor: 'var(--line)' }}
      >
        <ListVideo size={16} style={{ color: 'var(--gold)' }} />
        <span className="text-sm font-bold text-white">Danh sách tập</span>
      </div>

      {/* Server switcher */}
      {servers.length > 1 && (
        <div
          className="shrink-0 flex flex-wrap gap-1.5 border-b px-4 py-2.5"
          style={{ borderColor: 'var(--line)' }}
        >
          {servers.map((srv, idx) => (
            <button
              key={idx}
              onClick={() => setActiveServer(idx)}
              className="text-[11px] font-bold transition-all duration-200"
              style={{
                padding: '2.5px 9px', borderRadius: '5px',
                background: idx === activeServer ? 'rgba(201,168,76,0.12)' : 'rgba(245,240,232,0.04)',
                border: `1px solid ${idx === activeServer ? 'rgba(201,168,76,0.28)' : 'rgba(245,240,232,0.07)'}`,
                color: idx === activeServer ? 'var(--gold)' : 'var(--muted-up)',
              }}
            >
              {srv.name}
            </button>
          ))}
        </div>
      )}

      {/* Episode list — scrollable */}
      <div className="nice-scroll flex-1 overflow-y-auto p-2">
        {server.episodes.length === 0 ? (
          <p className="p-4 text-sm" style={{ color: 'var(--muted-up)' }}>
            Server này chưa có tập.
          </p>
        ) : (
          server.episodes.map((ep) => {
            const isCurrent = ep.slug === currentEpisodeSlug;
            const href = `/xem-phim/${slug}/${ep.slug}`;
            const hasEmbed = !!ep.embedUrl;

            return (
              <Link
                key={ep.slug}
                href={hasEmbed ? href : '#'}
                aria-disabled={!hasEmbed}
                className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-all duration-150"
                style={{
                  background: isCurrent ? 'rgba(201,168,76,0.09)' : 'transparent',
                  color: isCurrent ? 'var(--gold)' : hasEmbed ? 'rgba(245,240,232,0.72)' : 'var(--muted-deep)',
                  borderLeft: isCurrent ? '3px solid rgba(201,168,76,0.5)' : '3px solid transparent',
                  pointerEvents: hasEmbed ? 'auto' : 'none',
                  cursor: hasEmbed ? 'pointer' : 'default',
                }}
              >
                <span>Tập {ep.name}</span>
                {isCurrent && (
                  <span
                    className="shrink-0 text-[9px] font-black uppercase tracking-wide"
                    style={{ color: 'var(--gold)', opacity: 0.7 }}
                  >
                    Đang xem
                  </span>
                )}
              </Link>
            );
          })
        )}
      </div>
    </aside>
  );
}
