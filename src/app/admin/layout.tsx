'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BarChart3, Clapperboard, FileClock, FolderKanban, LayoutDashboard, ListVideo, LogOut, Menu, Settings, ShieldCheck, Users, X } from 'lucide-react';
import '../globals.css';

const nav = [
  { label: 'Tổng quan', href: '/admin', icon: LayoutDashboard, group: 'Vận hành' },
  { label: 'Phim', href: '/admin/movies', icon: Clapperboard, group: 'Catalogue' },
  { label: 'Tập phim', href: '/admin/episodes', icon: ListVideo, group: 'Catalogue' },
  { label: 'Danh mục', href: '/admin/categories', icon: FolderKanban, group: 'Catalogue' },
  { label: 'Người dùng', href: '/admin/users', icon: Users, group: 'Quản trị' },
  { label: 'Đồng bộ', href: '/admin/sync', icon: BarChart3, group: 'Quản trị' },
  { label: 'Audit log', href: '/admin/audit-logs', icon: FileClock, group: 'Quản trị' },
  { label: 'Cấu hình', href: '/admin/settings', icon: Settings, group: 'Quản trị' },
  { label: 'Lời mời', href: '/admin/invitations', icon: ShieldCheck, group: 'Quản trị' },
];

function AdminNavigation({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const groups = Array.from(new Set(nav.map((item) => item.group)));
  return (
    <nav className="admin-navigation" aria-label="Điều hướng quản trị">
      {groups.map((group) => (
        <div key={group} className="admin-nav-group">
          <p>{group}</p>
          {nav.filter((item) => item.group === group).map(({ label, href, icon: Icon }) => {
            const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} onClick={onNavigate} className={active ? 'is-active' : ''}><Icon size={17} /><span>{label}</span>{active && <i aria-hidden="true" />}</Link>;
          })}
        </div>
      ))}
    </nav>
  );
}

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (pathname === '/admin/login') return <div className="admin-login-shell">{children}</div>;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span><ShieldCheck size={19} /></span>
          <div><strong>Kho Phim</strong><small>CONTROL ROOM</small></div>
        </div>
        <AdminNavigation pathname={pathname} />
        <Link href="/" className="admin-exit"><LogOut size={17} /> Về khu vực xem phim</Link>
      </aside>

      {drawerOpen && <button className="admin-drawer-backdrop" onClick={() => setDrawerOpen(false)} aria-label="Đóng menu quản trị" />}
      <aside className={`admin-mobile-drawer ${drawerOpen ? 'is-open' : ''}`} aria-label="Menu quản trị mobile">
        <div className="admin-brand"><span><ShieldCheck size={19} /></span><div><strong>Kho Phim</strong><small>CONTROL ROOM</small></div><button onClick={() => setDrawerOpen(false)} aria-label="Đóng menu"><X size={18} /></button></div>
        <AdminNavigation pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
        <Link href="/" className="admin-exit"><LogOut size={17} /> Về khu vực xem phim</Link>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-context"><button className="admin-menu-trigger" onClick={() => setDrawerOpen(true)} aria-label="Mở menu quản trị"><Menu size={19} /></button><div><span>Không gian quản trị</span><strong>Kho Phim / Control room</strong></div></div>
          <div className="admin-topbar-status"><span className="admin-live-dot" /> Demo data mode <b>Administrator</b></div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
