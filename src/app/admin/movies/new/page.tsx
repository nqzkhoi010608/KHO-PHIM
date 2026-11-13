import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminPageHeading } from '@/components/admin/admin-page-heading';
export default function NewMoviePage() { return <div className="mx-auto max-w-4xl"><Link href="/admin/movies" className="mb-7 inline-flex items-center gap-2 text-sm text-muted hover:text-paper"><ArrowLeft size={16} /> Danh sách phim</Link><AdminPageHeading eyebrow="Catalogue" title="Thêm phim" description="Phim thật sẽ được upsert từ server action sau khi có nguồn dữ liệu hợp lệ." /><div className="border border-line bg-panel p-5 text-sm leading-7 text-muted">Form tạo phim sẽ chỉ ghi những trường được server validate. Role, audit actor, sync status và source secret không nằm trong payload client.</div></div>; }
