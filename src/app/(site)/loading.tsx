export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5" style={{ background: 'var(--black)' }}>
      {/* Gold spinner ring */}
      <div className="relative">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="animate-spin" style={{ animationDuration: '1.4s', animationTimingFunction: 'linear' }}>
          <circle cx="28" cy="28" r="24" stroke="rgba(201,168,76,0.1)" strokeWidth="2.5" />
          <path d="M28 4 A24 24 0 0 1 52 28" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="lg" x1="28" y1="4" x2="52" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--gold-deep)" />
              <stop offset="1" stopColor="var(--gold-pale)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center diamond */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'rotate(45deg)' }}
        >
          <div
            style={{
              width: '8px', height: '8px', borderRadius: '1.5px',
              background: 'var(--gold)',
              boxShadow: '0 0 12px rgba(201,168,76,0.6)',
              animation: 'blink 1.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Loading bar */}
      <div className="relative h-[2px] w-28 overflow-hidden rounded-full" style={{ background: 'rgba(201,168,76,0.08)' }}>
        <div
          className="absolute inset-y-0 left-0 w-1/2 rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--gold-deep), var(--gold-pale))',
            animation: 'loadSlide 1.4s ease-in-out infinite',
          }}
        />
      </div>

      <p className="t-over">Đang mở phòng chiếu</p>
    </div>
  );
}
