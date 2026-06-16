/* ============================================================
   YOUR CONTENT LIVES HERE
   Add loadouts and blog posts by adding entries to these arrays.
   No build step — just save and refresh the page.
   ============================================================ */

/* ---------- LOADOUTS ----------
   class: one of  Scout, Soldier, Pyro, Demoman, Heavy,
                  Engineer, Medic, Sniper, Spy
   featured: true  -> shows on the home page
   items: list of cosmetics / weapons in the set
   image: optional path to a screenshot, e.g. "assets/my-scout.png"
          leave as "" and a class-colored placeholder is shown
*/
const LOADOUTS = [
  {
    id: "summer-scout",
    name: "Summer Scout",
    class: "Scout",
    featured: true,
    image: "",
    blurb: "Fast, loud, and dressed like he's late for a beach party.",
    items: ["Bonk Boy", "Flipped Trilby", "Summer Shades", "Force-A-Nature", "Bonk! Atomic Punch"],
    notes: "My go-to for casual. The Force-A-Nature double jump is too much fun to give up."
  },
  {
    id: "war-painter-soldier",
    name: "The War Painter",
    class: "Soldier",
    featured: true,
    image: "",
    blurb: "All business. The business is rockets.",
    items: ["Tyrant's Helm", "Soldier's Stash", "Suomuna", "Original", "Gunboats", "Escape Plan"],
    notes: "Gunboats + Escape Plan so I can rocket jump across the map and still bail when it goes wrong."
  },
  {
    id: "mann-of-the-house",
    name: "Mann of the House",
    class: "Engineer",
    featured: true,
    image: "",
    blurb: "Builds dispensers, vibes immaculate.",
    items: ["Texas Ten Gallon", "Trash Man", "Wrangler", "Rescue Ranger"],
    notes: "Wrangler for last-point holds. Rescue Ranger keeps the sentry alive from across the room."
  },
  {
    id: "field-medic",
    name: "Field Medic",
    class: "Medic",
    featured: false,
    image: "",
    blurb: "Clean, classic, keeps your pocket alive.",
    items: ["Vintage Tyrolean", "Gauzed Gaze", "Kritzkrieg", "Ubersaw"],
    notes: "Kritzkrieg over stock Uber on offense. The Ubersaw uber-on-hit is non-negotiable."
  },
  {
    id: "outback-sniper",
    name: "Outback Sniper",
    class: "Sniper",
    featured: false,
    image: "",
    blurb: "From the land down under, here to ruin your day.",
    items: ["Larrikin Robin", "Crocodile Smile", "Hitman's Heatmaker", "Jarate", "Bushwacka"],
    notes: "Jarate + Bushwacka combo for when someone gets too close."
  }
];

/* ---------- BLOG POSTS ----------
   id: used in the URL (post.html?id=...). Keep it unique & url-safe.
   date: YYYY-MM-DD  (used for sorting, newest first)
   tags: list of strings, shown as little chips
   body: HTML string. Use <p>, <h2>, <ul><li>, <blockquote>,
         <a href>, <strong>, <em>. Newlines don't matter.
*/
const POSTS = [
  {
    id: "why-i-still-play-tf2",
    title: "Why I Still Play a 17-Year-Old Game",
    date: "2026-06-10",
    tags: ["tf2", "ramble"],
    excerpt: "Everyone keeps asking why I haven't moved on. Here's the long answer nobody wanted.",
    body: `
      <p>People ask me why I still boot up Team Fortress 2 in 2026. Usually
      with a tone. Like I told them I still use a flip phone.</p>
      <h2>The short version</h2>
      <p>It's the only shooter where I can be having the best mechanical game
      of my life or wearing a fish on my head, and both feel correct.</p>
      <p>No other game lets me sweat <em>and</em> goof in the same match. That
      balance is rare and I'm not giving it up.</p>
      <blockquote>"It's not about the hats. It's a little about the hats."</blockquote>
      <p>Anyway. That's the post. Go play Engineer.</p>
    `
  },
  {
    id: "ranking-the-melees",
    title: "Ranking Every Melee By Vibes Alone",
    date: "2026-05-28",
    tags: ["tf2", "tier-list", "hot-takes"],
    excerpt: "No stats. No balance discussion. Pure vibes. The Ubersaw wins, obviously.",
    body: `
      <p>This is not a competitive tier list. This is a <strong>vibes</strong>
      tier list. Do not @ me.</p>
      <h2>S Tier</h2>
      <ul>
        <li><strong>Ubersaw</strong> — risk, reward, and the loudest "shink" in gaming.</li>
        <li><strong>Frying Pan</strong> — comedy is a stat.</li>
      </ul>
      <h2>A Tier</h2>
      <ul>
        <li><strong>Eyelander</strong> — the heads. I love the heads.</li>
        <li><strong>Escape Plan</strong> — pure adrenaline.</li>
      </ul>
      <p>Everything else exists. That's fine. They can't all be the pan.</p>
    `
  },
  {
    id: "hello-world",
    title: "Hello, World (and other startup noises)",
    date: "2026-05-15",
    tags: ["meta"],
    excerpt: "First post. This is the part where I explain what this site is and immediately get distracted.",
    body: `
      <p>Welcome to the site. This is where I'll post my loadouts and
      occasionally write about whatever's on my mind.</p>
      <p>There's no plan. That's kind of the point. Check the
      <a href="loadouts.html">loadouts</a> page for the good stuff.</p>
      <p>More soon. Probably.</p>
    `
  }
];
