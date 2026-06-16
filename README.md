# Mann Co. Mainframe

A TF2-themed personal site for showing off loadouts and writing blog posts.
Pure HTML/CSS/JS — no build step, no dependencies.

## Run it locally

Just open `index.html` in a browser. That's it.

For the cleanest experience (so `post.html?id=...` links behave), serve it:

```powershell
# from this folder, with Python installed:
python -m http.server 8000
# then visit http://localhost:8000
```

## How to add a loadout

Open `js/data.js` and add an entry to the `LOADOUTS` array:

```js
{
  id: "my-new-set",            // unique, url-safe
  name: "The Cool One",
  class: "Pyro",               // Scout/Soldier/Pyro/Demoman/Heavy/Engineer/Medic/Sniper/Spy
  featured: true,              // true = also shows on the home page
  image: "assets/my-set.png",  // optional; "" shows a class-colored placeholder
  blurb: "Short one-liner.",
  items: ["Hat", "Misc", "Weapon"],
  notes: "Why you run this set."
}
```

Drop screenshots in the `assets/` folder and point `image` at them.

### Loadout screenshots (hover-to-reveal)

Each card shows a class-colored placeholder by default and **fades to the real
screenshot when you hover** over it. To turn it on, just save your images into
the `assets/` folder with these exact names:

```
assets/scout.png      assets/engineer.png
assets/soldier.png    assets/medic.png
assets/pyro.png       assets/sniper.png
assets/demoman.png    assets/spy.png
assets/heavy.png
```

The `image:` paths are already set in `js/data.js`, so the moment a file is in
place it works. If a file is missing, that card simply keeps its placeholder —
nothing breaks.

**Animated cards (video):** the cards also support `.mp4` / `.webm`. If you drop
in, say, `assets/scout.mp4` and set the loadout's `image:` to it, the card plays
the clip on hover (muted, looping) and pauses when you mouse away — much smaller
and smoother than a GIF. `.gif` works too. Just match the extension in
`js/data.js` to whatever file you actually have for that class.

## How to add a blog post

In `js/data.js`, add an entry to the `POSTS` array:

```js
{
  id: "my-post",               // becomes post.html?id=my-post
  title: "My Post Title",
  date: "2026-06-16",          // YYYY-MM-DD, newest sorts first
  tags: ["tf2", "ramble"],
  excerpt: "One-line teaser for the list pages.",
  body: `<p>HTML goes here. Use &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.</p>`
}
```

## Files

| File          | What it is                                  |
|---------------|---------------------------------------------|
| `index.html`  | Home page                                   |
| `loadouts.html` | Loadout gallery with class filter         |
| `blog.html`   | List of all posts                           |
| `post.html`   | Single post viewer (reads `?id=`)           |
| `about.html`  | About page — edit the text + social links   |
| `js/data.js`  | **Your content lives here**                 |
| `js/main.js`  | Rendering logic (rarely needs editing)      |
| `css/style.css` | The TF2 theme                             |

## Hosting (free options)

- **GitHub Pages** — push this folder to a repo, enable Pages.
- **Netlify / Cloudflare Pages** — drag-and-drop the folder.

Not affiliated with Valve. Team Fortress 2 is a trademark of Valve Corporation.
