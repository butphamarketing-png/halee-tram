import type { ApiRequest, ApiResponse } from "./_lib/http";

/** Smoke test — no imports that can crash the serverless runtime. */
export default function handler(_req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({ ok: true, service: "halee-tram", ts: Date.now() });
}
