/* ============================================================
   No-login comments backed by Supabase.
   Friends type a name + message — no account needed.
   Spam defense: hidden honeypot field, length limits (also
   enforced in the DB), and a short client-side cooldown.
   Moderate (edit/delete) from your Supabase dashboard.
   ============================================================ */

function supabaseReady() {
  return (
    typeof SUPABASE_URL === "string" &&
    typeof SUPABASE_ANON_KEY === "string" &&
    SUPABASE_URL.startsWith("http") &&
    !SUPABASE_URL.includes("PASTE_") &&
    !SUPABASE_ANON_KEY.includes("PASTE_")
  );
}

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  const secs = Math.max(1, Math.floor((Date.now() - then) / 1000));
  const units = [
    [31536000, "year"], [2592000, "month"], [86400, "day"],
    [3600, "hour"], [60, "minute"], [1, "second"]
  ];
  for (const [s, label] of units) {
    if (secs >= s) {
      const n = Math.floor(secs / s);
      return n + " " + label + (n > 1 ? "s" : "") + " ago";
    }
  }
  return "just now";
}

async function fetchComments(postId) {
  const url =
    SUPABASE_URL +
    "/rest/v1/comments?select=name,body,created_at&post_id=eq." +
    encodeURIComponent(postId) +
    "&order=created_at.asc";
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: "Bearer " + SUPABASE_ANON_KEY }
  });
  if (!res.ok) throw new Error("load failed (" + res.status + ")");
  return res.json();
}

async function postComment(postId, name, body) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/comments", {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: "Bearer " + SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({ post_id: postId, name: name, body: body })
  });
  if (!res.ok) throw new Error("post failed (" + res.status + ")");
}

function commentEl(c) {
  // textContent everywhere — never inject user HTML
  const wrap = document.createElement("div");
  wrap.className = "comment";

  const head = document.createElement("div");
  head.className = "comment-head";
  const who = document.createElement("span");
  who.className = "comment-name";
  who.textContent = c.name;
  const when = document.createElement("span");
  when.className = "comment-time";
  when.textContent = timeAgo(c.created_at);
  head.appendChild(who);
  head.appendChild(when);

  const body = document.createElement("p");
  body.className = "comment-body";
  body.textContent = c.body;

  wrap.appendChild(head);
  wrap.appendChild(body);
  return wrap;
}

async function loadList(postId, listEl, countEl) {
  listEl.innerHTML = "<p class='comments-status'>Loading comments…</p>";
  try {
    const rows = await fetchComments(postId);
    listEl.innerHTML = "";
    if (countEl) countEl.textContent = rows.length ? "(" + rows.length + ")" : "";
    if (!rows.length) {
      listEl.innerHTML = "<p class='comments-status'>No comments yet. Be the first!</p>";
      return;
    }
    rows.forEach((c) => listEl.appendChild(commentEl(c)));
  } catch (e) {
    listEl.innerHTML = "<p class='comments-status err'>Couldn't load comments. Try refreshing.</p>";
  }
}

function renderComments(postId) {
  const root = document.getElementById("comments");
  if (!root) return;

  if (!supabaseReady()) {
    root.innerHTML =
      "<h2 class='comments-title'>Comments</h2>" +
      "<p class='comments-status'>Comments aren't set up yet. " +
      "(Add your Supabase keys in <code>js/config.js</code>.)</p>";
    return;
  }

  root.innerHTML = `
    <h2 class="comments-title">Comments <span class="comments-count" id="c-count"></span></h2>
    <form class="comment-form" id="c-form" autocomplete="off">
      <div class="c-row">
        <input class="c-name" id="c-name" type="text" maxlength="40"
               placeholder="Your name" required />
      </div>
      <textarea class="c-body" id="c-body" maxlength="2000" rows="3"
                placeholder="Leave a message…" required></textarea>
      <!-- honeypot: hidden from humans, bots tend to fill it -->
      <input class="c-hp" id="c-website" type="text" tabindex="-1"
             autocomplete="off" aria-hidden="true" />
      <div class="c-actions">
        <span class="c-msg" id="c-msg"></span>
        <button class="btn btn-primary" type="submit" id="c-submit">Post Comment</button>
      </div>
    </form>
    <div class="comment-list" id="c-list"></div>
  `;

  const form = document.getElementById("c-form");
  const nameEl = document.getElementById("c-name");
  const bodyEl = document.getElementById("c-body");
  const hpEl = document.getElementById("c-website");
  const msgEl = document.getElementById("c-msg");
  const btn = document.getElementById("c-submit");
  const listEl = document.getElementById("c-list");
  const countEl = document.getElementById("c-count");

  // remember the name locally for convenience
  const savedName = localStorage.getItem("comment_name");
  if (savedName) nameEl.value = savedName;

  loadList(postId, listEl, countEl);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msgEl.textContent = "";
    msgEl.className = "c-msg";

    const name = nameEl.value.trim();
    const body = bodyEl.value.trim();
    if (!name || !body) return;

    // honeypot tripped -> silently pretend success, drop the spam
    if (hpEl.value) { form.reset(); return; }

    // simple cooldown to stop rapid double-posts
    const last = Number(localStorage.getItem("comment_last") || 0);
    if (Date.now() - last < 10000) {
      msgEl.textContent = "Hang on a few seconds before posting again.";
      msgEl.className = "c-msg err";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Posting…";
    try {
      await postComment(postId, name, body);
      localStorage.setItem("comment_name", name);
      localStorage.setItem("comment_last", String(Date.now()));
      bodyEl.value = "";
      msgEl.textContent = "Posted!";
      await loadList(postId, listEl, countEl);
    } catch (err) {
      msgEl.textContent = "Something went wrong. Try again.";
      msgEl.className = "c-msg err";
    } finally {
      btn.disabled = false;
      btn.textContent = "Post Comment";
    }
  });
}
