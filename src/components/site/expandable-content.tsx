'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const COLLAPSED_CLASS = 'line-clamp-4';

export function ExpandableContent({
  content,
  fallback = 'Nội dung đang được cập nhật.',
}: {
  content: string;
  fallback?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const value = content.trim() || fallback;
  const isLong = value.length > 360;

  return (
    <div>
      <p
        className={`max-w-3xl whitespace-pre-line text-[15px] leading-8 ${isLong && !expanded ? COLLAPSED_CLASS : ''}`}
        style={{ color: 'rgba(245,240,232,0.72)' }}
      >
        {value}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-white"
          style={{ color: 'var(--gold)' }}
          aria-expanded={expanded}
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
          <ChevronDown size={15} className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </button>
      )}
    </div>
  );
}
