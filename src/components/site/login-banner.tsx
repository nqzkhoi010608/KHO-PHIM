import Link from 'next/link';
import { Heart, LogIn, Monitor, RotateCcw, List } from 'lucide-react';

export function LoginBanner() {
  const features = [
    { icon: RotateCcw, text: 'Lưu tiến trình xem' },
    { icon: Monitor,   text: 'Đồng bộ đa thiết bị' },
    { icon: Heart,     text: 'Thêm phim yêu thích' },
    { icon: List,      text: 'Tạo danh sách riêng' },
  ];

  return (
    <div className="container-shell py-5 sm:py-6">
      <div
        className="relative overflow-hidden px-6 py-5 sm:px-8 sm:py-6"
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(22,16,4,0.97) 0%, rgba(30,22,6,0.97) 60%, rgba(18,14,4,0.97) 100%)',
          border: '1px solid rgba(201,168,76,0.2)',
          boxShadow: '0 1px 0 rgba(201,168,76,0.08) inset, 0 8px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Ambient glows */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.09), transparent 70%)', filter: 'blur(50px)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%)', filter: 'blur(40px)' }}
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Left — CTA text */}
          <div className="max-w-[280px]">
            <p
              className="text-[17px] font-black leading-tight tracking-tight text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              Đăng nhập để lưu phim xem tiếp
            </p>
            <p
              className="mt-2 text-[13px] font-light leading-[1.7]"
              style={{ color: 'rgba(245,240,232,0.48)' }}
            >
              Lưu phim đang xem, đồng bộ trên nhiều thiết bị, tạo danh sách riêng — hoàn toàn miễn phí.
            </p>
            <Link
              href="/dang-nhap"
              className="btn btn-primary mt-4 w-fit gap-2 px-5 text-[13px]"
            >
              <LogIn size={14} />
              Đăng nhập
            </Link>
          </div>

          {/* Right — features grid 2x2 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-12">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div
                  className="grid h-7 w-7 shrink-0 place-items-center"
                  style={{
                    borderRadius: '7px',
                    background: 'rgba(201,168,76,0.09)',
                    border: '1px solid rgba(201,168,76,0.18)',
                  }}
                >
                  <Icon size={13} style={{ color: 'var(--gold)' }} />
                </div>
                <span
                  className="text-[12.5px] font-medium"
                  style={{ color: 'rgba(245,240,232,0.6)' }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
