/* ============================================================
   Shared data for the "Fun" tools (randomizer + crate sim).
   Item names link to the TF2 Wiki, so keep them spelled as the
   wiki spells them.
   ============================================================ */

// Weapons per class, by slot.
const WEAPONS = {
  Scout: {
    primary: ["Scattergun", "Force-A-Nature", "Shortstop", "Soda Popper", "Baby Face's Blaster", "Back Scatter"],
    secondary: ["Pistol", "Bonk! Atomic Punch", "Crit-a-Cola", "Mad Milk", "Winger", "Pretty Boy's Pocket Pistol", "Flying Guillotine"],
    melee: ["Bat", "Sandman", "Holy Mackerel", "Candy Cane", "Boston Basher", "Sun-on-a-Stick", "Atomizer", "Wrap Assassin"]
  },
  Soldier: {
    primary: ["Rocket Launcher", "Direct Hit", "Black Box", "Rocket Jumper", "Liberty Launcher", "Cow Mangler 5000", "Original", "Beggar's Bazooka"],
    secondary: ["Shotgun", "Buff Banner", "Gunboats", "Battalion's Backup", "Concheror", "Reserve Shooter", "Mantreads"],
    melee: ["Shovel", "Equalizer", "Pain Train", "Half-Zatoichi", "Disciplinary Action", "Escape Plan", "Market Gardener"]
  },
  Pyro: {
    primary: ["Flame Thrower", "Backburner", "Degreaser", "Phlogistinator", "Dragon's Fury"],
    secondary: ["Shotgun", "Flare Gun", "Detonator", "Reserve Shooter", "Manmelter", "Scorch Shot", "Thermal Thruster", "Gas Passer"],
    melee: ["Fire Axe", "Axtinguisher", "Homewrecker", "Powerjack", "Back Scratcher", "Sharpened Volcano Fragment", "Neon Annihilator", "Hot Hand"]
  },
  Demoman: {
    primary: ["Grenade Launcher", "Loch-n-Load", "Ali Baba's Wee Booties", "Loose Cannon", "Iron Bomber", "B.A.S.E. Jumper"],
    secondary: ["Stickybomb Launcher", "Scottish Resistance", "Chargin' Targe", "Sticky Jumper", "Splendid Screen", "Tide Turner", "Quickiebomb Launcher"],
    melee: ["Bottle", "Eyelander", "Scotsman's Skullcutter", "Ullapool Caber", "Claidheamh Mòr", "Half-Zatoichi", "Persian Persuader"]
  },
  Heavy: {
    primary: ["Minigun", "Natascha", "Brass Beast", "Tomislav", "Huo-Long Heater"],
    secondary: ["Shotgun", "Sandvich", "Dalokohs Bar", "Buffalo Steak Sandvich", "Family Business", "Second Banana"],
    melee: ["Fists", "Killing Gloves of Boxing", "Gloves of Running Urgently", "Warrior's Spirit", "Fists of Steel", "Eviction Notice", "Holiday Punch"]
  },
  Engineer: {
    primary: ["Shotgun", "Frontier Justice", "Widowmaker", "Pomson 6000", "Rescue Ranger"],
    secondary: ["Pistol", "Wrangler", "Short Circuit"],
    melee: ["Wrench", "Gunslinger", "Southern Hospitality", "Jag", "Eureka Effect"]
  },
  Medic: {
    primary: ["Syringe Gun", "Blutsauger", "Crusader's Crossbow", "Overdose"],
    secondary: ["Medi Gun", "Kritzkrieg", "Quick-Fix", "Vaccinator"],
    melee: ["Bonesaw", "Ubersaw", "Vita-Saw", "Amputator", "Solemn Vow"]
  },
  Sniper: {
    primary: ["Sniper Rifle", "Huntsman", "Sydney Sleeper", "Bazaar Bargain", "Machina", "Hitman's Heatmaker", "Classic"],
    secondary: ["SMG", "Jarate", "Razorback", "Darwin's Danger Shield", "Cozy Camper", "Cleaner's Carbine"],
    melee: ["Kukri", "Tribalman's Shiv", "Bushwacka", "Shahanshah"]
  },
  Spy: {
    primary: ["Revolver", "Ambassador", "L'Etranger", "Enforcer", "Diamondback"],
    secondary: ["Sapper", "Red-Tape Recorder"],
    melee: ["Knife", "Your Eternal Reward", "Conniver's Kunai", "Big Earner", "Spy-cicle"]
  }
};

