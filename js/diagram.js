/*! Interactive Mermaid diagrams — pan/zoom controls similar to GitHub README viewer */
(function (global) {
  "use strict";

  var mermaidReady = null;
  function loadMermaid() {
    if (mermaidReady) return mermaidReady;
    mermaidReady = new Promise(function (resolve, reject) {
      if (global.mermaid) {
        resolve(global.mermaid);
        return;
      }
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
      s.onload = function () {
        function isDark() {
          var t = document.documentElement.getAttribute("data-theme");
          if (t === "dark") return true;
          if (t === "light") return false;
          return global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        global.mermaid.initialize({
          startOnLoad: false,
          theme: isDark() ? "dark" : "default",
          securityLevel: "loose",
          flowchart: { htmlLabels: true, curve: "basis" },
        });
        resolve(global.mermaid);
      };
      s.onerror = function () {
        reject(new Error("Could not load Mermaid"));
      };
      document.head.appendChild(s);
    });
    return mermaidReady;
  }

  function extractMermaidBlocks(markdown) {
    if (!markdown) return [];
    var blocks = [];
    var re = /```mermaid\s*([\s\S]*?)```/gi;
    var m;
    while ((m = re.exec(markdown))) {
      var code = m[1].trim();
      if (code) blocks.push(code);
    }
    return blocks;
  }

  function icon(svgPath) {
    return (
      '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">' +
      svgPath +
      "</svg>"
    );
  }

  var ICONS = {
    up: '<path fill="currentColor" d="M8 3.5 3.5 8h2.75v4.5h3.5V8H12.5z"/>',
    down: '<path fill="currentColor" d="M8 12.5 12.5 8H9.75V3.5h-3.5V8H3.5z"/>',
    left: '<path fill="currentColor" d="M3.5 8 8 3.5v2.75h4.5v3.5H8V12.5z"/>',
    right: '<path fill="currentColor" d="M12.5 8 8 12.5V9.75H3.5v-3.5H8V3.5z"/>',
    plus: '<path fill="currentColor" d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z"/>',
    minus: '<path fill="currentColor" d="M3 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 8z"/>',
    reset: '<path fill="currentColor" d="M8 3a5 5 0 1 0 4.546 2.914.75.75 0 1 0-1.37-.61A3.5 3.5 0 1 1 8 4.5V6l2.25-2.25L8 1.5V3z"/>',
  };

  function buildControls(api) {
    var pad = document.createElement("div");
    pad.className = "diag-controls";
    pad.setAttribute("role", "toolbar");
    pad.setAttribute("aria-label", "Diagram pan and zoom");

    function btn(label, path, fn) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "diag-ctrl";
      b.title = label;
      b.setAttribute("aria-label", label);
      b.innerHTML = icon(path);
      b.addEventListener("click", fn);
      return b;
    }

    var grid = document.createElement("div");
    grid.className = "diag-dpad";
    grid.appendChild(btn("Pan up", ICONS.up, function () { api.pan(0, 40); }));
    var mid = document.createElement("div");
    mid.className = "diag-dpad-mid";
    mid.appendChild(btn("Pan left", ICONS.left, function () { api.pan(40, 0); }));
    mid.appendChild(btn("Reset view", ICONS.reset, function () { api.reset(); }));
    mid.appendChild(btn("Pan right", ICONS.right, function () { api.pan(-40, 0); }));
    grid.appendChild(mid);
    grid.appendChild(btn("Pan down", ICONS.down, function () { api.pan(0, -40); }));

    var zoom = document.createElement("div");
    zoom.className = "diag-zoom";
    zoom.appendChild(btn("Zoom in", ICONS.plus, function () { api.zoom(1.2); }));
    zoom.appendChild(btn("Zoom out", ICONS.minus, function () { api.zoom(1 / 1.2); }));

    pad.appendChild(grid);
    pad.appendChild(zoom);
    return pad;
  }

  function attachPanZoom(viewport, stage) {
    var state = { scale: 1, x: 0, y: 0, dragging: false, lx: 0, ly: 0 };

    function apply() {
      stage.style.transform =
        "translate(" + state.x + "px," + state.y + "px) scale(" + state.scale + ")";
    }

    function reset() {
      state.scale = 1;
      state.x = 0;
      state.y = 0;
      apply();
    }

    function zoom(factor, cx, cy) {
      var rect = viewport.getBoundingClientRect();
      cx = cx == null ? rect.width / 2 : cx;
      cy = cy == null ? rect.height / 2 : cy;
      var next = Math.min(4, Math.max(0.35, state.scale * factor));
      var k = next / state.scale;
      state.x = cx - k * (cx - state.x);
      state.y = cy - k * (cy - state.y);
      state.scale = next;
      apply();
    }

    function pan(dx, dy) {
      state.x += dx;
      state.y += dy;
      apply();
    }

    viewport.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
        var rect = viewport.getBoundingClientRect();
        zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX - rect.left, e.clientY - rect.top);
      },
      { passive: false }
    );

    viewport.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      state.dragging = true;
      state.lx = e.clientX;
      state.ly = e.clientY;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("is-dragging");
    });
    viewport.addEventListener("pointermove", function (e) {
      if (!state.dragging) return;
      pan(e.clientX - state.lx, e.clientY - state.ly);
      state.lx = e.clientX;
      state.ly = e.clientY;
    });
    function endDrag(e) {
      state.dragging = false;
      viewport.classList.remove("is-dragging");
      try {
        viewport.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    return { pan: pan, zoom: zoom, reset: reset };
  }

  var renderCount = 0;

  function mountDiagram(host, code, opts) {
    opts = opts || {};
    host.classList.add("diag-host");
    host.innerHTML =
      '<div class="diag-frame">' +
      '<div class="diag-viewport"><div class="diag-stage"><div class="diag-mermaid">Loading diagram…</div></div></div>' +
      "</div>";
    var viewport = host.querySelector(".diag-viewport");
    var stage = host.querySelector(".diag-stage");
    var target = host.querySelector(".diag-mermaid");
    var api = attachPanZoom(viewport, stage);
    host.querySelector(".diag-frame").appendChild(buildControls(api));

    return loadMermaid()
      .then(function (mermaid) {
        renderCount += 1;
        var id = "po-mmd-" + renderCount + "-" + Date.now();
        return mermaid.render(id, code).then(function (out) {
          target.innerHTML = out.svg;
          var svg = target.querySelector("svg");
          if (svg) {
            svg.removeAttribute("height");
            svg.style.maxWidth = "100%";
            svg.style.height = "auto";
          }
          if (opts.onReady) opts.onReady(api);
          return api;
        });
      })
      .catch(function (err) {
        target.textContent = "Could not render diagram: " + (err && err.message ? err.message : err);
      });
  }

  function mountAllFromMarkdown(container, markdown, opts) {
    var blocks = extractMermaidBlocks(markdown);
    container.innerHTML = "";
    if (!blocks.length) {
      container.hidden = true;
      return Promise.resolve([]);
    }
    container.hidden = false;
    var jobs = blocks.map(function (code, i) {
      var wrap = document.createElement("section");
      wrap.className = "diag-block";
      if (opts && opts.titles && opts.titles[i]) {
        var h = document.createElement("h3");
        h.className = "diag-title";
        h.textContent = opts.titles[i];
        wrap.appendChild(h);
      } else if (blocks.length > 1) {
        var h2 = document.createElement("h3");
        h2.className = "diag-title";
        h2.textContent = "Architecture " + (i + 1);
        wrap.appendChild(h2);
      }
      var host = document.createElement("div");
      wrap.appendChild(host);
      container.appendChild(wrap);
      return mountDiagram(host, code, opts);
    });
    return Promise.all(jobs);
  }

  global.PODiagram = {
    extractMermaidBlocks: extractMermaidBlocks,
    mountDiagram: mountDiagram,
    mountAllFromMarkdown: mountAllFromMarkdown,
    loadMermaid: loadMermaid,
  };
})(window);
