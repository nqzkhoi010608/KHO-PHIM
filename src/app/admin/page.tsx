import Link from 'next/link';
import { ArrowUpRight, BarChart3, Clapperboard, Database, RefreshCw, Users } from 'lucide-react';

const stats = [
  { label: 'Tổng số phim',          value: '128',   note: '+12 tuần này',       icon: Clapperboard, accent: 'signal' },
  { label: 'Tập đã đồng bộ',        value: '1.046', note: '98,4% sẵn sàng',     icon: Database,     accent: 'teal'   },
  { label: 'Người dùng',            value: '2.845', note: '+8,2% tháng này',     icon: Users,        accent: 'gold'   },
  { label: 'Lần đồng bộ gần nhất',  value: '12 ph', note: 'Hoàn tất thành công', icon: RefreshCw,    accent: 'green'  },
];

const activity = [
  { text: 'Đồng bộ 12 phim từ VSMOV',           time: '1 giờ trước',  type: 'sync'  },
  { text: 'Editor cập nhật metadata Flow',        time: '2 giờ trước',  type: 'edit'  },
  { text: 'Admin tạo lời mời mới',               time: '3 giờ trước',  type: 'admin' },
  { text: 'Job kiểm tra nguồn phát hoàn tất',    time: '4 giờ trước',  type: 'job'   },
];

const systemStatus = [
  { label: 'Catalogue demo', value: 'Sẵn sàng',        state: 'ok'   },
  { label: 'Supabase',       value: 'Chưa cấu hình',   state: 'warn' },
  { label: 'VSMOV adapter',  value: 'Fallback demo',    state: 'warn' },
  { label: 'Playback gate',  value: 'Chưa cấu hình',   state: 'warn' },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl">

      {/* Page heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2">Thứ tư, 11 tháng 11, 2026</p>
          <h1
            className="text-3xl font-black tracking-[-0.03em] text-paper sm:text-4xl"
          >
            Tổng quan
          </h1>
        </div>
        <Link href="/admin/sync" className="btn btn-primary w-fit">
          <RefreshCw size={16} />
          Đồng bộ ngay
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon, accent }) => {
          const accentMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
            signal: { bg: 'rgba(232,56,44,0.09)',  border: 'rgba(232,56,44,0.18)',  text: 'var(--signal)', glow: 'rgba(232,56,44,0.07)' },
            teal:   { bg: 'rgba(0,201,177,0.07)',  border: 'rgba(0,201,177,0.15)',  text: 'var(--teal)',   glow: 'rgba(0,201,177,0.05)' },
            gold:   { bg: 'rgba(245,184,0,0.08)',  border: 'rgba(245,184,0,0.16)',  text: 'var(--gold)',   glow: 'rgba(245,184,0,0.05)' },
            green:  { bg: 'rgba(34,197,94,0.07)',  border: 'rgba(34,197,94,0.14)',  text: '#22c55e',       glow: 'rgba(34,197,94,0.04)' },
          };
          const a = accentMap[accent];
          return (
            <div
              key={label}
              className="admin-surface relative overflow-hidden p-5"
            >
              {/* BG accent glow */}
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full"
                style={{ background: a.glow, filter: 'blur(20px)' }}
              />
              {/* Icon */}
              <div
                className="relative mb-5 flex h-10 w-10 items-center justify-center"
                style={{ borderRadius: 'var(--r-sm)', background: a.bg, border: `1px solid ${a.border}` }}
              >
                <Icon size={18} style={{ color: a.text }} />
              </div>
              <p className="relative text-sm" style={{ color: 'var(--muted)' }}>{label}</p>
              <p className="relative mt-2.5 text-3xl font-black tracking-[-0.03em] text-paper">{value}</p>
              <p className="relative mt-1.5 text-xs" style={{ color: 'var(--muted-deep)' }}>{note}</p>
            </div>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">

        {/* Recent activity */}
        <section
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid var(--line)' }}
          >
            <div>
              <p className="font-semibold text-paper">Hoạt động gần đây</p>
              <p className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>Audit log được rút gọn</p>
            </div>
            <Link
              href="/admin/audit-logs"
              className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200 hover:text-paper"
              style={{ color: 'var(--signal)' }}
            >
              Xem log
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Activity list */}
          <div>
            {activity.map((item, index) => (
              <div
                key={item.text}
                className="flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-white/[0.025]"
                style={{ borderBottom: index < activity.length - 1 ? '1px solid var(--line-soft)' : 'none' }}
              >
                {/* Index badge */}
                <div
                  className="grid h-8 w-8 shrink-0 place-items-center text-xs font-black"
                  style={{
                    borderRadius: 'var(--r-sm)',
                    background: 'rgba(232,56,44,0.07)',
                    border: '1px solid rgba(232,56,44,0.14)',
                    color: 'var(--signal)',
                    fontFamily: 'var(--font-mono), monospace',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-paper">{item.text}</p>
                  <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-deep)' }}>
                    {item.time} · hệ thống
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System status */}
        <section
          className="p-6"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-lg)',
          }}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="grid h-7 w-7 place-items-center"
              style={{
                borderRadius: '8px',
                background: 'rgba(34,197,94,0.07)',
                border: '1px solid rgba(34,197,94,0.14)',
              }}
            >
              <BarChart3 size={14} style={{ color: '#22c55e' }} />
            </div>
            <p className="font-semibold text-paper">Trạng thái hệ thống</p>
          </div>

          <div className="space-y-3">
            {systemStatus.map(({ label, value, state }, index) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 py-3"
                style={{
                  borderBottom: index < systemStatus.length - 1 ? '1px solid var(--line-soft)' : 'none',
                }}
              >
                <span className="text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: state === 'ok' ? '#22c55e' : 'var(--signal)' }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: state === 'ok' ? '#22c55e' : 'var(--signal)' }}
                  />
                  {value}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/admin/settings"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 hover:text-paper"
            style={{ color: 'var(--signal)' }}
          >
            Cấu hình hệ thống
            <ArrowUpRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  );
}
