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

    // soft warm-grey puff. kept dim on purpose: these composite normally
    // (not additively), so overlap builds density instead of blowing out white
    var sprite = document.createElement("canvas"), S = 256;
    sprite.width = sprite.height = S;
    var sc = sprite.getContext("2d");
    var g = sc.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0.00, "rgba(212,202,186,0.30)");
    g.addColorStop(0.32, "rgba(196,186,170,0.16)");
    g.addColorStop(0.66, "rgba(174,164,150,0.055)");
    g.addColorStop(1.00, "rgba(158,148,134,0)");
    sc.fillStyle = g; sc.fillRect(0, 0, S, S);

    function rand(a, b) { return a + Math.random() * (b - a); }

    // layered sines standing in for curl noise: gives the horizontal shear
    // that makes a column read as smoke rather than drifting blobs
    function shear(x, y, t) {
      return Math.sin(y * 0.0125 + t * 0.42) * 10 +
             Math.sin(y * 0.0041 - t * 0.23) * 17 +
             Math.cos(x * 0.0075 + y * 0.0060 - t * 0.31) * 8;
    }

    function seed(p, fromBottom) {
      p.x = rand(-0.06, 1.06) * w;
      // born below the fold so it always enters rising
      p.y = fromBottom ? rand(h * 1.0, h * 1.28) : rand(h * 0.2, h * 1.2);
      p.r = rand(58, 170);
      p.vy = -rand(15, 34);            // px/sec, upward
      p.buoy = rand(5, 14);            // upward acceleration (px/sec^2)
      p.sway = rand(0.5, 1.5);         // how hard the shear field pushes it
      p.stretch = rand(1.05, 1.55);    // vertical elongation -> tendrils
      p.rot = rand(0, Math.PI * 2);
      p.spin = rand(-0.11, 0.11);
      p.life = 0; p.span = rand(9, 18);
      return p;
    }

    var puffs = [], COUNT = w < 700 ? 34 : 58;
    for (var i = 0; i < COUNT; i++) puffs.push(seed({}, false));
    puffs.forEach(function (p) { p.life = rand(0, p.span); });

    var last = performance.now(), clock = 0;
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      clock += dt;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < puffs.length; i++) {
        var p = puffs[i];
        p.life += dt;
        if (p.life > p.span || p.y < -p.r * 2) { seed(p, true); continue; }

        p.vy -= p.buoy * dt;                             // keeps accelerating up
        p.y += p.vy * dt;
        p.x += shear(p.x, p.y, clock) * p.sway * dt;
        p.rot += p.spin * dt;

        var t = p.life / p.span;
        var size = p.r * (0.55 + t * 1.5);               // entrainment: grows as it rises
        // thin out toward the top of the viewport so it dissipates instead of hazing everything
        var height = Math.max(0, Math.min(1, (p.y / h) * 1.3));
        ctx.globalAlpha = Math.sin(Math.PI * Math.min(t, 1)) * height;

        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.drawImage(sprite, -size / 2, -(size * p.stretch) / 2, size, size * p.stretch);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
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
