/**
 * Middleware is intentionally a no-op for page SEO.
 * Crawlers get build-time prerendered HTML under dist/public/{path}/index.html.
 * Calling /api/bot-render was causing Googlebot 500s when serverless functions fail.
 */
export const config = {
  matcher: [],
};

export default function middleware() {
  return;
}
