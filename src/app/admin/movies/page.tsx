import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { AdminPageHeading } from '@/components/admin/admin-page-heading';
import { AdminTable } from '@/components/admin/admin-table';
import { getConfiguredVsmovMovies } from '@/lib/vsmov/repository';

export default async function AdminMoviesPage() {
  const movies = await getConfiguredVsmovMovies();
  return <div className="mx-auto max-w-7xl"><AdminPageHeading eyebrow="Catalogue" title="Quản lý phim" description="Metadata được đọc trực tiếp từ VSMOV, không dùng dữ liệu phim hard-code." action={<Link href="/admin/movies/new" className="btn btn-primary"><Plus size={17} /> Thêm phim</Link>} /><div className="mb-5 flex max-w-xl items-center gap-2 border border-line bg-panel px-3 py-2.5"><Search size={17} className="text-muted" /><input placeholder="Tìm theo tên phim hoặc slug..." className="w-full bg-transparent text-sm text-paper outline-none placeholder:text-muted" aria-label="Tìm phim" /></div><AdminTable columns={['Phim', 'Loại', 'Năm', 'Trạng thái', 'Cập nhật']} rows={movies.map((movie) => [<Link className="font-medium hover:text-signal" href={`/admin/movies/${movie.slug}`} key={movie.slug}>{movie.name}</Link>, movie.isSeries ? 'Phim bộ' : 'Phim lẻ', movie.year, <span className={movie.status === 'ongoing' ? 'text-signal' : 'text-[#67d391]'} key={`${movie.slug}-status`}>{movie.status}</span>, <span className="text-muted" key={`${movie.slug}-updated`}>{movie.episodeCurrent || movie.quality}</span>])} /></div>;
}
