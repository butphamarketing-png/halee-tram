export const config = {
  matcher: [
    "/((?!api/|assets/|favicon\\.svg|favicon\\.ico|.*\\.(?:js|css|png|jpg|jpeg|webp|svg|woff2?|ico|map|txt|xml|html)).*)",
  ],
};

/** Real search/social crawlers only — do NOT match internal SSR user-agents (e.g. THK-SSR). */
const BOT_UA =
  /(?:googlebot|bingbot|yandex|baiduspider|duckduckbot|applebot|slurp|ia_archiver|facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|pinterest|mediapartners|adsbot-google|google-inspectiontool|bytespider|petalbot|semrushbot|ahrefsbot|dotbot|rogerbot|embedly|quora link preview|showyoubot|outbrain|vkshare)/i;

const INTERNAL_UA = /THK-SSR|THK-Internal/i;

export default async function middleware(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";

  // Never intercept our own SSR fetch (prevents infinite loop / 500).
  if (request.headers.get("x-thk-internal") === "1" || INTERNAL_UA.test(userAgent)) {
    return;
  }

  if (!BOT_UA.test(userAgent)) return;

  const url = new URL(request.url);
  if (url.pathname.startsWith("/adminbp")) return;

  const target = new URL("/api/bot-render", url.origin);
  target.searchParams.set("path", url.pathname + url.search);

  try {
    const rendered = await fetch(target.toString(), {
      headers: {
        "User-Agent": userAgent,
        "X-THK-Internal": "1",
      },
    });

    // Fail-open: if SSR fails, serve the SPA so Google gets 200 + client meta — never 500.
    if (!rendered.ok) return;

    return new Response(rendered.body, {
      status: 200,
      headers: {
        "Content-Type": rendered.headers.get("Content-Type") || "text/html; charset=utf-8",
        "Cache-Control": rendered.headers.get("Cache-Control") || "public, s-maxage=300, stale-while-revalidate=3600",
        Vary: "User-Agent",
        "X-THK-Bot-Render": "1",
      },
    });
  } catch {
    return;
  }
}
