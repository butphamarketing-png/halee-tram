export type BookingEmailPayload = {
  name: string;
  phone: string;
  service: string;
  date: string;
  notes?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendBookingNotification(booking: BookingEmailPayload): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return;

  const to = (process.env.BOOKING_NOTIFY_EMAIL ?? user)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const siteName = process.env.SITE_NAME ?? "Halee Trâm";
  const submittedAt = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  const { default: nodemailer } = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? "465"),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });

  const rows = [
    ["Họ tên", booking.name],
    ["Điện thoại", booking.phone],
    ["Dịch vụ", booking.service],
    ["Ngày hẹn", booking.date],
    ["Ghi chú", booking.notes?.trim() || "—"],
    ["Thời gian gửi", submittedAt],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:120px">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  await transporter.sendMail({
    from: `"${siteName}" <${user}>`,
    to: to.join(", "),
    subject: `[${siteName}] Đặt lịch mới — ${booking.name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px">
        <h2 style="color:#7c3aed;margin:0 0 12px">Đơn đặt lịch mới</h2>
        <p style="color:#555;margin:0 0 16px">Khách vừa gửi form đặt lịch trên website <strong>${escapeHtml(siteName)}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">${htmlRows}</table>
        <p style="margin:20px 0 0;font-size:12px;color:#999">Email tự động từ website — vui lòng liên hệ khách sớm nhất.</p>
      </div>
    `,
  });
}
