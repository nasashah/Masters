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
      // a page laid out while hidden reports a 0x0 viewport; keep the last good
      // size instead of collapsing the canvas (it is re-measured when shown)
      var nw = cv.clientWidth, nh = cv.clientHeight;
      if (!nw || !nh) return;
      w = nw; h = nh;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function rand(a, b) { return a + Math.random() * (b - a); }

    // Ribbons are rendered into a small offscreen buffer and scaled up onto the
    // visible canvas. The upscale interpolation is what softens the edges, which
    // is far cheaper than blurring, and it keeps the fill cost tiny.
    var buf = document.createElement("canvas"), bx = buf.getContext("2d"), BS = 0.34;
    function sizeBuf() {
      buf.width = Math.max(1, Math.round(w * BS));
      buf.height = Math.max(1, Math.round(h * BS));
    }
    sizeBuf();
    window.addEventListener("resize", sizeBuf);

    /* --- value noise -> fbm --- */
    var PERM = new Uint8Array(512);
    (function () {
      var p = [], i, j, t;
      for (i = 0; i < 256; i++) p[i] = i;
      for (i = 255; i > 0; i--) { j = (Math.random() * (i + 1)) | 0; t = p[i]; p[i] = p[j]; p[j] = t; }
      for (i = 0; i < 512; i++) PERM[i] = p[i & 255];
    })();
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lattice(x, y) { return PERM[(PERM[x & 255] + (y & 255)) & 511] / 255; }
    function vnoise(x, y) {
      var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      var u = fade(xf), v = fade(yf);
      var a = lattice(xi, yi), b = lattice(xi + 1, yi);
      var c = lattice(xi, yi + 1), d = lattice(xi + 1, yi + 1);
      var top = a + (b - a) * u, bot = c + (d - c) * u;
      return top + (bot - top) * v;
    }
    function fbm(x, y) {
      return vnoise(x, y) * 0.60 + vnoise(x * 2.07, y * 2.07) * 0.27 + vnoise(x * 4.13, y * 4.13) * 0.13;
    }

    // Velocity is the curl of a scalar noise potential, so the field is
    // divergence-free: it swirls and folds like a fluid instead of just drifting.
    var NS = 0.0020, E = 0.0035, CURL = 58;
    function flowX(x, y, t) {
      var sx = x * NS, sy = (y + t * 26) * NS;
      return (fbm(sx, sy + E) - fbm(sx, sy - E)) / (2 * E) * CURL;
    }
    function flowY(x, y, t) {
      var sx = x * NS, sy = (y + t * 26) * NS;
      return -(fbm(sx + E, sy) - fbm(sx - E, sy)) / (2 * E) * CURL;
    }

    var PTS = 22;
    function makeWisp(prewarm) {
      var wisp = {
        pts: [],
        width: rand(9, 26),
        gain: rand(0.55, 1),
        rise: rand(40, 78),
        life: 0,
        span: rand(14, 24)
      };
      var x = rand(0.04, 0.96) * w, y = h + rand(8, h * 0.10), sp = rand(10, 18);
      for (var i = 0; i < PTS; i++) wisp.pts.push({ x: x, y: y + i * sp });
      if (prewarm) wisp.life = rand(0, wisp.span * 0.75);
      return wisp;
    }

    var wisps = [], lastW = 0;
    function reseed() {
      var count = w < 700 ? 13 : 22;
      wisps.length = 0;
      for (var i = 0; i < count; i++) wisps.push(makeWisp(true));
      lastW = w;
    }
    reseed();

    function drawWisp(wisp) {
      var pts = wisp.pts, n = pts.length;
      var amp = Math.sin(Math.PI * Math.min(wisp.life / wisp.span, 1)) * wisp.gain;
      if (amp <= 0.004) return;

      var lx = [], ly = [], rx = [], ry = [], i, p, pa, pb, dx, dy, len, nx, ny, u, wid;
      for (i = 0; i < n; i++) {
        p = pts[i];
        pa = pts[i > 0 ? i - 1 : 0];
        pb = pts[i < n - 1 ? i + 1 : n - 1];
        dx = pb.x - pa.x; dy = pb.y - pa.y;
        len = Math.sqrt(dx * dx + dy * dy) || 1;
        nx = -dy / len; ny = dx / len;
        u = i / (n - 1);                                  // 0 = leading tip, 1 = tail
        wid = wisp.width * (0.2 + Math.sin(Math.PI * Math.pow(1 - u, 0.7)) * 1.15);
        lx.push(p.x + nx * wid); ly.push(p.y + ny * wid);
        rx.push(p.x - nx * wid); ry.push(p.y - ny * wid);
      }

      var yTip = pts[0].y, yTail = pts[n - 1].y;
      if (yTail - yTip < 1) return;
      var grd = bx.createLinearGradient(0, yTail, 0, yTip);
      grd.addColorStop(0.00, "rgba(228,222,210," + (0.40 * amp).toFixed(4) + ")");
      grd.addColorStop(0.42, "rgba(214,207,193," + (0.27 * amp).toFixed(4) + ")");
      grd.addColorStop(1.00, "rgba(188,180,166,0)");

      bx.beginPath();
      bx.moveTo(lx[0], ly[0]);
      for (i = 1; i < n; i++) bx.lineTo(lx[i], ly[i]);
      for (i = n - 1; i >= 0; i--) bx.lineTo(rx[i], ry[i]);
      bx.closePath();
      bx.fillStyle = grd;
      bx.fill();

      // brighter filament down the middle: the luminous core real smoke has
      bx.beginPath();
      bx.moveTo(pts[0].x, pts[0].y);
      for (i = 1; i < n; i++) bx.lineTo(pts[i].x, pts[i].y);
      bx.strokeStyle = "rgba(240,236,228," + (0.30 * amp).toFixed(4) + ")";
      bx.lineWidth = Math.max(1, wisp.width * 0.32);
      bx.lineJoin = bx.lineCap = "round";
      bx.stroke();
    }

    var last = performance.now(), clock = 0;
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      clock += dt;

      if (!w || !h) { raf = requestAnimationFrame(frame); return; }
      // width changed a lot (rotation, window resize): spread the wisps again
      if (Math.abs(w - lastW) > w * 0.25) reseed();

      bx.setTransform(1, 0, 0, 1, 0, 0);
      bx.clearRect(0, 0, buf.width, buf.height);
      bx.setTransform(BS, 0, 0, BS, 0, 0);

      for (var k = 0; k < wisps.length; k++) {
        var wisp = wisps[k];
        wisp.life += dt;
        var pts = wisp.pts;

        for (var i = 0; i < pts.length; i++) {
          var p = pts[i];
          // buoyancy grows as the smoke climbs, so the column accelerates and stretches
          var lift = wisp.rise * (0.55 + (1 - Math.min(1, p.y / h)) * 0.9);
          p.x += flowX(p.x, p.y, clock) * dt;
          p.y += (flowY(p.x, p.y, clock) - lift) * dt;
        }

        if (wisp.life > wisp.span || pts[pts.length - 1].y < -60) {
          wisps[k] = makeWisp(false);
          continue;
        }
        drawWisp(wisp);
      }

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(buf, 0, 0, buf.width, buf.height, 0, 0, w, h);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    // pause when the tab is hidden
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { cancelAnimationFrame(raf); return; }
      // the viewport reads 0x0 while hidden, so re-measure before resuming
      resize(); sizeBuf();
      last = performance.now();
      raf = requestAnimationFrame(frame);
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
