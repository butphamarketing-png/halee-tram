import type { SiteArticle } from "@/types/site-content";

const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

const slide = publicAsset("slideshow.1.png");
const intro = publicAsset("gioithieu.1.png");

function article(
  id: string,
  slug: string,
  title: string,
  date: string,
  description: string,
  body: string,
  image = slide,
  category = "Kiến thức",
): SiteArticle {
  return {
    id,
    slug,
    category,
    image,
    title,
    date,
    description,
    body,
    published: true,
  };
}

export const DEFAULT_ARTICLES: SiteArticle[] = [
  article(
    "a1",
    "nang-mui-bao-lau-thi-dep-tu-nhien",
    "Nâng mũi bao lâu thì đẹp tự nhiên?",
    "20/05/2024",
    "Tìm hiểu thời gian hồi phục và các yếu tố giúp dáng mũi vào form chuẩn đẹp, tự nhiên nhất.",
    `Sau nâng mũi cấu trúc, mũi thường sưng nhẹ trong 5–7 ngày đầu. Khoảng 2–4 tuần, dáng mũi bắt đầu vào form; 3–6 tháng là giai đoạn mũi ổn định và trông tự nhiên nhất.

Yếu tố quyết định tốc độ hồi phục gồm: cơ địa từng người, kỹ thuật bác sĩ, chế độ chăm sóc sau mổ và tuân thủ tái khám. Tại Thiên Hoàng Kim, bác sĩ sẽ hướng dẫn chườm lạnh, vệ sinh vết mổ và thuốc theo đúng chỉ định.

Bạn nên tránh va chạm mũi, nằm sấp và vận động mạnh trong giai đoạn đầu. Nếu có đau bất thường hoặc sưng tăng đột ngột, hãy liên hệ phòng khám ngay để được kiểm tra.`,
    slide,
  ),
  article(
    "a2",
    "cat-mi-co-de-lai-seo-khong",
    "Cắt mí có để lại sẹo không?",
    "18/05/2024",
    "Giải đáp chi tiết về kỹ thuật cắt mí hiện đại và cách lưu ý để mí đẹp tự nhiên.",
    `Với kỹ thuật cắt mí treo cơ hoặc mí trong, vết mổ được đặt tại nếp mí tự nhiên nên rất khó nhận ra khi đã lành. Sau 7–10 ngày, vết thường mờ dần; sau 1–3 tháng hầu hết khách hàng hài lòng với đường mí mảnh, hài hòa.

Để hạn chế sẹo, cần chọn cơ sở có bác sĩ được cấp phép, dụng cụ vô trùng và chăm sóc vết đúng hướng dẫn: không bóc vảy, hạn chế makeup vùng mắt tuỳ giai đoạn, chống nắng kỹ.

Mỗi cấu trúc mắt cần phương án riêng — thăm khám trực tiếp giúp bác sĩ tư vấn nên cắt mí, nhấn mí hay xử lý mỡ thừa/mí ẩn phù hợp nhất.`,
    intro,
  ),
  article(
    "a3",
    "tiem-filler-giu-duoc-bao-lau",
    "Tiêm filler giữ được bao lâu?",
    "15/05/2024",
    "Filler duy trì được bao lâu còn phụ thuộc vào loại filler, vị trí tiêm và cách chăm sóc sau tiêm.",
    `Thời gian duy trì filler thường từ 6–18 tháng. Vùng chuyển động nhiều như môi có thể hấp thu nhanh hơn má hoặc cằm. Filler cao cấp, tiêm đúng tầng và liều phù hợp sẽ cho kết quả mềm, tự nhiên và bền hơn.

Sau tiêm: tránh massage vùng tiêm 24–48 giờ, hạn chế rượu bia, sauna nóng vài ngày đầu. Tái khám theo lịch để bác sĩ đánh giá và bổ sung nếu cần.

Quan trọng nhất là chọn filler chính hãng, có mã truy xuất và bác sĩ có chứng chỉ tiêm filler — an toàn luôn đặt lên hàng đầu tại Thiên Hoàng Kim.`,
    slide,
  ),
  article(
    "a4",
    "botox-la-gi-khi-nao-nen-tiem",
    "Botox là gì? Khi nào nên tiêm?",
    "12/05/2024",
    "Botox giúp giảm nếp nhăn động, thon gọn hàm — nhưng không phải ai cũng nên tiêm ngay.",
    `Botox (botulinum toxin type A) tạm thời giảm hoạt động cơ gây nhăn như trán, đuôi mắt, cẳm. Hiệu quả thường rõ sau 3–7 ngày, duy trì khoảng 4–6 tháng tuỳ cơ địa.

Nên tiêm khi nếp nhăn xuất hiện khi cười/nhíu mà bạn muốn làm mềm, hoặc khi bác sĩ khuyến nghị sau thăm khám. Không nên tự ý tiêm khi đang mang thai, cho con bú hoặc có bệnh lý thần kinh cơ — cần khai báo sức khỏe trung thực.

Liều lượng và điểm tiêm chuẩn y khoa giúp khuôn mặt vẫn tự nhiên, không “đơ” cứng.`,
    intro,
  ),
  article(
    "a5",
    "dieu-tri-mun-boc-hieu-qua",
    "Điều trị mụn bọc hiệu quả tại phòng khám",
    "08/05/2024",
    "Phác đồ điều trị mụn theo từng cấp độ — từ skincare đến công nghệ ánh sáng.",
    `Mụn bọc cần xử lý đúng giai đoạn: làm sạch sâu, kiểm soát viêm, hạn chế bít tắc lỗ chân lông. Tại phòng khám, bác sĩ da liễu có thể kết hợp peel nhẹ, laser/ánh sáng sinh học và thuốc theo đơn.

Tuyệt đối không nặn mụn tại nhà khi chưa vô trùng — dễ để lại sẹo lõm và thâm. Chế độ ăn ngủ, giảm stress và chống nắng hằng ngày hỗ trợ rất nhiều cho kết quả lâu dài.

Thời gian điều trị thường 2–4 tháng tuỳ mức độ; kiên trì và tái khám định kỳ là chìa khóa.`,
    slide,
    "Dịch vụ",
  ),
  article(
    "a6",
    "tre-hoa-da-hifu",
    "Trẻ hóa da bằng công nghệ HIFU",
    "02/05/2024",
    "HIFU kích thích collagen sâu — căng da, gọn đường viền mà không phẫu thuật.",
    `HIFU (High-Intensity Focused Ultrasound) tác động lớp sâu dưới da, kích hoạt tái tạo collagen. Khách hàng thường thấy da săn hơn sau 1–3 tháng khi collagen tái tạo dần.

Ưu điểm: không xâm lấn, thời gian nghỉ ngơi ngắn. Phù hợp người bắt đầu chảy xệ nhẹ đến trung bình. Cần thăm khám để loại trừ chống chỉ định (vùng có implant kim loại, một số bệnh da đang viêm).

Kết hợp skincare y khoa và chống nắng giúp duy trì kết quả HIFU lâu hơn.`,
    intro,
    "Công nghệ",
  ),
  article(
    "a7",
    "nang-mui-s-line-quy-trinh",
    "Nâng mũi cấu trúc S-line – Quy trình và lưu ý",
    "28/04/2024",
    "Từ thăm khám, chụp mô phỏng đến chăm sóc sau mổ — quy trình chuẩn tại Thiên Hoàng Kim.",
    `Bước 1: Thăm khám, chụp ảnh và tư vấn tỉ lệ mũi phù hợp khuôn mặt.
Bước 2: Xét nghiệm tiền phẫu theo chỉ định.
Bước 3: Phẫu thuật trong phòng vô trùng, gây mê an toàn.
Bước 4: Hướng dẫn chăm sóc, tái khám định kỳ.

Mục tiêu S-line: sống mũi thẳng mềm, đầu mũi căng tự nhiên, hài hòa với trán và cằm. Bạn cần tuân thủ thuốc, vệ sinh mũi và tránh thuốc lá để vết lành tốt.`,
    slide,
  ),
  article(
    "a8",
    "cham-soc-da-sau-phau-thuat",
    "Chăm sóc da sau phẫu thuật thẩm mỹ",
    "22/04/2024",
    "Giai đoạn vàng sau mổ quyết định kết quả lâu dài — đừng bỏ qua các bước này.",
    `Sau phẫu thuật: chườm lạnh/sạch vết theo hướng dẫn, uống thuốc đúng giờ, ngủ cao gối (với mũi), tránh tập nặng 2–4 tuần.

Chống nắng SPF50+ khi ra ngoài; tránh bể nắng trực tiếp vài tháng đầu. Không tự ý dùng mỹ phẩm chưa được bác sĩ duyệt.

Mọi dấu hiệu sốt, chảy máu bất thường hoặc đau tăng — gọi hotline phòng khám ngay.`,
    intro,
  ),
  article(
    "a9",
    "5-dau-hieu-nen-tham-kham-da-lieu",
    "5 dấu hiệu bạn nên thăm khám da liễu thẩm mỹ",
    "15/04/2024",
    "Mụn tái đi tái lại, nám tăng sắc tố, da nhạy cảm kéo dài… đừng tự ý trị tại nhà mãi.",
    `1. Mụn viêm nặng hoặc để lại sẹo thâm lặp lại.
2. Nám, tàn nhang, melasma lan rộng.
3. Da đỏ, ngứa kéo dài sau mỹ phẩm.
4. Lão hóa rõ: chảy xệ, nếp sâu, mất săn chắc.
5. Muốn điều chỉnh nếp nhăn/môi/thái dương nhưng chưa rõ phương án.

Thăm khám giúp phân biệt điều trị y khoa và thẩm mỹ, tránh lãng phí tiền vào sản phẩm không phù hợp.`,
    slide,
  ),
  article(
    "a10",
    "goi-dau-duong-sinh-loi-ich",
    "Gội đầu dưỡng sinh – Lợi ích cho sức khỏe",
    "08/04/2024",
    "Thư giãn, kích hoạt tuần hoàn da đầu — liệu trình spa bổ trợ sức khỏe toàn diện.",
    `Gội đầu dưỡng sinh kết hợp massage ấn huyệt giúp giảm căng thẳng, cải thiện tuần hoàn máu vùng đầu cổ. Nhiều khách hàng ngủ ngon hơn và cảm thấy da đầu thoáng, tóc bồng bềnh hơn sau liệu trình.

Phù hợp người làm việc văn phòng, stress cao. Nên thực hiện định kỳ 1–2 tuần/lần tuỳ nhu cầu.

Tại Thiên Hoàng Kim, liệu trình dùng tinh dầu và kỹ thuật chuẩn spa, vệ sinh khăn – nước riêng biệt.`,
    intro,
    "Spa",
  ),
];
