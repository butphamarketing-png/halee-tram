import type { ApiRequest, ApiResponse } from "./_lib/http";
import { fetchCmsPayload } from "../server/lib/cms-payload-server";
import { buildLlmsTxt, getLlmsTxtBaseUrl } from "../server/lib/llms-txt-server";

export default async function handler(_req: ApiRequest, res: ApiResponse) {
  try {
    const payload = await fetchCmsPayload();
    const enabled = payload?.settings?.seo?.llmsTxtEnabled !== false;
    if (!enabled) {
      res.status(404).send("Not found");
      return;
    }

    const baseUrl = getLlmsTxtBaseUrl(payload);
    const text = buildLlmsTxt(payload, baseUrl);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).send(String(err));
  }
}
