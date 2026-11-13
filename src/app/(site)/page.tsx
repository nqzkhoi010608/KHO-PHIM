import { HeroSlider }       from '@/components/site/hero-slider';
import { LoginBanner }       from '@/components/site/login-banner';
import { HomeSection }       from '@/components/site/home-section';
import { SectionCarousel }   from '@/components/site/section-carousel';
import { RankingSection }    from '@/components/site/ranking-section';
import { MovieCarousel }     from '@/components/site/movie-carousel';
import { Top10Carousel }     from '@/components/site/top10-carousel';
import { ComingSoonSection } from '@/components/site/coming-soon-card';
import { getHomeCatalog }    from '@/lib/catalog/repository';
import { createSupabaseServerClient } from '@/lib/supabase/server';

function SectionDivider() {
  return (
    <div className="container-shell">
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.1) 30%, rgba(201,168,76,0.1) 70%, transparent)' }}
      />
    </div>
  );
}

export default async function HomePage() {
  const catalog = await getHomeCatalog();
  let isSignedIn = false;
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    isSignedIn = Boolean(user);
  }

  const korean  = catalog.updated.filter((m) => m.country === 'Hàn Quốc');
  const chinese = catalog.updated.filter((m) => m.country === 'Trung Quốc');
  const western = catalog.updated.filter((m) => m.country === 'Âu Mỹ' || m.country === 'Mỹ');

  const secKorean  = korean.length  >= 2 ? korean  : catalog.updated.slice(0, 6);
  const secChinese = chinese.length >= 2 ? chinese : catalog.series.slice(0, 6);
  const secWestern = western.length >= 2 ? western : catalog.singles.slice(0, 6);

  return (
    <div>
      {/* ① Hero */}
      <HeroSlider movies={catalog.heroSlides} />

      {/* ② Login banner */}
      {!isSignedIn && <LoginBanner />}

      <SectionDivider />

      {/* ③ Phim Hàn Quốc mới */}
      <HomeSection title="Phim Hàn Quốc mới" href="/tim-kiem">
        <SectionCarousel movies={secKorean} />
      </HomeSection>

      <SectionDivider />

      {/* ④ Phim Trung Quốc mới */}
      <HomeSection title="Phim Trung Quốc mới" href="/tim-kiem">
        <SectionCarousel movies={secChinese} />
      </HomeSection>

      <SectionDivider />

      {/* ⑤ Phim Âu Mỹ mới */}
      <HomeSection title="Phim Âu Mỹ mới" href="/phim-le">
        <SectionCarousel movies={secWestern} />
      </HomeSection>

      <SectionDivider />

      {/* ⑥ Bảng xếp hạng 3 cột */}
      <RankingSection movies={catalog.trending} />

      <SectionDivider />

      {/* ⑦ Phim mới cập nhật */}
      <MovieCarousel
        title="Phim mới cập nhật"
        eyebrow="Mới nhất"
        movies={catalog.updated}
        href="/tim-kiem"
      />

      <SectionDivider />

      {/* ⑧ Top 10 phim bộ */}
      <Top10Carousel
        title="Top 10 phim bộ hôm nay"
        eyebrow="Top 10"
        movies={catalog.trending.slice(0, 10)}
        href="/tim-kiem"
      />

      <SectionDivider />

      {/* ⑨ Thế giới hoạt hình */}
      <HomeSection title="Thế giới hoạt hình" href="/hoat-hinh">
        <SectionCarousel movies={catalog.animation} />
      </HomeSection>

      <SectionDivider />

      {/* ⑩ Phim sắp chiếu */}
      <ComingSoonSection
        title="Phim sắp chiếu"
        eyebrow="Đặt lịch xem"
        movies={catalog.comingSoon}
      />
    </div>
  );
}
