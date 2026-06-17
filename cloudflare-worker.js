/* ============================================================
   Cloudflare Worker: TF2 inventory proxy (adds CORS + caching)
   ------------------------------------------------------------
   A static site can't call Steam directly (Steam sends no CORS
   headers). This little Worker sits in between: your page calls
   the Worker, the Worker calls Steam, and returns the data with
   CORS headers so the browser accepts it.

   HOW TO DEPLOY (free, ~3 min):
   1. Make a free account at https://dash.cloudflare.com
   2. Left sidebar -> "Workers & Pages" -> "Create" -> "Create Worker".
   3. Name it (e.g. tf2-backpack), click "Deploy".
   4. Click "Edit code", delete the sample, paste THIS whole file, "Deploy".
   5. Copy the Worker URL (looks like
      https://tf2-backpack.YOURNAME.workers.dev)
   6. Paste that URL into js/config.js as STEAM_WORKER_URL, then publish.

   Test it in a browser:
   https://tf2-backpack.YOURNAME.workers.dev/?steamid=76561198292026612
   ============================================================ */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=600" // cache 10 min
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const steamid = url.searchParams.get("steamid") || "";
    if (!/^\d{17}$/.test(steamid)) {
      return json({ error: "Provide ?steamid=<17-digit SteamID64>" }, 400);
    }

    const assets = [];
    const descById = {};
    let start = "";
    let pages = 0;

    try {
      do {
        const u =
          `https://steamcommunity.com/inventory/${steamid}/440/2?l=english&count=2000` +
          (start ? `&start_assetid=${start}` : "");
        const r = await fetch(u, {
          headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
          cf: { cacheTtl: 600, cacheEverything: true }
        });
        if (!r.ok) {
          if (pages === 0) return json({ error: "Steam returned " + r.status + " (inventory private or rate-limited)" }, 502);
          break;
        }
        const d = await r.json();
        (d.assets || []).forEach((a) => assets.push(a));
        (d.descriptions || []).forEach((x) => { descById[x.classid + "_" + x.instanceid] = x; });
        start = d.more_items ? d.last_assetid : "";
        pages++;
      } while (start && pages < 6);
    } catch (e) {
      return json({ error: "Fetch failed: " + String(e) }, 502);
    }

    return json({ assets: assets, descriptions: Object.values(descById) }, 200);
  }
};

function json(obj, status) {
  return new Response(JSON.stringify(obj), { status: status, headers: CORS });
}
