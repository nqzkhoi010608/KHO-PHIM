import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { AdminPageHeading } from '@/components/admin/admin-page-heading';
import { getConfiguredVsmovMovies } from '@/lib/vsmov/repository';
export default async function AdminMovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = (await getConfiguredVsmovMovies()).find((item) => item.slug === id || String(item.id) === id);
  if (!movie) notFound();
  return <div className="mx-auto max-w-4xl"><Link href="/admin/movies" className="mb-7 inline-flex items-center gap-2 text-sm text-muted hover:text-paper"><ArrowLeft size={16} /> Danh sách phim</Link><AdminPageHeading eyebrow="Metadata" title={movie.name} description={`External ID: ${movie.id}`} action={<button className="btn btn-primary"><Save size={17} /> Lưu thay đổi</button>} /><div className="grid gap-5 border border-line bg-panel p-5 sm:grid-cols-2"><label className="field-label">Tên tiếng Việt<input className="field-input" defaultValue={movie.name} /></label><label className="field-label">Tên gốc<input className="field-input" defaultValue={movie.originName} /></label><label className="field-label">Slug<input className="field-input" defaultValue={movie.slug} /></label><label className="field-label">Năm phát hành<input className="field-input" defaultValue={movie.year} type="number" /></label><label className="field-label sm:col-span-2">Tóm tắt<textarea className="field-input min-h-32" defaultValue={movie.description} /></label></div></div>;
}
