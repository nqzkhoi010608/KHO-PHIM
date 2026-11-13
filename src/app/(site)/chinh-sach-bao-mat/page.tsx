import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật',
  description: 'Chính sách bảo mật dữ liệu cá nhân của Kho Phim — cam kết bảo vệ quyền riêng tư người dùng.',
};

const UPDATED = '11 tháng 11, 2026';

const sections = [
  {
    id: 'gioi-thieu',
    title: '1. Giới thiệu',
    content: [
      'Kho Phim ("chúng tôi", "nền tảng") cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng dịch vụ tại khophim.vn.',
      'Bằng cách truy cập và sử dụng Kho Phim, bạn xác nhận đã đọc, hiểu và đồng ý với các điều khoản trong Chính sách bảo mật này. Nếu bạn không đồng ý, vui lòng ngừng sử dụng dịch vụ.',
    ],
  },
  {
    id: 'du-lieu-thu-thap',
    title: '2. Dữ liệu chúng tôi thu thập',
    content: [
      '**Dữ liệu bạn cung cấp trực tiếp:**',
      '— Địa chỉ email khi đăng ký tài khoản hoặc đăng nhập qua Google OAuth.',
      '— Tên hiển thị và ảnh đại diện (đồng bộ từ tài khoản Google nếu bạn chọn đăng nhập qua Google).',
      '',
      '**Dữ liệu được tạo tự động khi sử dụng dịch vụ:**',
      '— Tiến độ xem phim: tập phim đang xem, số giây đã xem — dùng để khôi phục vị trí xem.',
      '— Danh sách phim yêu thích bạn tự lưu.',
      '— Nhật ký truy cập kỹ thuật (IP hash đã mã hóa, loại thiết bị hash) — chỉ dùng cho bảo mật và phát hiện gian lận.',
      '',
      '**Dữ liệu chúng tôi KHÔNG thu thập:**',
      '— Chúng tôi không thu thập mật khẩu rõ văn bản (xác thực ủy quyền cho Google).',
      '— Chúng tôi không theo dõi hành vi duyệt web ngoài phạm vi nền tảng.',
      '— Chúng tôi không bán, cho thuê hoặc trao đổi dữ liệu cá nhân của bạn với bên thứ ba vì mục đích thương mại.',
    ],
  },
  {
    id: 'muc-dich-su-dung',
    title: '3. Mục đích sử dụng dữ liệu',
    content: [
      'Dữ liệu thu thập được sử dụng với các mục đích hợp pháp sau:',
      '— **Cung cấp dịch vụ cốt lõi:** Xác thực tài khoản, lưu tiến độ xem và danh sách yêu thích.',
      '— **Bảo mật hệ thống:** Phát hiện đăng nhập bất thường, bảo vệ tài khoản khỏi truy cập trái phép.',
      '— **Cải thiện dịch vụ:** Phân tích xu hướng sử dụng (dữ liệu tổng hợp, không định danh cá nhân).',
      '— **Liên lạc hỗ trợ:** Phản hồi yêu cầu hỗ trợ kỹ thuật khi bạn liên hệ trực tiếp.',
      '— **Tuân thủ pháp luật:** Đáp ứng các yêu cầu hợp pháp theo pháp luật Việt Nam hiện hành.',
    ],
  },
  {
    id: 'bao-mat-du-lieu',
    title: '4. Bảo mật dữ liệu',
    content: [
      'Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu của bạn:',
      '— **Mã hóa truyền tải:** Toàn bộ kết nối sử dụng TLS 1.3 — dữ liệu được mã hóa trong quá trình truyền.',
      '— **Mã hóa lưu trữ:** Dữ liệu nhạy cảm được mã hóa tại rest trên hạ tầng Supabase (PostgreSQL trên AWS).',
      '— **Row Level Security (RLS):** Mỗi người dùng chỉ có thể đọc và chỉnh sửa dữ liệu của chính mình — được thực thi tại tầng database, không thể vượt qua tầng ứng dụng.',
      '— **Mã hóa địa chỉ IP:** IP và device fingerprint được hash một chiều trước khi lưu — không thể khôi phục IP gốc.',
      '— **Phân quyền tối thiểu:** Mỗi thành phần hệ thống chỉ có quyền truy cập đúng và đủ dữ liệu cần thiết.',
      '— **Audit log:** Mọi hành động quản trị được ghi nhật ký với thời gian và danh tính người thực hiện.',
    ],
  },
  {
    id: 'chia-se-du-lieu',
    title: '5. Chia sẻ dữ liệu với bên thứ ba',
    content: [
      'Chúng tôi chỉ chia sẻ dữ liệu với bên thứ ba trong các trường hợp giới hạn:',
      '— **Supabase Inc.** (nhà cung cấp hạ tầng database và xác thực): Dữ liệu lưu trữ trên máy chủ Supabase theo Điều khoản dịch vụ và Chính sách bảo mật của Supabase. Supabase đã đạt chứng nhận SOC 2 Type II.',
      '— **Google LLC** (xác thực OAuth): Khi bạn đăng nhập bằng Google, Google cung cấp token xác thực. Chúng tôi không nhận mật khẩu Google của bạn.',
      '— **Yêu cầu pháp lý:** Chúng tôi có thể cung cấp dữ liệu khi có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền theo pháp luật Việt Nam.',
      'Ngoài các trường hợp trên, chúng tôi không chia sẻ dữ liệu cá nhân với bất kỳ bên thứ ba nào.',
    ],
  },
  {
    id: 'quyen-cua-ban',
    title: '6. Quyền của bạn',
    content: [
      'Bạn có các quyền sau đối với dữ liệu cá nhân:',
      '— **Quyền truy cập:** Yêu cầu bản sao dữ liệu chúng tôi lưu về bạn.',
      '— **Quyền chỉnh sửa:** Cập nhật tên hiển thị và thông tin hồ sơ trong phần cài đặt tài khoản.',
      '— **Quyền xóa:** Yêu cầu xóa toàn bộ dữ liệu cá nhân. Tài khoản và dữ liệu liên quan sẽ bị xóa vĩnh viễn trong vòng 30 ngày.',
      '— **Quyền rút đồng ý:** Ngừng sử dụng dịch vụ bất cứ lúc nào — dữ liệu không bị dùng vì mục đích khác.',
      '— **Quyền khiếu nại:** Nếu không hài lòng với cách xử lý dữ liệu, bạn có quyền khiếu nại lên cơ quan bảo vệ dữ liệu có thẩm quyền.',
      '',
      'Để thực hiện các quyền trên, liên hệ: **privacy@khophim.vn**',
    ],
  },
  {
    id: 'cookie',
    title: '7. Cookie và lưu trữ cục bộ',
    content: [
      'Kho Phim sử dụng cookie và localStorage với mục đích hạn chế:',
      '— **Cookie xác thực:** Session token của Supabase Auth, có thời hạn và ký mã hóa, cần thiết cho đăng nhập.',
      '— **localStorage:** Lưu trữ trạng thái giao diện (thông báo đã đọc, tùy chọn hiển thị) — không chứa dữ liệu nhạy cảm.',
      '— **Không có cookie theo dõi:** Chúng tôi không dùng cookie quảng cáo, pixel theo dõi hoặc bất kỳ công nghệ theo dõi bên thứ ba nào.',
    ],
  },
  {
    id: 'thoi-gian-luu-tru',
    title: '8. Thời gian lưu trữ dữ liệu',
    content: [
      '— Dữ liệu tài khoản: Lưu cho đến khi bạn yêu cầu xóa tài khoản.',
      '— Tiến độ xem và yêu thích: Lưu cùng thời gian với tài khoản.',
      '— Audit log: Lưu tối đa 12 tháng, sau đó tự động xóa.',
      '— Dữ liệu tổng hợp không định danh: Có thể lưu không giới hạn thời gian.',
    ],
  },
  {
    id: 'thay-doi',
    title: '9. Thay đổi chính sách',
    content: [
      'Chúng tôi có thể cập nhật Chính sách bảo mật định kỳ. Khi có thay đổi quan trọng, chúng tôi sẽ thông báo qua email hoặc banner trên trang web ít nhất 7 ngày trước khi có hiệu lực.',
      'Việc tiếp tục sử dụng dịch vụ sau ngày thay đổi có hiệu lực được coi là đồng ý với chính sách mới.',
    ],
  },
  {
    id: 'lien-he',
    title: '10. Liên hệ',
    content: [
      'Mọi câu hỏi, yêu cầu về quyền riêng tư, hoặc khiếu nại liên quan đến dữ liệu cá nhân, vui lòng liên hệ:',
      '— **Email:** privacy@khophim.vn',
      '— **Thời gian phản hồi:** Trong vòng 72 giờ làm việc.',
      '— **Địa chỉ:** Việt Nam',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div className="relative overflow-hidden pt-32 pb-12">
        <div
          className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,59,48,0.07), transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="container-shell relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper mb-8">
            <ArrowLeft size={16} /> Về trang chủ
          </Link>
          <div className="flex items-start gap-4">
            <div
              className="mt-1 hidden grid h-12 w-12 place-items-center sm:grid"
              style={{
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(255,59,48,0.15), rgba(255,59,48,0.05))',
                border: '1px solid rgba(255,59,48,0.2)',
              }}
            >
              <ShieldCheck size={22} className="text-signal" />
            </div>
            <div>
              <p className="eyebrow mb-2">Pháp lý & Quyền riêng tư</p>
              <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                Chính sách bảo mật
              </h1>
              <p className="mt-3 text-muted">Cập nhật lần cuối: {UPDATED}</p>
            </div>
          </div>

          {/* Summary cards */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: '🔒', title: 'Mã hóa đầu cuối', desc: 'TLS 1.3 + AES-256 tại rest' },
              { icon: '🚫', title: 'Không bán dữ liệu', desc: 'Dữ liệu không bao giờ được bán cho bên thứ ba' },
              { icon: '🛡️', title: 'Row Level Security', desc: 'Bạn chỉ truy cập được dữ liệu của chính mình' },
            ].map((card) => (
              <div
                key={card.title}
                className="flex items-start gap-3 p-4"
                style={{
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span className="text-xl">{card.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{card.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-shell pb-24">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div
              className="sticky top-28 p-4"
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-muted">Mục lục</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-lg px-2.5 py-1.5 text-xs text-muted/80 transition-colors hover:bg-white/[0.04] hover:text-paper"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="space-y-10">
            {/* Intro notice */}
            <div
              className="flex items-start gap-3 p-5"
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,59,48,0.05)',
                border: '1px solid rgba(255,59,48,0.15)',
              }}
            >
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-signal" />
              <p className="text-sm leading-6 text-paper/80">
                Kho Phim cam kết tuân thủ Luật An toàn thông tin mạng 2015 và Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân của Việt Nam. Chúng tôi chỉ thu thập dữ liệu tối thiểu cần thiết để vận hành dịch vụ.
              </p>
            </div>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="mb-4 text-xl font-bold tracking-tight text-white">{section.title}</h2>
                <div
                  className="p-5 sm:p-6"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="space-y-3">
                    {section.content.map((para, i) => {
                      if (!para) return <div key={i} className="h-2" />;
                      // Bold formatting for lines starting with **
                      const formatted = para.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/90">$1</strong>');
                      return (
                        <p
                          key={i}
                          className="text-sm leading-7 text-white/60"
                          dangerouslySetInnerHTML={{ __html: formatted }}
                        />
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}

            {/* Footer note */}
            <div className="border-t border-white/[0.06] pt-8 text-center">
              <p className="text-sm text-muted">
                Bạn có câu hỏi về quyền riêng tư?{' '}
                <a href="mailto:privacy@khophim.vn" className="text-signal hover:underline">
                  Liên hệ privacy@khophim.vn
                </a>
              </p>
              <div className="mt-4 flex justify-center gap-6 text-xs text-muted/60">
                <Link href="/dieu-khoan-su-dung" className="hover:text-paper transition-colors">Điều khoản sử dụng</Link>
                <span>·</span>
                <Link href="/" className="hover:text-paper transition-colors">Trang chủ</Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
