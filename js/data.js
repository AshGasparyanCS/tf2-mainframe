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
    id: "scout-loadout",
    name: "The Aviator",
    class: "Scout",
    featured: true,
    image: "assets/scout.png",
    blurb: "faster faster faster",
    items: ["Scattergun", { name: "\"flight reacts\"", wiki: "Winger" }, "Three-Rune Blade", { name: "\"And Everything Dies...\"", wiki: "Co-Pilot" }, "Dead of Night", "Buck Turner All-Stars", "Fancy Spellbook"],
    notes: "Can you tell I like pilot caps?"
  },
  {
    id: "soldier-loadout",
    name: "Whirlybird",
    class: "Soldier",
    featured: false,
    image: "assets/soldier.png",
    blurb: "rock-it launcher",
    items: [{ name: "\"r.i.p. quake champions\"", wiki: "Original" }, "Red Bear Shotgun", { name: "\"uber everywhere\"", wiki: "Escape Plan" }, "Whirly Warrior", "Pocket Medic", "Dead of Night", "Fancy Spellbook"],
    notes: "money on my mind, money money on my mind"
  },
  {
    id: "pyro-loadout",
    name: "Light Bug",
    class: "Pyro",
    featured: false,
    image: "assets/pyro.png",
    blurb: "these glasses don't do anything",
    items: [{ name: "\"eminem raps so fast\"", wiki: "Degreaser" }, { name: "\"Beirut\"", wiki: "Detonator" }, { name: "\"Last ditch effort\"", wiki: "Powerjack" }, "Graybanns", "Dead of Night", "Electric Escorter"],
    notes: "she looks at me across the boardwalk"
  },
  {
    id: "demoman-loadout",
    name: "Demo Guy",
    class: "Demoman",
    featured: true,
    image: "assets/demoman.png",
    blurb: "im floated",
    items: [{ name: "\"Iron Bummer\"", wiki: "Iron Bomber" }, "Sticky Jumper", "Scottish Handshake", "Tavish DeGroot Experience", "Dead of Night", "License to Maim"],
    notes: "i rock i roll i bloom i glow."
  },
  {
    id: "heavy-loadout",
    name: "Hey Tony",
    class: "Heavy",
    featured: true,
    image: "assets/heavy.png",
    blurb: "tough ass guy with cigar",
    items: ["Tomislav", { name: "\"waste management\"", wiki: "Family Business" }, { name: "\"less damage than stock\"", wiki: "Eviction Notice" }, "Dead of Night", "Cuban Bristle Crisis", "License to Maim"],
    notes: "Cuban missle crisis!."
  },
  {
    id: "engineer-loadout",
    name: "Dapper Texan",
    class: "Engineer",
    featured: false,
    image: "assets/engineer.png",
    blurb: "its hot outside",
    items: [{ name: "\"whoopty\"", wiki: "Rescue Ranger" }, "Giger Counter", "Wrench", { name: "\"SEG_FAULT\"", wiki: "Construction PDA" }, "Insulated Inventor", { name: "\"Last Christmas\"", wiki: "A Well Wrapped Hat" }, "Clubsy the Seal", "Fancy Spellbook"],
    notes: "seg fault get it cuz code lol."
  },
  {
    id: "medic-loadout",
    name: "The Combat Medic",
    class: "Medic",
    featured: false,
    image: "assets/medic.png",
    blurb: "what else am I gonna equip",
    items: ["Festive Crusader's Crossbow", { name: "\"Im with ya, lets do this!\"", wiki: "Medi Gun" }, "Festive Übersaw", "Combat Medic's Crusher Cap", "Dead of Night", "Unknown Mann", "Power Up Canteen"],
    notes: "Uber everywhere."
  },
  {
    id: "sniper-loadout",
    name: "Archer-o",
    class: "Sniper",
    featured: false,
    image: "assets/sniper.png",
    blurb: "120 damage demon",
    items: ["Festive Huntsman", "Festive SMG", { name: "\"destroy lonley\"", wiki: "Kukri" }, "Your Worst Nightmare", "Dead of Night", "Flashdance Footies"],
    notes: "if looks could krill."
  },
  {
    id: "spy-loadout",
    name: "Sam and Max",
    class: "Spy",
    featured: false,
    image: "assets/spy.png",
    blurb: "R-99 here",
    items: ["Big Kill", "Festive Knife", "Cloak and Dagger", "Festive Sapper", "A Hat to Kill For", "Dead of Night", "Flashdance Footies", "Fancy Spellbook"],
    notes: "PLease be paper mario."
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
    title: "Why I made this website",
    date: "2026-06-16",
    tags: ["tf2", "ramble"],
    excerpt: "Whats up with this website?",
    body: `
      <p>Honestly I was just bored and felt like making some random site idk</p>
      <h2>The short version</h2>
      <p>Bored.</p>
      <blockquote>"Add me on Steam @punchy."</blockquote>
      <p>That's the post. Go vote for Heavy.</p>
    `
  },
];
