import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
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
    seo: { ...DEFAULT_ARTICLE_SEO },
  };
}

export const DEFAULT_ARTICLES: SiteArticle[] = [
  article(
    "a1",
    "noi-mi-classic-hay-volume",
    "Nối mi Classic hay Volume — chọn loại nào phù hợp?",
    "15/05/2026",
    "So sánh nối mi classic, volume và hybrid — giúp bạn chọn dáng mi hợp mắt và phong cách hàng ngày.",
    `Nối mi Classic (1:1) tạo vẻ tự nhiên, nhẹ nhàng — phù hợp đi làm, makeup nhẹ hoặc lần đầu nối mi. Mỗi sợi mi giả gắn vào một sợi mi thật, đôi mắt sắc nét mà không quá đậm.

Volume (2D–6D) tạo hiệu ứng dày, cong, rõ nét hơn — thích hợp dự tiệc, chụp hình hoặc ai thích mi đậm. Hybrid kết hợp cả hai: phía trong classic, ngoài volume — cân bằng tự nhiên và nổi bật.

Tại Halee Trâm, chuyên viên sẽ xem form mắt, độ dài mi thật và thói quen chăm sóc để tư vấn dáng mi bền, không nặng hốc mắt. Thời gian bảo hành chỉnh mi miễn phí trong 7 ngày đầu.`,
    intro,
    "Nối mi",
  ),
  article(
    "a2",
    "son-gel-bao-lau-va-cach-giu-mau",
    "Sơn gel bền bao lâu? Cách giữ móng đẹp lâu hơn",
    "12/05/2026",
    "Sơn gel tại salon có thể giữ 2–3 tuần — kèm mẹo chăm sóc móng tại nhà từ Halee Trâm.",
    `Sơn gel bền hơn sơn thường nhờ quy trình hấp thụ đèn UV/LED. Trung bình móng tay giữ màu 2–3 tuần, móng chân 3–4 tuần nếu chăm sóc đúng.

Để móng bền màu: tránh dùng móng cạy vật cứng, đeo găng khi rửa bát, dưỡng cuticle và kem dưỡng tay mỗi ngày. Khi thấy móng đầu bong nhẹ, nên về salon gỡ gel đúng cách — không bóc tay tại nhà để tránh yếu móng.

Halee Trâm dùng sơn gel nhập chính hãng, dũa – đệm – dụng cụ tiệt trùng riêng từng khách. Nail art, đá, ombre đều được tư vấn theo sở thích và công việc của bạn.`,
    slide,
    "Nails",
  ),
  article(
    "a3",
    "uon-mi-co-dau-khong",
    "Uốn mi có đau không? Ai nên uốn mi?",
    "08/05/2026",
    "Uốn mi lash lift giúp mi cong tự nhiên 6–8 tuần — nhẹ nhàng, không cần nối thêm sợi.",
    `Uốn mi (lash lift) dùng thuốc uốn chuyên dụng trên mi thật, giúp mi cong từ gốc, mắt to và sáng hơn. Quy trình êm, hầu hết khách chỉ cảm thấy hơi ấm nhẹ quanh mí mắt.

Phù hợp: mi thật dài/vừa, muốn vẻ tự nhiên, không thích nối mi hoặc đang nghỉ giữa các lần nối. Không nên uốn khi viêm mắt cấp, mới phẫu thuật mắt hoặc đang dùng thuốc nhỏ mắt theo đơn bác sĩ — hãy báo trước cho chuyên viên.

Sau uốn mi: 24 giờ đầu tránh nước, xông hơi; chải mi nhẹ buổi sáng; dùng serum dưỡng mi nếu được tư vấn. Halee Trâm kết hợp nhuộm đen mi cho hiệu ứng rõ hơn nếu bạn muốn.`,
    intro,
    "Uốn mi",
  ),
  article(
    "a4",
    "dinh-hinh-chan-may-chon-dang-nao",
    "Định hình chân mày — chọn dáng nào hợp khuôn mặt?",
    "05/05/2026",
    "Dáng chân mày ngang, cong hay sắc nét — bí quyết cân đối khuôn mặt từ chuyên viên Halee Trâm.",
    `Chân mày đóng vai trò quan trọng trong việc định hình khuôn mặt. Mặt tròn thường hợp dáng mày cong cao; mặt dài hợp mày ngang mềm; mặt vuông nên có đuôi mày hơi cong để mềm hơn.

Dịch vụ tại Halee Trâm gồm: tạo dáng bằng wax/chỉ, tô viền, phun shading nhẹ hoặc điêu khắc tùy nhu cầu. Trước khi làm, chuyên viên đo tỷ lệ vàng quanh mắt – sống mũi để đề xuất độ dày, màu phù hợp tông da.

Sau khi định hình: tránh xông hơi, bôi kem dưỡng không chứa dầu lên vùng mày 24 giờ; chải mày bằng spoolie mỗi sáng để giữ sợi gọn.`,
    slide,
    "Chân mày",
  ),
  article(
    "a5",
    "khoa-noi-mi-salon-co-gi",
    "Khóa nối mi salon tại Halee Trâm học những gì?",
    "28/04/2026",
    "Lộ trình khóa nối mi thực chiến — từ cơ bản đến ra nghề mở tiệm.",
    `Khóa Nối Mi Salon dành cho người mới bắt đầu và thợ muốn nâng tay nghề. Nội dung gồm: vệ sinh salon, phân loại mi, keo – remo – bảo quản dụng cụ, kỹ thuật classic/volume, xử lý lỗi thường gặp và chăm sóc khách sau nối.

Học viên thực hành trên model thật dưới sự hướng dẫn trực tiếp của Halee Trâm. Cuối khóa cấp chứng nhận hoàn thành, hỗ trợ tư vấn mở tiệm, chọn dụng cụ và định giá dịch vụ.

Lịch học linh hoạt, lớp ghép nhỏ để sát sao từng học viên. Liên hệ 0938 162 662 để nhận lịch khai giảng và học phí chi tiết.`,
    intro,
    "Đào tạo",
  ),
  article(
    "a6",
    "cham-soc-da-chan-tai-nha",
    "Chà gót chân định kỳ — vì sao nên làm mỗi tháng?",
    "22/04/2026",
    "Gót khô, nứt nẻ không chỉ mất thẩm mỹ mà còn dễ đau khi đi lại. Spa chân giúp phục hồi mềm mại.",
    `Da gót chân dày và khô do chịu trọng lực cả ngày. Chà gót chuyên nghiệp loại bỏ lớp già, dưỡng ẩm sâu và massage thư giãn — giúp chân mềm, hạn chế nứt.

Quy trình tại Halee Trâm: ngâm chân thảo dược, chà gót an toàn, ủ dưỡng, massage và sơn móng chân nếu bạn muốn. Dụng cụ riêng biệt, tiệt trùng sau mỗi lượt khách.

Nên duy trì 3–4 tuần/lần; kết hợp kem dưỡng gót tại nhà buổi tối. Phụ nữ mang giày cao gót hoặc đứng nhiều đặc biệt nên chăm sóc định kỳ.`,
    slide,
    "Spa chân",
  ),
  article(
    "a7",
    "goi-dau-thu-gian-quan-7",
    "Gội đầu thư giãn sau ngày dài — trải nghiệm tại Quận 7",
    "18/04/2026",
    "Gội đầu kết hợp massage da đầu giúp giảm căng thẳng, tóc bồng bền hơn.",
    `Sau giờ làm việc, một buổi gội đầu thư giãn là cách tuyệt vời để reset cơ thể. Halee Trâm dùng dầu gội dưỡng tóc, massage da đầu kích thích tuần hoàn và xả sạch tạp chất.

Dịch vụ phù hợp mọi giới tính, đặc biệt người hay căng thẳng, mất ngủ hoặc tóc khô xơ. Có thể kết hợp cùng làm nails hoặc nối mi trong cùng một lần ghé — tiết kiệm thời gian.

Đặt lịch trước qua hotline 0938 162 662 hoặc form trên website để được phục vụ đúng giờ, không phải chờ.`,
    intro,
    "Gội đầu",
  ),
  article(
    "a8",
    "khoa-nail-chuyen-nghiep-ra-nghe",
    "Khóa nail chuyên nghiệp — bao lâu thì ra nghề?",
    "10/04/2026",
    "Lộ trình học nail cơ bản đến nâng cao, thực hành đến khi tự tin nhận khách.",
    `Khóa Nail Chuyên Nghiệp tại Halee Trâm kéo dài theo gói: cơ bản (sơn gel, cắt da, shape móng), trung cấp (ombre, đá, vẽ gel) và nâng cao (form, acrylic, nail art thiết kế).

Thời gian ra nghề phụ thuộc tốc độ thực hành của từng học viên — trung bình 4–8 tuần có thể tự làm khách cơ bản. Lớp học sáng – chiều linh hoạt, bao gồm bộ dụng cụ hướng dẫn mua đúng chuẩn salon.

Học viên được hỗ trợ portfolio ảnh tay nghề và tư vấn kinh doanh tiệm nail nhỏ tại nhà hoặc mở salon.`,
    slide,
    "Đào tạo",
  ),
  article(
    "a9",
    "khoa-noi-mi-dinh-cu-hoc-gi",
    "Khóa nối mi định cư — chuẩn quốc tế học những gì?",
    "02/06/2026",
    "Khóa nối mi định cư tại Halee Trâm — kỹ thuật chuẩn salon quốc tế, portfolio và mock test.",
    `Khóa Nối Mi Định Cư dành cho học viên muốn làm việc tại thị trường nước ngoài hoặc salon cao cấp tại Việt Nam. Khác với khóa salon cơ bản, chương trình này đặt tiêu chuẩn kỹ thuật khắt khe hơn: tốc độ, độ đều fan mi, góc gắn, vệ sinh và giao tiếp khách quốc tế.

Nội dung gồm: classic nâng cao, volume 3D–6D, mega volume, xử lý mi yếu – lệch – quá ngắn, remo an toàn và chụp portfolio chuẩn Instagram. Học viên được mock test cuối khóa — mô phỏng ca khách thực tế có thời gian giới hạn.

Halee Trâm trực tiếp giảng dạy, feedback từng thao tác và hỗ trợ hoàn thiện hồ sơ tay nghề. Liên hệ 0938 162 662 để nhận syllabus và lịch khai giảng.`,
    intro,
    "Đào tạo",
  ),
  article(
    "a10",
    "khoa-cham-soc-mong-ai-nen-hoc",
    "Khóa chăm sóc móng — ai nên học và học được gì?",
    "28/05/2026",
    "Chuyên sâu dưỡng móng, cuticle và phục hồi móng yếu — bổ trợ hoàn hảo cho thợ nails.",
    `Khóa Chăm Sóc Móng tập trung vào sức khỏe móng thay vì trang trí. Phù hợp thợ nail muốn chuyên sâu chăm sóc, chủ spa muốn thêm dịch vụ dưỡng móng cao cấp, hoặc người mới muốn vào nghề từ bước an toàn nhất.

Học viên được hướng dẫn: phân loại tình trạng móng (yếu, gãy, dày da, nấm nghi ngờ), quy trình làm sạch – dũa – cắt da đúng chuẩn, dưỡng cuticle, massage tay và tư vấn sản phẩm chăm sóc tại nhà cho khách.

Thực hành trên model có giám sát. Kết thúc khóa, học viên tự tin tư vấn liệu trình dưỡng móng 4–6 tuần và kết hợp với sơn gel thông thường.`,
    slide,
    "Đào tạo",
  ),
  article(
    "a11",
    "khoa-dinh-hinh-chan-may-lo-trinh",
    "Khóa định hình chân mày — lộ trình thực hành tại Halee Trâm",
    "25/05/2026",
    "Từ đo tỷ lệ vàng đến wax, shading và phun nhẹ — học đến khi tự tin nhận khách.",
    `Khóa Định Hình Chân Mày bắt đầu bằng lý thuyết tỷ lệ khuôn mặt: điểm đầu – đỉnh – đuôi mày, độ dày phù hợp giới tính và tông da. Học viên thực hành vẽ trên giấy và trên model thật dưới sự hướng dẫn sát sao.

Kỹ thuật thực hành: wax/chỉ tạo dáng, tô viền bằng pomade, shading bằng bút chì/phun nhẹ, xử lý mày không đều – thưa – quá dày. An toàn vệ sinh và chống dị ứng cũng được nhấn mạnh xuyên suốt.

Lớp nhỏ, lịch linh hoạt sáng – chiều. Cuối khóa cấp chứng nhận và hỗ trợ chụp ảnh before/after cho portfolio.`,
    intro,
    "Đào tạo",
  ),
  article(
    "a12",
    "khoa-hoc-uon-mi-mo-dich-vu",
    "Khóa uốn mi — mở thêm dịch vụ salon chỉ trong vài ngày",
    "20/05/2026",
    "Học lash lift an toàn, chọn pad, thời gian thuốc và chăm sóc sau uốn — ROI nhanh cho tiệm.",
    `Uốn mi (lash lift) là dịch vụ hot vì thời gian làm nhanh (45–60 phút), giá vé hợp lý và khách quay lại đều 6–8 tuần/lần. Khóa Học Uốn Mi tại Halee Trâm giúp thợ nails, thợ mi hoặc chủ tiệm mới mở thêm dịch vụ mà không cần đầu tư lớn.

Nội dung: chọn size pad theo form mắt, quy trình 3 bước thuốc uốn – cố định – dưỡng, nhuộm mi kết hợp, xử lý lỗi mi không lên nếp và tư vấn chăm sóc sau uốn cho khách.

Thực hành trên model thật. Học xong có thể triển khai ngay tại tiệm — vốn ban đầu chỉ gồm bộ thuốc uốn, pad và dụng cụ cơ bản.`,
    slide,
    "Đào tạo",
  ),
  article(
    "a13",
    "xu-huong-nail-art-2026",
    "Xu hướng nail art 2026 — 5 style đang hot tại Halee Trâm",
    "18/05/2026",
    "Chrome, aura, french mới và móng trong suốt tự nhiên — cập nhật xu hướng làm móng năm nay.",
    `Năm 2026, xu hướng nails hướng tới vẻ đẹp tinh tế, không quá cầu kỳ. Tại Halee Trâm, 5 style được đặt nhiều nhất:

1. **Móng trong suốt (clean girl)** — base trong, viền french mỏng hoặc không trang trí, phù hợp công sở.
2. **Aura / gradient mềm** — chuyển màu pastel hoặc nude – hồng quanh cuticle, nhẹ nhàng nhưng nổi bật.
3. **Chrome nhẹ** — bụng móng bóng gương, đuôi móng đơn sắc — sang mà không lòe loẹt.
4. **French đen – nude** — biến tấu french cổ điển với đen matte hoặc đen bóng, rất hợp chụp hình.
5. **Đá nhỏ tinh tế** — 1–2 viên đá mỗi tay thay vì phủ kín, cân bằng tiệc tùng và hàng ngày.

Đặt lịch tư vấn design miễn phí qua hotline 0938 162 662 — chuyên viên sẽ gợi ý mẫu theo dáng tay và công việc của bạn.`,
    slide,
    "Nails",
  ),
  article(
    "a14",
    "cham-soc-mi-sau-noi",
    "5 điều cần nhớ sau khi nối mi — giữ mi bền 3–4 tuần",
    "16/05/2026",
    "Tránh nước, chải mi đúng cách và không bôi dầu — mẹo chăm sóc mi từ Halee Trâm.",
    `Mi nối đẹp nhất khi bạn chăm sóc đúng 48 giờ đầu và duy trì thói quen nhẹ nhàng sau đó:

**24–48 giờ đầu:** tránh nước, hơi nước, xông hơi, bơi lội và makeup dầu quanh mắt. Keo cần thời gian cố định hoàn toàn.

**Chải mi:** dùng spoolie sạch, chải nhẹ từ gốc ra đuôi mỗi sáng — không kéo mạnh.

**Tẩy trang:** dùng tẩy trang không dầu, lau nhẹ vùng mắt; tránh chà xát.

**Không bóc mi:** khi mi rụng tự nhiên, về salon remo đúng cách — bóc tay gây yếu mi thật.

**Bảo hành:** Halee Trâm chỉnh mi miễn phí trong 7 ngày đầu nếu mi bị lệch hoặc rụng bất thường do kỹ thuật.`,
    intro,
    "Nối mi",
  ),
  article(
    "a15",
    "chon-salon-noi-mi-quan-7",
    "Cách chọn salon nối mi uy tín tại Quận 7",
    "14/05/2026",
    "Tiêu chí vệ sinh, mi chính hãng, ảnh thật và bảo hành — checklist trước khi đặt lịch.",
    `Nối mi gần khu vực Quận 7 có nhiều lựa chọn — đây là checklist giúp bạn chọn đúng nơi:

**Vệ sinh:** dụng cụ tiệt trùng, đệm mắt dùng một lần, tay thợ sạch và không dùng chung keo hở.

**Mi & keo:** hỏi nguồn gốc mi, keo có mùi hắc không, có test dị ứng trước không.

**Ảnh thật:** ưu tiên salon có album khách thực tế, không chỉ ảnh stock.

**Tư vấn:** chuyên viên xem form mắt trước khi làm, không ép style quá đậm nếu không phù hợp.

**Bảo hành & remo:** rõ chính sách chỉnh mi và gỡ mi an toàn.

Halee Trâm tại 793/62 Trần Xuân Soạn đáp ứng đủ tiêu chí trên — đặt lịch 0938 162 662 hoặc form trên website.`,
    slide,
    "Nối mi",
  ),
  article(
    "a16",
    "combo-nail-noi-mi-tiet-kiem",
    "Combo nails + nối mi — tiết kiệm thời gian một buổi làm đẹp",
    "11/05/2026",
    "Ghép dịch vụ tay và mi trong cùng lần ghé — gợi ý lịch trình tại Halee Trâm Quận 7.",
    `Nhiều khách Halee Trâm thích làm nails và nối mi (hoặc uốn mi) trong cùng một buổi — tiết kiệm di chuyển và có ngay “full look” cho tuần mới.

**Gợi ý lịch trình 2–3 giờ:** bắt đầu nối mi trước (90–120 phút, nằm nghỉ), trong lúc chờ keo khô hoàn toàn làm nails tay (45–60 phút). Hoặc làm nails trước rồi nối mi — tùy lịch trống của salon.

**Combo phổ biến:** gel nude công sở + classic mi tự nhiên; nail art dự tiệc + volume mi; uốn mi + sơn gel chân.

Nhắn hotline 0938 162 662 khi đặt lịch để salon sắp xếp thợ và thời gian phù hợp — tránh chờ lâu vào cuối tuần.`,
    intro,
    "Kiến thức",
  ),
  article(
    "a17",
    "uon-mi-hay-noi-mi-nen-chon",
    "Uốn mi hay nối mi — nên chọn dịch vụ nào?",
    "09/05/2026",
    "So sánh chi phí, thời gian bảo trì và vẻ ngoài — giúp bạn quyết định nhanh.",
    `Đây là câu hỏi phổ biến nhất tại Halee Trâm:

**Uốn mi** dùng mi thật của bạn, cong từ gốc, giữ 6–8 tuần. Phù hợp mi thật dài/vừa, thích vẻ tự nhiên, ngân sách vừa phải, không muốn bảo trì thường xuyên.

**Nối mi** gắn sợi mi giả, tạo độ dài và độ dày tùy chọn (classic → volume). Phù hợp mi ngắn, muốn mắt to rõ rệt, thích makeup đậm hoặc chụp hình thường xuyên. Bảo trì 2–3 tuần/lần.

**Có thể xen kẽ:** nối mi liên tục → nghỉ vài tháng uốn mi để mi thật phục hồi. Chuyên viên Halee Trâm sẽ tư vấn miễn phí trước khi làm.`,
    intro,
    "Uốn mi",
  ),
  article(
    "a18",
    "mo-tiem-nail-can-chuan-bi-gi",
    "Mở tiệm nail nhỏ tại nhà — cần chuẩn bị gì?",
    "06/05/2026",
    "Dụng cụ, vốn, kỹ năng và marketing cơ bản — lộ trình từ học viên Halee Trâm.",
    `Sau khóa nail tại Halee Trâm, nhiều học viên bắt đầu tiệm nhỏ tại nhà trước khi mở salon. Checklist cơ bản:

**Kỹ năng:** hoàn thành ít nhất khóa cơ bản + 20–30 lần thực hành trên bạn bè/người thân.

**Dụng cụ tối thiểu:** đèn UV/LED, dũa – buffer, cắt da, sơn gel base/top/color, tiệt trùng, ghế và bàn làm việc sạch sẽ.

**Pháp lý & vệ sinh:** đăng ký kinh doanh hộ cá thể (nếu cần), quy trình tiệt trùng rõ ràng, khăn – dụng cụ riêng từng khách.

**Marketing:** chụp ảnh tay nghề, TikTok/Instagram 3–5 bài/tuần, nhờ khách review, đặt lịch qua Zalo/Facebook.

Halee Trâm hỗ trợ tư vấn mở tiệm miễn phí cho học viên tốt nghiệp — liên hệ sau khóa học.`,
    slide,
    "Đào tạo",
  ),
  article(
    "a19",
    "nail-ombre-huong-dan-mau",
    "Nail ombre — gợi ý phối màu nude, hồng và đen bóng",
    "03/05/2026",
    "Ombre gel là một trong những thiết kế được yêu thích nhất — dễ đẹp, hợp mọi dáng tay.",
    `Ombre (gradient) tạo chuyển màu mềm từ cuticle ra đuôi móng — vừa sang vừa che khuyết điểm móng ngắn.

**Combo hot tại Halee Trâm:**
- Nude → trắng sữa: công sở, dễ phối đồ
- Hồng baby → hồng đậm: nữ tính, trẻ trung
- Nude → đen: edgy, hợp chụp hình
- Cam đào → vàng nhạt: tông ấm, hợp da châu Á

Kỹ thuật ombre gel cần sponge hoặc cọ chuyên dụng và lớp base mỏng đều — không nên tự làm tại nhà nếu chưa quen. Thời gian làm 60–75 phút tùy số móng trang trí thêm.

Đặt lịch nails tại 793/62 Trần Xuân Soạn, Quận 7 — hotline 0938 162 662.`,
    slide,
    "Nails",
  ),
  article(
    "a20",
    "huong-dan-dat-lich-halee-tram",
    "Hướng dẫn đặt lịch online tại Halee Trâm",
    "01/05/2026",
    "3 cách đặt lịch nhanh — form website, hotline và nhắn tin — xác nhận trong 15 phút.",
    `Đặt lịch tại Halee Trâm rất đơn giản:

**1. Form trên website:** bấm nút “Đặt lịch ngay” trên trang chủ hoặc popup khi vào site — điền tên, SĐT, dịch vụ mong muốn và khung giờ. Salon liên hệ xác nhận trong ~15 phút.

**2. Hotline:** gọi **0938 162 662** — phù hợp khi cần tư vấn gấp hoặc đặt combo nhiều dịch vụ.

**3. Nhắn tin:** Facebook/TikTok Halee Trâm (nếu đã kết nối) — gửi ảnh mẫu nails/mi bạn thích để chuyên viên chuẩn bị trước.

**Lưu ý:** cuối tuần và giờ tan ca (17h–20h) thường đông — nên đặt trước 1–2 ngày. Địa chỉ: 793/62 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, TP.HCM.`,
    intro,
    "Kiến thức",
  ),
];
