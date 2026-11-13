import { AdminPageHeading } from '@/components/admin/admin-page-heading';
import { AdminTable } from '@/components/admin/admin-table';
import { getConfiguredVsmovMovies } from '@/lib/vsmov/repository';

export default async function AdminEpisodesPage() {
  const movies = await getConfiguredVsmovMovies();
  const rows = movies.flatMap((movie) => movie.servers.flatMap((server) => server.episodes.slice(0, 2).map((episode) => [
    <span key={`${movie.slug}-${episode.slug}`} className="font-medium">{movie.name}</span>,
    episode.name,
    server.name,
    <span key={`${movie.slug}-${episode.slug}-state`} className="text-[#77d69a]">{episode.embedUrl ? 'Sẵn sàng' : 'Thiếu link phát'}</span>,
  ])));

  return <div className="mx-auto max-w-7xl"><AdminPageHeading eyebrow="Playback" title="Tập phim" description="Dữ liệu tập được đọc trực tiếp từ VSMOV, không dùng metadata cũ trong code." /><AdminTable columns={['Phim', 'Tập', 'Server', 'Trạng thái']} rows={rows} /></div>;
}
