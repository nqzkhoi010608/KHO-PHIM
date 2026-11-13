import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ Kho Phim — quyền, nghĩa vụ và giới hạn trách nhiệm.',
};

const UPDATED = '11 tháng 11, 2026';

const sections = [
  {
    id: 'chap-thuan',
    title: '1. Chấp thuận điều khoản',
    content: [
      'Bằng cách truy cập hoặc sử dụng Kho Phim ("Dịch vụ", "nền tảng", "chúng tôi"), bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản sử dụng này cũng như Chính sách bảo mật của chúng tôi.',
      'Nếu bạn chưa đủ 13 tuổi, bạn không được phép sử dụng dịch vụ. Nếu bạn từ 13 đến dưới 18 tuổi, bạn cần có sự đồng ý của cha mẹ hoặc người giám hộ hợp pháp.',
      'Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi có hiệu lực nghĩa là bạn chấp nhận điều khoản mới.',
    ],
  },
  {
    id: 'mo-ta-dich-vu',
    title: '2. Mô tả dịch vụ',
    content: [
      'Kho Phim là nền tảng xem phim trực tuyến cung cấp:',
      '— Truy cập kho nội dung phim, phim bộ, hoạt hình với chất lượng cao.',
      '— Tính năng lưu tiến độ xem và danh sách yêu thích (yêu cầu tài khoản đăng nhập).',
      '— Thông tin chi tiết về phim bao gồm mô tả, diễn viên, đạo diễn.',
      '',
      'Chúng tôi không đảm bảo dịch vụ luôn sẵn sàng 100% và có quyền tạm ngừng để bảo trì. Danh sách phim có thể thay đổi theo giấy phép phân phối.',
    ],
  },
  {
    id: 'tai-khoan',
    title: '3. Tài khoản người dùng',
    content: [
      '**Đăng ký và xác thực:**',
      'Bạn có thể đăng ký tài khoản qua Google OAuth. Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và toàn bộ hoạt động xảy ra dưới tài khoản của mình.',
      '',
      '**Trách nhiệm của bạn:**',
      '— Cung cấp thông tin chính xác khi tạo tài khoản.',
      '— Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép.',
      '— Không chia sẻ tài khoản với người khác.',
      '',
      '**Chấm dứt tài khoản:**',
      'Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản của bạn không cần báo trước nếu bạn vi phạm các điều khoản này.',
    ],
  },
  {
    id: 'quyen-so-huu-tri-tue',
    title: '4. Quyền sở hữu trí tuệ',
    content: [
      '**Nội dung của chúng tôi:**',
      'Giao diện, thiết kế, logo, tên thương hiệu "Kho Phim" và phần mềm nền tảng là tài sản của chúng tôi, được bảo hộ theo pháp luật sở hữu trí tuệ Việt Nam.',
      '',
      '**Nội dung phim:**',
      'Nội dung phim được hiển thị trên nền tảng thuộc quyền sở hữu của các nhà sản xuất và đơn vị phân phối tương ứng. Chúng tôi chỉ cung cấp dịch vụ truy cập theo giấy phép hợp pháp.',
      '',
      '**Hạn chế sử dụng:**',
      '— Nghiêm cấm tải xuống, sao chép, phân phối lại nội dung phim dưới bất kỳ hình thức nào.',
      '— Nghiêm cấm sử dụng công nghệ tự động (bot, scraper) để thu thập dữ liệu từ nền tảng.',
      '— Nghiêm cấm can thiệp vào hệ thống bảo vệ bản quyền kỹ thuật số.',
    ],
  },
  {
    id: 'hanh-vi-cam',
    title: '5. Hành vi bị nghiêm cấm',
    content: [
      'Khi sử dụng Kho Phim, bạn không được:',
      '— Vi phạm pháp luật hiện hành hoặc quyền của bên thứ ba.',
      '— Đăng tải, truyền tải nội dung bất hợp pháp, có hại, xúc phạm, phân biệt đối xử.',
      '— Thực hiện các hành vi xâm phạm quyền riêng tư của người khác.',
      '— Cố gắng truy cập trái phép vào hệ thống, máy chủ hoặc dữ liệu của chúng tôi.',
      '— Thực hiện tấn công DDoS hoặc bất kỳ hành động nào làm gián đoạn dịch vụ.',
      '— Giả mạo danh tính hoặc tạo tài khoản nhằm mục đích gian lận.',
      '— Sử dụng VPN hoặc proxy để vượt qua giới hạn địa lý nếu có áp dụng.',
    ],
  },
  {
    id: 'gioi-han-trach-nhiem',
    title: '6. Giới hạn trách nhiệm',
    content: [
      'Dịch vụ được cung cấp trên cơ sở "nguyên trạng" (as-is) và "sẵn có" (as-available). Trong phạm vi tối đa được pháp luật cho phép:',
      '— Chúng tôi không đảm bảo dịch vụ hoạt động liên tục không gián đoạn hoặc không có lỗi.',
      '— Chúng tôi không chịu trách nhiệm về thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.',
      '— Trách nhiệm tổng hợp của chúng tôi, dù dựa trên hợp đồng hay ngoài hợp đồng, không vượt quá số tiền bạn đã trả cho dịch vụ trong 12 tháng gần nhất.',
      '',
      'Các hạn chế trên không áp dụng đối với thiệt hại gây ra do gian lận hoặc sơ suất nghiêm trọng của chúng tôi.',
    ],
  },
  {
    id: 'boi-thuong',
    title: '7. Bồi thường',
    content: [
      'Bạn đồng ý bồi thường và bảo vệ Kho Phim, các cán bộ, giám đốc, nhân viên và đại lý của chúng tôi khỏi mọi khiếu nại, thiệt hại, nghĩa vụ, tổn thất, trách nhiệm pháp lý, chi phí hoặc khoản nợ phát sinh từ:',
      '— Việc bạn sử dụng và truy cập Dịch vụ.',
      '— Vi phạm bất kỳ điều khoản nào trong Điều khoản sử dụng này.',
      '— Vi phạm bất kỳ quyền của bên thứ ba, bao gồm nhưng không giới hạn ở quyền riêng tư hoặc quyền sở hữu trí tuệ.',
    ],
  },
  {
    id: 'luat-ap-dung',
    title: '8. Luật áp dụng và giải quyết tranh chấp',
    content: [
      'Các Điều khoản này được điều chỉnh và giải thích theo pháp luật của Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
      'Mọi tranh chấp phát sinh liên quan đến việc sử dụng Dịch vụ sẽ được giải quyết trước tiên thông qua thương lượng thiện chí trong vòng 30 ngày. Nếu không giải quyết được, tranh chấp sẽ được đưa ra Tòa án nhân dân có thẩm quyền tại Việt Nam.',
      'Nếu bất kỳ điều khoản nào bị tòa án tuyên vô hiệu, các điều khoản còn lại vẫn tiếp tục có hiệu lực đầy đủ.',
    ],
  },
  {
    id: 'cac-dieu-khoan-khac',
    title: '9. Các điều khoản khác',
    content: [
      '**Toàn bộ thỏa thuận:** Các điều khoản này cùng với Chính sách bảo mật cấu thành toàn bộ thỏa thuận giữa bạn và Kho Phim liên quan đến Dịch vụ.',
      '**Chuyển nhượng:** Bạn không được chuyển nhượng quyền và nghĩa vụ theo các điều khoản này mà không có sự đồng ý bằng văn bản của chúng tôi.',
      '**Từ bỏ:** Việc không thực thi bất kỳ quyền nào không cấu thành sự từ bỏ quyền đó.',
      '**Tiêu đề:** Tiêu đề các phần chỉ có mục đích tham khảo và không ảnh hưởng đến nghĩa của điều khoản.',
    ],
  },
  {
    id: 'lien-he',
    title: '10. Liên hệ',
    content: [
      'Nếu bạn có câu hỏi về Điều khoản sử dụng này, vui lòng liên hệ:',
      '— **Email:** legal@khophim.vn',
      '— **Thời gian phản hồi:** Trong vòng 72 giờ làm việc.',
      '— **Địa chỉ:** Việt Nam',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden pt-32 pb-12">
        <div
          className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,200,87,0.05), transparent 70%)', filter: 'blur(80px)' }}
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
                background: 'rgba(255,200,87,0.1)',
                border: '1px solid rgba(255,200,87,0.2)',
              }}
            >
              <FileText size={22} className="text-[#FFC857]" />
            </div>
            <div>
              <p className="eyebrow mb-2">Pháp lý & Điều khoản</p>
              <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                Điều khoản sử dụng
              </h1>
              <p className="mt-3 text-muted">Cập nhật lần cuối: {UPDATED}</p>
            </div>
          </div>

          {/* Key points */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: '✅', title: 'Miễn phí sử dụng', desc: 'Dịch vụ cơ bản hoàn toàn không mất phí' },
              { icon: '📋', title: 'Nội dung hợp pháp', desc: 'Toàn bộ nội dung được phân phối hợp pháp' },
              { icon: '🇻🇳', title: 'Pháp luật Việt Nam', desc: 'Tuân thủ đầy đủ quy định pháp luật hiện hành' },
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

          {/* Main */}
          <main className="space-y-10">
            {/* Legal notice */}
            <div
              className="flex items-start gap-3 p-5"
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,200,87,0.05)',
                border: '1px solid rgba(255,200,87,0.15)',
              }}
            >
              <FileText size={18} className="mt-0.5 shrink-0 text-[#FFC857]" />
              <p className="text-sm leading-6 text-paper/80">
                Các điều khoản này tạo thành hợp đồng pháp lý ràng buộc giữa bạn và Kho Phim. Vui lòng đọc kỹ trước khi sử dụng dịch vụ. Bằng cách đăng nhập hoặc sử dụng nền tảng, bạn đồng ý bị ràng buộc bởi các điều khoản này.
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

            <div className="border-t border-white/[0.06] pt-8 text-center">
              <p className="text-sm text-muted">
                Câu hỏi về điều khoản?{' '}
                <a href="mailto:legal@khophim.vn" className="text-signal hover:underline">
                  Liên hệ legal@khophim.vn
                </a>
              </p>
              <div className="mt-4 flex justify-center gap-6 text-xs text-muted/60">
                <Link href="/chinh-sach-bao-mat" className="hover:text-paper transition-colors">Chính sách bảo mật</Link>
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
