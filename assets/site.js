/* Masters Barber Lounge — site behaviour */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  var nav = document.querySelector(".nav");
  var burger = document.querySelector(".burger");
  if (nav && burger) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- scroll reveals ---------- */
  (function () {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.02 });
    targets.forEach(function (n) { io.observe(n); });
    // safety net: never leave content stranded at opacity 0
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-in)").forEach(function (n) {
        if (n.getBoundingClientRect().top < window.innerHeight * 2.5) n.classList.add("is-in");
      });
    }, 900);
  })();

  /* ---------- ambient smoke ---------- */
  (function () {
    var cv = document.querySelector(".smoke");
    if (!cv || reduce) { if (cv) cv.style.display = "none"; return; }
    var ctx = cv.getContext("2d");
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), raf = null;

    function resize() {
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var sprite = document.createElement("canvas"), S = 256;
    sprite.width = sprite.height = S;
    var sc = sprite.getContext("2d");
    var g = sc.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, "rgba(210,198,180,0.32)");
    g.addColorStop(0.45, "rgba(186,176,160,0.12)");
    g.addColorStop(1, "rgba(158,148,134,0)");
    sc.fillStyle = g; sc.fillRect(0, 0, S, S);

    function rand(a, b) { return a + Math.random() * (b - a); }
    function seed(p, low) {
      p.x = rand(-0.1, 1.1) * w;
      p.y = low ? rand(h * 0.75, h * 1.15) : rand(-h * 0.1, h * 1.1);
      p.r = rand(120, 340);
      p.vy = -rand(6, 20) / 60;
      p.drift = rand(-0.22, 0.22);
      p.phase = rand(0, Math.PI * 2);
      p.freq = rand(0.12, 0.34);
      p.life = 0; p.span = rand(16, 34);
      p.rot = rand(0, Math.PI * 2); p.spin = rand(-0.06, 0.06);
      return p;
    }
    var puffs = [];
    for (var i = 0; i < 34; i++) puffs.push(seed({}, false));
    puffs.forEach(function (p) { p.life = rand(0, p.span); });

    var last = performance.now();
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < puffs.length; i++) {
        var p = puffs[i];
        p.life += dt;
        if (p.life > p.span) seed(p, true);
        p.y += p.vy * dt * 60;
        p.x += (p.drift + Math.sin(p.life * p.freq + p.phase) * 0.5) * dt * 60;
        p.rot += p.spin * dt;
        var t = p.life / p.span;
        var size = p.r * (0.7 + t * 0.85);
        ctx.globalAlpha = Math.sin(Math.PI * Math.min(t, 1)) * 0.5;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    // pause when the tab is hidden
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { cancelAnimationFrame(raf); }
      else { last = performance.now(); raf = requestAnimationFrame(frame); }
    });
  })();

  /* ---------- live Google reviews ---------- */
  (function () {
    var grid = document.querySelector("[data-reviews]");
    if (!grid) return;
    var endpoint = grid.getAttribute("data-endpoint");
    if (!endpoint) return;

    var CACHE = "mbl-reviews-v1";
    var TTL = 12 * 60 * 60 * 1000;

    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    function trim(s, max) {
      var t = String(s || "").replace(/\s+/g, " ").trim();
      if (t.length <= max) return t;
      var cut = t.slice(0, max);
      var stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
      return stop > max * 0.5 ? cut.slice(0, stop + 1) : cut.replace(/\s+\S*$/, "") + "\u2026";
    }
    function card(r) {
      var rating = Math.max(1, Math.round(r.rating || 5));
      var stars = "\u2605\u2605\u2605\u2605\u2605".slice(0, rating);
      var avatar = r.photo
        ? '<img src="' + esc(r.photo) + '" alt="" loading="lazy" referrerpolicy="no-referrer" width="38" height="38">'
        : '<span class="initial" aria-hidden="true">' + esc((r.name || "G").trim().charAt(0).toUpperCase()) + "</span>";
      return '<article class="card">' +
        '<span class="mark" aria-hidden="true">\u201D</span>' +
        '<div class="card-top"><span class="stars" aria-label="' + rating + ' out of 5 stars">' + stars + "</span>" +
        (r.when ? "<time>" + esc(r.when) + "</time>" : "") + "</div>" +
        "<blockquote>" + esc(trim(r.quote, 260)) + "</blockquote>" +
        '<div class="card-who">' + avatar +
        '<span class="who"><b>' + esc(r.name) + "</b><small>Google Review</small></span></div>" +
        "</article>";
    }
    function paint(data) {
      var list = (data.reviews || [])
        .map(function (r) {
          return {
            name: r.name || (r.authorAttribution && r.authorAttribution.displayName) || "Google Review",
            photo: r.photo || (r.authorAttribution && r.authorAttribution.photoUri) || null,
            rating: r.rating || 5,
            when: r.when || r.relativePublishTimeDescription || "",
            quote: r.quote || (r.text && (r.text.text || r.text)) || "",
            at: r.publishedAt ? Date.parse(r.publishedAt) || 0 : 0
          };
        })
        .filter(function (r) { return r.quote; })
        // highest rated first, newest first within equal ratings
        .sort(function (a, b) { return (b.rating - a.rating) || (b.at - a.at); });

      if (!list.length) return;
      grid.innerHTML = list.slice(0, 6).map(card).join("");

      if (data.rating) {
        document.querySelectorAll("[data-rating]").forEach(function (n) {
          n.textContent = Number(data.rating).toFixed(1);
        });
      }
      if (data.userRatingCount) {
        document.querySelectorAll("[data-count]").forEach(function (n) {
          n.textContent = data.userRatingCount + " Google Reviews";
        });
      }
      document.querySelectorAll("[data-freshness]").forEach(function (n) {
        n.textContent = "Live from Google";
      });
    }

    try {
      var raw = window.localStorage.getItem(CACHE);
      if (raw) {
        var c = JSON.parse(raw);
        if (c && Date.now() - c.t < TTL && c.d) { paint(c.d); return; }
      }
    } catch (e) {}

    fetch(endpoint, { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (d) {
        paint(d);
        try { window.localStorage.setItem(CACHE, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
      })
      .catch(function () { /* server-rendered reviews stay in place */ });
  })();
})();
