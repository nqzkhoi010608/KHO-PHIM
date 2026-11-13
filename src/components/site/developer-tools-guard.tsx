'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

function looksLikeDesktopDevTools() {
  if (typeof window === 'undefined' || window.innerWidth < 768) return false;
  if (!window.matchMedia('(pointer: fine)').matches) return false;

  const widthGap = Math.abs(window.outerWidth - window.innerWidth);
  const heightGap = Math.abs(window.outerHeight - window.innerHeight);
  /* Browser chrome/OS title bars can already consume ~150px. Only block
     when the gap is large enough to look like a docked DevTools pane. */
  return widthGap > 280 || heightGap > 280;
}

export function DeveloperToolsGuard({ children }: { children: ReactNode }) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const block = () => setBlocked(true);
    const onResize = () => { if (looksLikeDesktopDevTools()) block(); };
    const onKeyDown = (event: KeyboardEvent) => {
      const isDevToolsShortcut = event.key === 'F12'
        || ((event.ctrlKey || event.metaKey) && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()));
      if (isDevToolsShortcut) block();
    };

    if (looksLikeDesktopDevTools()) block();
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    const detector = window.setInterval(onResize, 600);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      window.clearInterval(detector);
    };
  }, []);

  if (blocked) {
    return (
      <div
        className="flex aspect-video items-center justify-center rounded-xl border p-6 text-center"
        role="alert"
        style={{ background: 'rgba(5,5,10,0.98)', borderColor: 'rgba(201,168,76,0.2)' }}
      >
        <div className="max-w-sm">
          <p className="text-base font-bold text-white">Player đã tạm ẩn</p>
          <p className="mt-2 text-sm leading-6" style={{ color: 'var(--muted-up)' }}>
            Vui lòng tắt chế độ nhà phát triển rồi tải lại trang để tiếp tục xem phim.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
