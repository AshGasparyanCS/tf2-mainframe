/* ============================================================
   Rendering + page wiring. You normally won't need to edit this.
   Content goes in data.js.
   ============================================================ */

// ---- helpers ----
function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

function classSlug(c) {
  return "cls-" + c.toLowerCase();
}

function wikiUrl(name) {
  return "https://wiki.teamfortress.com/wiki/" +
    encodeURI(String(name).trim().replace(/\s+/g, "_"));
}

// Build one item chip. An item can be:
//   "Scattergun"                         -> links to the wiki
//   { name: "flight reacts", wiki: "Pistol" }  -> shows your name, links to "Pistol"
// Names wrapped in quotes are treated as custom renames and are NOT linked
// (they wouldn't resolve on the wiki) unless you give an explicit wiki target.
function itemChip(it) {
  let label, wiki, link;
  if (it && typeof it === "object") {
    label = it.name;
    wiki = it.wiki || it.name;
    link = true;
  } else {
    label = String(it);
    link = !/^\s*["']/.test(label);
    wiki = label;
  }
  const li = document.createElement("li");
  let chip;
  if (link) {
    chip = document.createElement("a");
    chip.href = wikiUrl(wiki);
    chip.target = "_blank";
    chip.rel = "noopener noreferrer";
    chip.title = "View “" + wiki + "” on the TF2 Wiki";
  } else {
    chip = document.createElement("span");
  }
  chip.className = "chip" + (link ? " item-link" : "");
  chip.textContent = label;
  li.appendChild(chip);
  return li;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function sortedPosts() {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

// ---- loadout card ----
function loadoutCard(lo) {
  const card = el("article", "card " + classSlug(lo.class));
  const media = el("div", "card-media");
  // The class-colored placeholder is always present underneath.
  media.appendChild(el("div", "media-placeholder", "<span>" + lo.class + "</span>"));
  if (lo.image) {
    // The real media sits on top, hidden until hover (crossfade).
    const reveal = el("div", "media-reveal");
    const isVideo = /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(lo.image);
    // If the file isn't there yet, quietly fall back to just the placeholder.
    const fail = function () {
      media.classList.remove("has-reveal");
      reveal.remove();
      hint.remove();
    };
    let mediaEl;
    if (isVideo) {
      mediaEl = document.createElement("video");
      mediaEl.src = lo.image;
      // Use a same-named .png (if present) as the resting frame.
      mediaEl.poster = lo.image.replace(/\.(mp4|webm|mov|ogg)(\?.*)?$/i, ".png");
      mediaEl.muted = true;
      mediaEl.loop = true;
      mediaEl.playsInline = true;
      mediaEl.preload = "metadata";
      mediaEl.setAttribute("aria-label", lo.name + " loadout");
      mediaEl.addEventListener("error", fail);
      // Only play while the card is hovered — keeps things light.
      card.addEventListener("mouseenter", function () {
        const p = mediaEl.play();
        if (p && p.catch) p.catch(function () {});
      });
      card.addEventListener("mouseleave", function () { mediaEl.pause(); });
    } else {
      mediaEl = document.createElement("img");
      mediaEl.src = lo.image;
      mediaEl.alt = lo.name + " loadout";
      mediaEl.loading = "lazy";
      mediaEl.addEventListener("error", fail);
    }
    reveal.appendChild(mediaEl);
    media.appendChild(reveal);
    const hint = el("div", "reveal-hint", "Hover to reveal");
    media.appendChild(hint);
    media.classList.add("has-reveal");
  }
  card.appendChild(media);

  const body = el("div", "card-body");
  body.appendChild(el("span", "class-tag", lo.class));
  body.appendChild(el("h3", null, lo.name));
  if (lo.blurb) body.appendChild(el("p", "card-blurb", lo.blurb));

  if (lo.items && lo.items.length) {
    const ul = el("ul", "item-list");
    lo.items.forEach((it) => ul.appendChild(itemChip(it)));
    body.appendChild(ul);
  }
  if (lo.notes) body.appendChild(el("p", "card-notes", lo.notes));

  card.appendChild(body);
  return card;
}

// ---- post row ----
function postRow(p) {
  const row = el("a", "post-row");
  row.href = "post.html?id=" + encodeURIComponent(p.id);
  row.appendChild(el("div", "post-date", formatDate(p.date)));
  const main = el("div", "post-main");
  main.appendChild(el("h3", null, p.title));
  if (p.excerpt) main.appendChild(el("p", "post-excerpt", p.excerpt));
  if (p.tags && p.tags.length) {
    const tags = el("div", "tag-row");
    p.tags.forEach((t) => tags.appendChild(el("span", "tag", "#" + t)));
    main.appendChild(tags);
  }
  row.appendChild(main);
  row.appendChild(el("div", "post-arrow", "→"));
  return row;
}

// ---- page renderers ----
function renderHome() {
  const feat = LOADOUTS.filter((l) => l.featured);
  const grid = document.getElementById("featured-loadouts");
  (feat.length ? feat : LOADOUTS.slice(0, 3)).forEach((l) => grid.appendChild(loadoutCard(l)));

  const list = document.getElementById("latest-posts");
  sortedPosts().slice(0, 3).forEach((p) => list.appendChild(postRow(p)));
}

function renderLoadoutsPage() {
  const classes = ["All", ...Array.from(new Set(LOADOUTS.map((l) => l.class)))];
  const filterWrap = document.getElementById("class-filter");
  const grid = document.getElementById("loadout-grid");

  function draw(cls) {
    grid.innerHTML = "";
    const list = cls === "All" ? LOADOUTS : LOADOUTS.filter((l) => l.class === cls);
    if (!list.length) {
      grid.appendChild(el("p", "empty", "No loadouts here yet."));
      return;
    }
    list.forEach((l) => grid.appendChild(loadoutCard(l)));
  }

  classes.forEach((c, i) => {
    const b = el("button", "filter-btn" + (i === 0 ? " active" : ""), c);
    if (c !== "All") b.classList.add(classSlug(c));
    b.addEventListener("click", () => {
      filterWrap.querySelectorAll(".filter-btn").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      draw(c);
    });
    filterWrap.appendChild(b);
  });

  draw("All");
}

function renderBlogList() {
  const list = document.getElementById("blog-list");
  const posts = sortedPosts();
  if (!posts.length) {
    list.appendChild(el("p", "empty", "No posts yet. Check back soon."));
    return;
  }
  posts.forEach((p) => list.appendChild(postRow(p)));
}

function renderSinglePost() {
  const article = document.getElementById("post-article");
  const id = new URLSearchParams(location.search).get("id");
  const post = POSTS.find((p) => p.id === id);

  if (!post) {
    article.innerHTML = "";
    article.appendChild(el("h1", null, "Post not found"));
    article.appendChild(el("p", null, "That post doesn't exist. Try the <a href='blog.html'>blog index</a>."));
    return;
  }

  document.title = post.title + " — Mann Co. Mainframe";
  article.innerHTML = "";
  article.appendChild(el("div", "post-date big", formatDate(post.date)));
  article.appendChild(el("h1", null, post.title));
  if (post.tags && post.tags.length) {
    const tags = el("div", "tag-row");
    post.tags.forEach((t) => tags.appendChild(el("span", "tag", "#" + t)));
    article.appendChild(tags);
  }
  article.appendChild(el("div", "post-content", post.body));

  // load the comments section for this post (if comments.js is present)
  if (typeof renderComments === "function") renderComments(post.id);
}

// ---- shared chrome (runs on every page) ----
(function initChrome() {
  document.addEventListener("DOMContentLoaded", () => {
    const yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => nav.classList.toggle("open"));
    }
  });
})();
