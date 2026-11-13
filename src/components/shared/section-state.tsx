import { AlertTriangle, Inbox } from 'lucide-react';

export function EmptyState({
  title = 'Chưa có dữ liệu',
  description = 'Nội dung sẽ xuất hiện ở đây khi sẵn sàng.',
}: { title?: string; description?: string }) {
  return (
    <div
      className="grid min-h-56 place-items-center p-10 text-center"
      style={{ borderRadius: 'var(--r-xl)', border: '1px dashed rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.02)' }}
    >
      <div>
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center" style={{ borderRadius: 'var(--r-md)', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.14)' }}>
          <Inbox size={24} style={{ color: 'var(--muted-up)' }} />
        </div>
        <p className="text-[15px] font-bold tracking-tight text-white">{title}</p>
        <p className="mt-1.5 max-w-xs text-sm font-light leading-relaxed" style={{ color: 'var(--muted-up)' }}>{description}</p>
      </div>
    </div>
  );
}

export function ErrorState({
  title = 'Không tải được nội dung',
  description = 'Hệ thống sẽ thử lại khi nguồn dữ liệu sẵn sàng.',
}: { title?: string; description?: string }) {
  return (
    <div
      className="grid min-h-56 place-items-center p-10 text-center"
      style={{ borderRadius: 'var(--r-xl)', border: '1px solid rgba(192,57,43,0.18)', background: 'rgba(192,57,43,0.03)' }}
    >
      <div>
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center" style={{ borderRadius: 'var(--r-md)', background: 'rgba(192,57,43,0.07)', border: '1px solid rgba(192,57,43,0.14)' }}>
          <AlertTriangle size={24} style={{ color: 'var(--red-soft)' }} />
        </div>
        <p className="text-[15px] font-bold tracking-tight text-white">{title}</p>
        <p className="mt-1.5 max-w-xs text-sm font-light leading-relaxed" style={{ color: 'var(--muted-up)' }}>{description}</p>
      </div>
    </div>
  );
}
