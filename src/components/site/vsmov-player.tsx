'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle, ChevronLeft, ChevronRight, RefreshCw,
} from 'lucide-react';
import type { NormalizedEpisode } from '@/lib/vsmov/normalizer';
import { isValidEmbedUrl } from '@/lib/vsmov/normalizer';

/*
  VideoPlayer component — dùng iframe embed từ VSMOV.
  Chỉ chấp nhận HTTPS URL từ *.streamvsmov.com.
  Không tự ghép URL, không bypass DRM.
*/

export function VsmovPlayer({
  episode,
  prevEpisode,
  nextEpisode,
  slug,
}: {
  episode: NormalizedEpisode | null;
  prevEpisode: NormalizedEpisode | null;
  nextEpisode: NormalizedEpisode | null;
  slug: string;
}) {
  const [reloadKey, setReloadKey] = useState(0);
  const [loading,   setLoading]   = useState(true);
  const [resumeSeconds, setResumeSeconds] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'checking' | 'guest' | 'synced' | 'saving'>('checking');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const progressRef = useRef({ seconds: 0, duration: 0 });
  const lastSavedRef = useRef(0);
  const authenticatedRef = useRef(false);

  useEffect(() => {
    progressRef.current = { seconds: 0, duration: 0 };
    lastSavedRef.current = 0;
    authenticatedRef.current = false;

    if (!episode || !episode.embedUrl || !isValidEmbedUrl(episode.embedUrl)) {
      return;
    }

    const embedOrigin = new URL(episode.embedUrl).origin;
    const saveProgress = (force = false) => {
      const { seconds, duration } = progressRef.current;
      if (!authenticatedRef.current || (!force && seconds - lastSavedRef.current < 15)) return;
      lastSavedRef.current = seconds;
      setSyncStatus('saving');
      void fetch('/api/watch-progress', {
        method: 'POST',
        keepalive: true,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          movieSlug: slug,
          episodeSlug: episode.slug,
          episodeName: episode.name,
          secondsWatched: Math.max(0, Math.floor(seconds)),
          durationSeconds: duration > 0 ? Math.floor(duration) : undefined,
        }),
      }).then((response) => {
        if (response.ok) setSyncStatus('synced');
      }).catch(() => undefined);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== embedOrigin || event.source !== iframeRef.current?.contentWindow) return;
      if (!event.data || typeof event.data !== 'object') return;
      const data = event.data as { type?: string; currentTime?: number; duration?: number };
      if (!['vsmov:progress', 'video:progress', 'progress'].includes(data.type ?? '')) return;
      if (typeof data.currentTime !== 'number' || !Number.isFinite(data.currentTime)) return;
      progressRef.current = {
        seconds: Math.max(0, data.currentTime),
        duration: typeof data.duration === 'number' && Number.isFinite(data.duration) ? Math.max(0, data.duration) : progressRef.current.duration,
      };
      saveProgress();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') saveProgress(true);
    };

    void fetch(`/api/watch-progress?movieSlug=${encodeURIComponent(slug)}&episodeSlug=${encodeURIComponent(episode.slug)}`)
      .then(async (response) => {
        if (response.status === 401 || response.status === 503) {
          setSyncStatus('guest');
          return;
        }
        if (!response.ok) return;
        authenticatedRef.current = true;
        const data = await response.json() as { progress?: { seconds_watched?: number } | null };
        const seconds = Math.max(0, Number(data.progress?.seconds_watched ?? 0));
        setResumeSeconds(seconds);
        progressRef.current.seconds = seconds;
        setSyncStatus('synced');
      })
      .catch(() => setSyncStatus('guest'));

    window.addEventListener('message', onMessage);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      saveProgress(true);
      window.removeEventListener('message', onMessage);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [episode, slug]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const orientation = screen.orientation as ScreenOrientation & {
        lock?: (orientation: 'landscape') => Promise<void>;
        unlock?: () => void;
      };
      if (document.fullscreenElement) {
        void orientation?.lock?.('landscape').catch(() => undefined);
      } else {
        orientation?.unlock?.();
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      screen.orientation?.unlock?.();
    };
  }, []);

  function handlePlayerLoad() {
    setLoading(false);
    if (resumeSeconds > 0) {
      iframeRef.current?.contentWindow?.postMessage({ type: 'vsmov:seek', seconds: resumeSeconds }, new URL(episode?.embedUrl ?? window.location.href).origin);
    }
    if (episode) {
      progressRef.current.seconds = resumeSeconds;
      if (authenticatedRef.current) {
        void fetch('/api/watch-progress', {
          method: 'POST',
          keepalive: true,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ movieSlug: slug, episodeSlug: episode.slug, episodeName: episode.name, secondsWatched: Math.floor(resumeSeconds) }),
        });
      }
    }
  }

  /* Trường hợp không có tập nào */
  if (!episode) {
    return <PlayerEmptyState message="Chưa có nguồn phát cho phim này." />;
  }

  /* Validate embed URL */
  const hasValidEmbed = !!episode.embedUrl && isValidEmbedUrl(episode.embedUrl);

  if (!hasValidEmbed) {
    return (
      <PlayerEmptyState
        message={`Không có link phát hợp lệ cho tập ${episode.name}.`}
        showReload={false}
      />
    );
  }

  return (
    <div>
      {/* Player wrapper — 16:9 responsive */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: '12px',
          aspectRatio: '16/9',
          background: 'rgba(5,5,10,0.9)',
          border: '1px solid rgba(201,168,76,0.1)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Loading skeleton */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div
                className="animate-spin"
                style={{ width: '40px', height: '40px' }}
              >
                <svg viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="rgba(201,168,76,0.12)" strokeWidth="3" />
                  <path d="M20 4 A16 16 0 0 1 36 20" stroke="url(#pg)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="pg" x1="20" y1="4" x2="36" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--gold-deep)" />
                      <stop offset="1" stopColor="var(--gold-pale)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="text-[12px] font-semibold" style={{ color: 'rgba(245,240,232,0.4)' }}>
                Đang tải player...
              </p>
            </div>
          </div>
        )}

        {/* iframe — sandbox cho phép scripts và same-origin để player hoạt động */}
        <iframe
          key={`${episode.slug}-${reloadKey}`}
          ref={iframeRef}
          src={episode.embedUrl}
          className="absolute inset-0 h-full w-full"
          title={`Player — tập ${episode.name}`}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="no-referrer"
          onLoad={handlePlayerLoad}
          style={{ border: 'none' }}
        />
      </div>

      <p className="mt-3 text-[11px]" style={{ color: syncStatus === 'guest' ? 'var(--muted)' : 'rgba(0,201,177,0.72)' }}>
        {syncStatus === 'checking' && 'Kiểm tra tiến trình xem...'}
        {syncStatus === 'guest' && 'Đăng nhập để đồng bộ tiến trình xem trên các thiết bị.'}
        {syncStatus === 'saving' && 'Đang lưu tiến trình xem...'}
        {syncStatus === 'synced' && (resumeSeconds > 0 ? `Đã đồng bộ — tiếp tục từ ${Math.floor(resumeSeconds / 60)} phút.` : 'Tiến trình xem đã được đồng bộ.')}
      </p>

      {/* Controls: prev / reload / next */}
      <div className="mt-3 flex items-center justify-between gap-3">
        {/* Prev */}
        {prevEpisode ? (
          <Link
            href={`/xem-phim/${slug}/${prevEpisode.slug}`}
            className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:text-gold"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            <ChevronLeft size={15} />
            Tập {prevEpisode.name}
          </Link>
        ) : <div />}

        {/* Reload */}
        <button
          onClick={() => { setLoading(true); setReloadKey((k) => k + 1); }}
          className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors hover:text-gold"
          style={{ color: 'rgba(245,240,232,0.3)' }}
          aria-label="Tải lại player"
        >
          <RefreshCw size={13} />
          Tải lại
        </button>

        {/* Next */}
        {nextEpisode ? (
          <Link
            href={`/xem-phim/${slug}/${nextEpisode.slug}`}
            className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:text-gold"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            Tập {nextEpisode.name}
            <ChevronRight size={15} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

/* Empty/Error state */
function PlayerEmptyState({
  message,
  showReload = true,
}: {
  message: string;
  showReload?: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      style={{
        borderRadius: '12px',
        aspectRatio: '16/9',
        background: 'rgba(5,5,10,0.9)',
        border: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div
        className="grid h-14 w-14 place-items-center"
        style={{ borderRadius: 'var(--r-lg)', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.14)' }}
      >
        <AlertTriangle size={24} style={{ color: 'var(--gold)' }} />
      </div>
      <div>
        <p className="text-[15px] font-semibold text-white">{message}</p>
        <p className="mt-1.5 text-sm font-light" style={{ color: 'var(--muted-up)' }}>
          Vui lòng thử lại hoặc chọn server khác.
        </p>
      </div>
    </div>
  );
}