// A grab-bag of cosmetics for the randomizer (all-class flavor).
const COSMETICS = [
  "Team Captain", "Modest Pile of Hat", "Ghastly Gibus", "Ye Olde Baker Boy",
  "Fancy Fedora", "Stout Shako", "Killer Exclusive", "Bill's Hat",
  "Dr's Dapper Topper", "Hound Dog", "Whoopee Cap", "Hard Counter",
  "Frontline Field Recorder", "Sangu Sleeves", "Dead of Night", "Flashdance Footies",
  "Backwards Ballcap", "Cosa Nostra Cap", "Tossle Cap", "Larrikin Robin",
  "Brigade Helm", "Soldier's Stash", "Tyrant's Helm", "Honcho's Headgear",
  "Cuban Bristle Crisis", "Texas Ten Gallon", "Vintage Tyrolean", "Crocodile Smile",
  "A Hat to Kill For", "Familiar Fez", "Triboniophorus Tyrannus", "Gold Digger"
];

// Crate roll table: grades from common -> rare, with weights & colors.
// Loosely mirrors TF2's decorated-weapon grade rarity.
const CRATE_GRADES = [
  { name: "Civilian Grade",  color: "#b0c3d9", weight: 50 },
  { name: "Freelance Grade", color: "#5e98d9", weight: 26 },
  { name: "Mercenary Grade", color: "#4b69ff", weight: 14 },
  { name: "Commando Grade",  color: "#8847ff", weight: 6 },
  { name: "Assassin Grade",  color: "#d32ce6", weight: 3 },
  { name: "Elite Grade",     color: "#eb4b4b", weight: 1 }
];

// Items that can come out of the crate (mixed bag, just for fun).
const CRATE_ITEMS = [
  "Scattergun", "Rocket Launcher", "Flame Thrower", "Stickybomb Launcher",
  "Minigun", "Wrench", "Medi Gun", "Sniper Rifle", "Revolver", "Frying Pan",
  "Black Box", "Degreaser", "Iron Bomber", "Tomislav", "Ubersaw", "Ambassador",
  "Eyelander", "Kukri", "Bonk! Atomic Punch", "Sandvich"
];

// Tiny chance of an Unusual on any open — pick a random "effect".
const UNUSUAL_EFFECTS = [
  "Burning Flames", "Scorching Flames", "Sunbeams", "Purple Energy",
  "Green Energy", "Circling TF Logo", "Massed Flies", "Cloud 9",
  "Stormy Storm", "Nuts n' Bolts", "Orbiting Planets", "Time Warp"
];
const UNUSUAL_CHANCE = 0.02; // 2% per open

// TF2 item quality -> text color (for the Backpack showcase).
const QUALITY_COLORS = {
  Normal: "#b2b2b2",
  Unique: "#ffd700",
  Strange: "#cf6a32",
  Vintage: "#476291",
  Genuine: "#4d7455",
  Unusual: "#8650ac",
  Haunted: "#38f3ab",
  "Collector's": "#aa0000",
  "Self-Made": "#70b04a"
};

/* ---------- BACKPACK SHOWCASE ----------
   Your prized items. Edit this list with your real ones.
   quality: one of the keys in QUALITY_COLORS above.
   effect:  only for Unusual hats (shows under the name).
   value:   free text, e.g. "~12 keys" (optional).
   note:    a line about why it matters (optional).
   wiki:    defaults to the name; override if needed.
*/
const BACKPACK = [
  { name: "Team Captain", quality: "Unusual", effect: "Burning Flames", value: "", note: "Replace these with your actual grail items." },
  { name: "Strange Scattergun", quality: "Strange", wiki: "Strange", value: "", note: "Kill count goes brrr." },
  { name: "Bill's Hat", quality: "Unique", value: "", note: "A classic promo." }
];
