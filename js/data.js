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
    image: "",
    blurb: "faster faster faster",
    items: ["Scattergun", "\"flight reacts\"", "Three-Rune Blade", "\"And Everything Dies...\"", "Dead of Night", "Buck Turner All-Stars", "Fancy Spellbook"],
    notes: "Can you tell I like pilot caps?"
  },
  {
    id: "soldier-loadout",
    name: "Whirlybird",
    class: "Soldier",
    featured: false,
    image: "",
    blurb: "rock-it launcher",
    items: ["\"r.i.p. quake champions\"", "Red Bear Shotgun", "\"uber everywhere\"", "Whirly Warrior", "Pocket Medic", "Dead of Night", "Fancy Spellbook"],
    notes: "money on my mind, money money on my mind"
  },
  {
    id: "pyro-loadout",
    name: "Light Bug",
    class: "Pyro",
    featured: false,
    image: "",
    blurb: "these glasses don't do anything",
    items: ["\"eminem raps so fast\"", "\"Beirut\"", "\"Last ditch effort\"", "Graybanns", "Dead of Night", "Electric Escorter"],
    notes: "she looks at me across the boardwalk"
  },
  {
    id: "demoman-loadout",
    name: "Demo Guy",
    class: "Demoman",
    featured: true,
    image: "",
    blurb: "im floated",
    items: ["\"Iron Bummer\"", "Sticky Jumper", "Scottish Handshake", "Tavish DeGroot Experience", "Dead of Night", "License to Maim"],
    notes: "i rock i roll i bloom i glow."
  },
  {
    id: "heavy-loadout",
    name: "Hey Tony",
    class: "Heavy",
    featured: true,
    image: "",
    blurb: "tough ass guy with cigar",
    items: ["Tomislav", "\"waste management\"", "\"less damage than stock\"", "Dead of Night", "Cuban Bristle Crisis", "License to Maim"],
    notes: "Cuban missle crisis!."
  },
  {
    id: "engineer-loadout",
    name: "Dapper Texan",
    class: "Engineer",
    featured: false,
    image: "",
    blurb: "its hot outside",
    items: ["\"whoopty\"", "Giger Counter", "Wrench", "\"SEG_FAULT\"", "Insulated Inventor", "\"Last Christmas\"", "Clubsy the Seal", "Fancy Spellbook"],
    notes: "seg fault get it cuz code lol."
  },
  {
    id: "medic-loadout",
    name: "The Combat Medic",
    class: "Medic",
    featured: false,
    image: "",
    blurb: "what else am I gonna equip",
    items: ["Festive Crusader's Crossbow", "\"Im with ya, lets do this!\"", "Festive Übersaw", "Combat Medic's Crusher Cap", "Dead of Night", "Unknown Mann", "Power Up Canteen"],
    notes: "Uber everywhere."
  },
  {
    id: "sniper-loadout",
    name: "Archer-o",
    class: "Sniper",
    featured: false,
    image: "",
    blurb: "120 damage demon",
    items: ["Festive Huntsman", "Festive SMG", "\"destroy lonley\"", "Your Worst Nightmare", "Dead of Night", "Flashdance Footies"],
    notes: "if looks could krill."
  },
  {
    id: "spy-loadout",
    name: "Sam and Max",
    class: "Spy",
    featured: false,
    image: "",
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
