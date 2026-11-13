import { AdminPageHeading } from '@/components/admin/admin-page-heading';
import { AdminTable } from '@/components/admin/admin-table';
import { genres, countries } from '@/lib/demo-data/movies';
export default function AdminCategoriesPage() { return <div className="mx-auto max-w-7xl"><AdminPageHeading eyebrow="Taxonomy" title="Danh mục" description="Thể loại và quốc gia dùng cho filter và SEO." /><div className="grid gap-6 lg:grid-cols-2"><AdminTable columns={['Thể loại', 'Số phim']} rows={genres.map((genre) => [genre, `${Math.max(2, genre.length % 8 + 1)} phim`])} /><AdminTable columns={['Quốc gia', 'Số phim']} rows={countries.map((country) => [country, `${Math.max(1, country.length % 5)} phim`])} /></div></div>; }
