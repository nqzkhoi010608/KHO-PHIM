import type { ReactNode } from 'react';

export function CatalogHeader({
  eyebrow, title, description, children,
}: {
  eyebrow?: string; title: string; description?: string; children?: ReactNode;
}) {
  return (
    <div className="catalog-header">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(201,168,76,0.05) 0%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="container-shell relative z-10 pb-10">
        {eyebrow && <p className="t-eyebrow-diamond mb-4">{eyebrow}</p>}

        <div className="flex items-end justify-between gap-6">
          <h1
            className="t-h1"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
          >
            {title}
          </h1>

          {/* Film strip ornament */}
          <div className="hidden shrink-0 items-end gap-1.5 pb-1 opacity-20 sm:flex">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '10px',
                  height: i % 2 === 0 ? '28px' : '16px',
                  borderRadius: '2px',
                  background: i % 3 === 0 ? 'var(--gold)' : i % 3 === 1 ? 'var(--gold-pale)' : 'rgba(201,168,76,0.3)',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {description && (
          <p className="mt-3 max-w-xl text-[15px] font-light leading-[1.8]" style={{ color: 'rgba(245,240,232,0.45)' }}>
            {description}
          </p>
        )}

        {children && <div className="mt-5">{children}</div>}
      </div>

      {/* Gold gradient separator */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,0.12) 20%, rgba(201,168,76,0.05) 50%, transparent 70%)' }}
      />
    </div>
  );
}
