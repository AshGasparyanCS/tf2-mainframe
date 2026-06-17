/* ============================================================
   Supabase config for the comments section.
   Paste your two values below (from the Supabase setup steps).
   These are safe to commit — the "anon" key is meant to be public
   and is protected by Row Level Security rules on the database.
   ============================================================ */

const SUPABASE_URL = "https://sudcenvcweukhuywqsnl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1bveBRDZVHHjMXIX0HoBnA_BaUsDQh4";  // publishable key — safe to be public

/* ---- Live backpack (Cloudflare Worker) ----
   After you deploy the Worker (see cloudflare-worker.js + README), paste its
   URL below. Leave it "" to fall back to the curated BACKPACK list.
*/
const STEAM_WORKER_URL = "https://tf2-backpack.ashotg2.workers.dev";
const STEAM_ID = "76561198292026612";
