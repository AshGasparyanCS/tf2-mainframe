/* ============================================================
   Mann Co. Clicker — a tiny idle game. Saves to localStorage.
   No backend.
   ============================================================ */

const CLICKER_SAVE = "mannco_clicker_v1";

const UPGRADES = [
  { id: "gloves",     name: "Reinforced Gloves",  desc: "+1 metal per click",      type: "click", amount: 1,    base: 15,    mult: 1.15 },
  { id: "dispenser",  name: "Dispenser",          desc: "+1 metal / sec",          type: "auto",  amount: 1,    base: 50,    mult: 1.15 },
  { id: "engie",      name: "Hire an Engineer",   desc: "+5 metal / sec",          type: "auto",  amount: 5,    base: 300,   mult: 1.16 },
  { id: "powerglove", name: "Gunslinger",         desc: "+10 metal per click",     type: "click", amount: 10,   base: 600,   mult: 1.17 },
  { id: "factory",    name: "Mann Co. Factory",   desc: "+50 metal / sec",         type: "auto",  amount: 50,   base: 4000,  mult: 1.18 },
  { id: "saxton",     name: "Saxton Hale",        desc: "+250 metal / sec",        type: "auto",  amount: 250,  base: 25000, mult: 1.2 },
  { id: "australium", name: "Australium Mine",    desc: "+1500 metal / sec",       type: "auto",  amount: 1500, base: 150000,mult: 1.22 }
];

let game = { metal: 0, owned: {} };

function loadGame() {
  try {
    const s = JSON.parse(localStorage.getItem(CLICKER_SAVE));
    if (s && typeof s.metal === "number") game = { metal: s.metal, owned: s.owned || {} };
  } catch (e) {}
  UPGRADES.forEach(function (u) { if (!game.owned[u.id]) game.owned[u.id] = 0; });
}
function saveGame() {
  try { localStorage.setItem(CLICKER_SAVE, JSON.stringify(game)); } catch (e) {}
}

function costOf(u) { return Math.ceil(u.base * Math.pow(u.mult, game.owned[u.id])); }
function perClick() {
  let n = 1;
  UPGRADES.forEach(function (u) { if (u.type === "click") n += u.amount * game.owned[u.id]; });
  return n;
}
function perSec() {
  let n = 0;
  UPGRADES.forEach(function (u) { if (u.type === "auto") n += u.amount * game.owned[u.id]; });
  return n;
}

function fmt(n) {
  n = Math.floor(n);
  if (n < 1000) return String(n);
  if (n < 1e6) return (n / 1e3).toFixed(2).replace(/\.?0+$/, "") + "K";
  if (n < 1e9) return (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
  return (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
}

function renderClicker() {
  loadGame();
  const metalEl = document.getElementById("clk-metal");
  const perClickEl = document.getElementById("clk-perclick");
  const perSecEl = document.getElementById("clk-persec");
  const btn = document.getElementById("clk-btn");
  const shop = document.getElementById("clk-shop");
  const reset = document.getElementById("clk-reset");
  if (!btn || !shop) return;

  function paintTop() {
    metalEl.textContent = fmt(game.metal);
    perClickEl.textContent = fmt(perClick());
    perSecEl.textContent = fmt(perSec());
  }

  function paintShop() {
    shop.innerHTML = "<h3 class='shop-title'>Upgrades</h3>";
    UPGRADES.forEach(function (u) {
      const cost = costOf(u);
      const row = document.createElement("button");
      row.className = "shop-item" + (game.metal >= cost ? "" : " disabled");
      row.innerHTML =
        "<div class='shop-info'><span class='shop-name'>" + u.name +
        " <em>x" + game.owned[u.id] + "</em></span>" +
        "<span class='shop-desc'>" + u.desc + "</span></div>" +
        "<span class='shop-cost'>" + fmt(cost) + "</span>";
      row.addEventListener("click", function () {
        const c = costOf(u);
        if (game.metal < c) return;
        game.metal -= c;
        game.owned[u.id]++;
        saveGame();
        paintTop();
        paintShop();
      });
      shop.appendChild(row);
    });
  }

  function floatPlus(amount) {
    const f = document.createElement("span");
    f.className = "click-float";
    f.textContent = "+" + fmt(amount);
    btn.appendChild(f);
    setTimeout(function () { f.remove(); }, 700);
  }

  btn.addEventListener("click", function () {
    const gain = perClick();
    game.metal += gain;
    floatPlus(gain);
    paintTop();
    // cheap refresh of affordability without full repaint every click
    if (Math.random() < 0.34) paintShop();
  });

  reset.addEventListener("click", function () {
    if (!confirm("Wipe your save and start over?")) return;
    game = { metal: 0, owned: {} };
    UPGRADES.forEach(function (u) { game.owned[u.id] = 0; });
    saveGame(); paintTop(); paintShop();
  });

  // idle income
  setInterval(function () {
    const ps = perSec();
    if (ps > 0) { game.metal += ps; paintTop(); }
  }, 1000);

  // periodic save + repaint shop affordability
  setInterval(function () { saveGame(); paintShop(); }, 3000);
  window.addEventListener("beforeunload", saveGame);

  paintTop();
  paintShop();
}
