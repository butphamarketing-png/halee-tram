type PageBlock = { title?: string; paragraphs: string[] };

function p(...paragraphs: string[]): PageBlock {
  return { paragraphs };
}

/** Nội dung chi tiết từng trang dịch vụ / khóa học */
export const SERVICE_PAGE_COPY: Record<string, { description: string; blocks: PageBlock[] }> = {
  "/lam-dep/nails": {
    description:
      "Làm móng gel, nail art và chăm sóc móng chuyên nghiệp tại Quận 7 — Halee Trâm Eyelash & Nail Academy.",
    blocks: [
      p(
        "Dịch vụ Nails tại Halee Trâm mang đến bộ móng bền màu, thiết kế tinh tế và quy trình vệ sinh chuẩn salon. Chúng tôi cập nhật xu hướng ombre, đá, vẽ gel và móng trong suốt tự nhiên phù hợp công sở lẫn dự tiệc.",
        "Trước khi sơn, móng được làm sạch, cắt da an toàn và dũa form theo dáng tay. Sơn gel nhập chính hãng, hấp thụ đèn LED giúp màu giữ 2–3 tuần.",
        "Đặt lịch: 0938 162 662 — 793/62 Trần Xuân Soạn, Quận 7.",
      ),
    ],
  },
  "/lam-dep/noi-mi": {
    description: "Nối mi classic, volume, hybrid — tự nhiên, bền đẹp, bảo hành chỉnh mi miễn phí.",
    blocks: [
      p(
        "Nối mi là dịch vụ được yêu thích nhất tại Halee Trâm. Chúng tôi phân tích form mắt, độ dài mi thật và phong cách makeup hàng ngày để chọn độ dày, độ cong phù hợp.",
        "Mi cao cấp mềm mại, keo không cay, kỹ thuật cách chân mi an toàn. Classic cho vẻ nhẹ nhàng; Volume cho mi dày sắc nét; Hybrid cân bằng cả hai.",
        "Thời gian làm khoảng 90–120 phút. Hướng dẫn chăm sóc mi tại nhà để giữ bền 3–4 tuần.",
      ),
    ],
  },
  "/lam-dep/uon-mi": {
    description: "Uốn mi lash lift giữ cong 6–8 tuần — không cần nối thêm sợi, vẻ tự nhiên.",
    blocks: [
      p(
        "Uốn mi phù hợp ai có mi thật dài hoặc vừa, muốn mắt to và sáng mà không thích cảm giác nối mi. Quy trình êm, kết quả ngay sau buổi làm.",
        "Có thể kết hợp nhuộm đen mi để đôi mắt rõ nét hơn. Tránh ướt mi và xông hơi 24 giờ đầu.",
      ),
    ],
  },
  "/lam-dep/dinh-hinh-chan-may": {
    description: "Tạo dáng, tô viền và định hình chân mày hài hòa với khuôn mặt.",
    blocks: [
      p(
        "Chân mày gọn gàng giúp khuôn mặt trẻ trung và cân đối hơn. Halee Trâm đo tỷ lệ vàng trước khi tạo dáng, đảm bảo hai bên đều và hợp tông da.",
        "Dịch vụ gồm wax/chỉ, tô viền, shading hoặc điêu khắc tùy mong muốn. Sản phẩm an toàn, không kích ứng da nhạy cảm.",
      ),
    ],
  },
  "/lam-dep/cha-got-chan": {
    description: "Chà gót, dưỡng ẩm và massage chân thư giãn — da chân mềm mịn.",
    blocks: [
      p(
        "Liệu trình chà gót chân loại bỏ da già, ngăn nứt nẻ và mang lại cảm giác thư thái sau ngày dài. Ngâm chân thảo dược, massage và ủ dưỡng chuyên sâu.",
        "Dụng cụ riêng biệt, tiệt trùng sau mỗi khách. Có thể kết hợp sơn móng chân trong cùng buổi.",
      ),
    ],
  },
  "/lam-dep/goi-dau": {
    description: "Gội đầu thư giãn, massage da đầu — tóc sạch, bồng bền.",
    blocks: [
      p(
        "Gội đầu tại Halee Trâm kết hợp massage da đầu giúp giảm căng thẳng, kích thích tuần hoàn. Phù hợp sau giờ làm việc hoặc trước sự kiện quan trọng.",
        "Dầu gội dưỡng tóc, xả mềm, sấy và tạo kiểu nhẹ nếu bạn cần.",
      ),
    ],
  },
  "/dao-tao/khoa-noi-mi-salon": {
    description: "Khóa nối mi salon — học thực chiến, lớp nhỏ, hỗ trợ ra nghề.",
    blocks: [
      p(
        "Khóa dành cho người mới và thợ muốn nâng tay nghề. Học classic, volume, vệ sinh salon, chọn keo – mi – dụng cụ, xử lý lỗi và chăm sóc khách.",
        "Thực hành trên model thật, cấp chứng nhận, tư vấn mở tiệm. Liên hệ 0938 162 662 để nhận lịch khai giảng.",
      ),
    ],
  },
  "/dao-tao/khoa-noi-mi-dinh-cu": {
    description: "Khóa nối mi định cư — kỹ năng chuẩn quốc tế, chứng chỉ và portfolio.",
    blocks: [
      p(
        "Chương trình nâng cao với tiêu chuẩn kỹ thuật khắt khe, phù hợp học viên hướng tới thị trường nước ngoài hoặc salon cao cấp.",
        "Bao gồm lý thuyết, thực hành intensive, chụp portfolio và mock test. Halee Trâm trực tiếp giảng dạy và feedback từng học viên.",
      ),
    ],
  },
  "/dao-tao/khoa-nail-chuyen-nghiep": {
    description: "Khóa nail từ cơ bản đến nâng cao — sơn gel, nail art, form móng.",
    blocks: [
      p(
        "Lộ trình linh hoạt: cơ bản (gel, shape, cuticle), trung cấp (ombre, đá, vẽ) và nâng cao (form, acrylic). Học đến khi tự tin nhận khách.",
        "Tư vấn mua dụng cụ đúng chuẩn, định giá dịch vụ và chụp ảnh portfolio.",
      ),
    ],
  },
  "/dao-tao/khoa-cham-soc-mong": {
    description: "Khóa chăm sóc móng — dưỡng, phục hồi móng yếu và kỹ thuật salon.",
    blocks: [
      p(
        "Tập trung kỹ năng chăm sóc móng sức khỏe: làm sạch, dũa, dưỡng cuticle, xử lý móng yếu – gãy. Phù hợp thợ nails muốn chuyên sâu chăm sóc.",
      ),
    ],
  },
  "/dao-tao/khoa-dinh-hinh-chan-may": {
    description: "Đào tạo định hình, phun và tô chân mày chuẩn tỷ lệ khuôn mặt.",
    blocks: [
      p(
        "Học đo tỷ lệ vàng, tạo dáng bằng wax/chỉ, kỹ thuật shading và an toàn vệ sinh. Thực hành trên model có giám sát.",
      ),
    ],
  },
  "/dao-tao/khoa-hoc-uon-mi": {
    description: "Khóa uốn mi lash lift — kỹ thuật an toàn, giữ nếp bền.",
    blocks: [
      p(
        "Học quy trình uốn mi chuẩn: chọn size pad, thời gian thuốc, nhuộm mi và chăm sóc sau uốn. Phù hợp mở thêm dịch vụ tại salon hoặc nâng tay nghề.",
      ),
    ],
  },
};
