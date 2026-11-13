import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * HomeSection — layout dạng ChợPhim:
 * title lớn bên trái + "Xem toàn bộ" dưới title,
 * content (cards/carousel) chiếm phần còn lại bên phải.
 */
export function HomeSection({
  title,
  href,
  children,
  noPad = false,
}: {
  title: string;
  href?: string;
  children: ReactNode;
  noPad?: boolean;
}) {
  return (
    <section className={noPad ? '' : 'py-6 sm:py-8'}>
      <div className="container-shell">
        {/* Mobile: title + link cùng hàng */}
        <div className="mb-4 flex items-end justify-between lg:hidden">
          <h2
            className="text-[22px] font-black leading-tight tracking-tight text-white"
          >
            {title}
          </h2>
          {href && (
            <Link
              href={href}
              className="flex shrink-0 items-center gap-0.5 text-[12px] font-semibold transition-colors hover:text-gold"
              style={{ color: 'rgba(245,240,232,0.38)' }}
            >
              Xem toàn bộ <ChevronRight size={12} />
            </Link>
          )}
        </div>

        {/* Desktop: title trái + content phải */}
        <div className="hidden lg:flex lg:gap-10">
          {/* Left — cố định width */}
          <div className="flex w-[160px] shrink-0 flex-col pt-1">
            <h2
              className="text-[32px] font-black leading-[1.12] tracking-tight text-white"
            >
              {title}
            </h2>
            {href && (
              <Link
                href={href}
                className="mt-3 flex items-center gap-0.5 text-[13px] font-semibold transition-colors hover:text-gold"
                style={{ color: 'rgba(245,240,232,0.38)' }}
              >
                Xem toàn bộ <ChevronRight size={13} />
              </Link>
            )}
          </div>

          {/* Right — chiếm hết không gian còn lại */}
          <div className="min-w-0 flex-1">{children}</div>
        </div>

        {/* Mobile content */}
        <div className="lg:hidden">{children}</div>
      </div>
    </section>
  );
}
