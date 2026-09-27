/* Calm motion pass: one-time entrances + wave emoji. No-op under prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var main = document.querySelector("main.page") || document.querySelector("main");

  /* 3. Wave emoji: wrap any 👋 (with or without skin tone) inside main, wave twice on load and again on hover */
  function initWave() {
    if (!main || !window.NodeFilter) return;
    var re = /\uD83D\uDC4B(?:\uD83C[\uDFFB-\uDFFF])?/;
    var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) {
      if (re.test(n.nodeValue) && !(n.parentNode && n.parentNode.classList && n.parentNode.classList.contains("wave-emoji"))) nodes.push(n);
    }
    nodes.forEach(function (node) {
      var m = node.nodeValue.match(re);
      if (!m) return;
      var after = node.splitText(m.index);
      after.splitText(m[0].length);
      var span = document.createElement("span");
      span.className = "wave-emoji";
      span.setAttribute("role", "img");
      span.setAttribute("aria-label", "waving hand");
      node.parentNode.insertBefore(span, after);
      span.appendChild(after);
    });
    document.querySelectorAll(".wave-emoji").forEach(function (el) {
      function play() {
        el.classList.remove("is-waving");
        void el.offsetWidth;
        el.classList.add("is-waving");
      }
      el.addEventListener("animationend", function () { el.classList.remove("is-waving"); });
      el.addEventListener("mouseenter", play);
      setTimeout(play, 500);
    });
  }

  /* 1. One-time entrance for sections / cards */
  function initReveal() {
    if (!main || !("IntersectionObserver" in window)) return;
    var SEL = [
      ".home-hero > *", ".page-hero", ".section-head", ".card", ".panel",
      ".ai-tool-card", ".case-block", ".experience-item",
      ".prose", ".about-timeline-head", ".actions", ".chips", ".contact-group-title",
      ".diag-block", ".project-browser", ".files-repo-picks"
    ].join(",");
    // .project-card--case already has its own one-time staggered entrance (projectEnter), so it is skipped here.
    var all = Array.prototype.slice.call(main.querySelectorAll(SEL)).filter(function (el) {
      return !el.classList.contains("project-card");
    });
    var set = new Set(all);
    var targets = all.filter(function (el) {
      for (var p = el.parentElement; p && p !== main; p = p.parentElement) {
        if (set.has(p)) return false; // no nested double-animations
      }
      return true;
    });
    if (!targets.length) return;

    document.documentElement.classList.add("rv-on");

    function finish(el) {
      if (el.classList.contains("rv-done")) return;
      el.classList.remove("rv-in");
      el.classList.add("rv-done");
      el.style.removeProperty("--rv-delay");
    }

    var io = new IntersectionObserver(function (entries) {
      var perParent = new Map();
      entries.forEach(function (entry) {
        var el = entry.target;
        if (!entry.isIntersecting) {
          // Already scrolled past (e.g. deep-link / hash jump): show it without animating.
          var rb = entry.rootBounds;
          var r = entry.boundingClientRect;
          if (rb && (r.width || r.height) && r.bottom <= rb.top) {
            io.unobserve(el);
            finish(el);
          }
          return;
        }
        io.unobserve(el);
        var parent = el.parentElement;
        var i = perParent.get(parent) || 0;
        perParent.set(parent, i + 1);
        var delay = Math.min(i, 5) * 70;
        el.style.setProperty("--rv-delay", delay + "ms");
        el.classList.add("rv-in");
        el.addEventListener("animationend", function onEnd(e) {
          if (e.target !== el || e.animationName !== "rvRise") return;
          el.removeEventListener("animationend", onEnd);
          finish(el);
        });
        setTimeout(function () { finish(el); }, 620 + delay + 400); // safety net
      });
    }, { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0 });

    targets.forEach(function (el) {
      el.classList.add("rv");
      io.observe(el);
    });

    // Safety: never leave content hidden if the page is printed.
    window.addEventListener("beforeprint", function () { targets.forEach(finish); });
  }

  initWave();
  initReveal();
})();
