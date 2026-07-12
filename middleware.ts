export const config = {
  matcher: [
    "/((?!api/|assets/|favicon\\.svg|favicon\\.ico|.*\\.(?:js|css|png|jpg|jpeg|webp|svg|woff2?|ico|map|txt|xml)).*)",
  ],
};

const BOT_UA =
  /bot|crawler|spider|crawl|slurp|mediapartners|facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|embed|preview|pinterest|googlebot|bingbot|yandex|baiduspider|duckduckbot|applebot|ia_archiver/i;

export default async function middleware(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (!BOT_UA.test(userAgent)) return;

  const url = new URL(request.url);
  if (url.pathname.startsWith("/adminbp")) return;

  const target = new URL("/api/bot-render", url.origin);
  target.searchParams.set("path", url.pathname + url.search);

  return fetch(target.toString(), {
    headers: { "User-Agent": userAgent },
  });
}
