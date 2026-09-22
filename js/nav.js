(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".nav-links a[data-nav]").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var file = href.split("?")[0].split("#")[0];
    var here = location.pathname.split("/").pop() || "index.html";
    if (file === here || (a.getAttribute("data-nav") === "home" && /^(index\.html)?$/.test(here))) {
      a.classList.add("active");
    }
  });

  // Dropdowns: hover + click/tap + keyboard
  var items = Array.prototype.slice.call(document.querySelectorAll(".nav-item"));
  function closeAll(except) {
    items.forEach(function (item) {
      if (except && item === except) return;
      item.classList.remove("is-open");
      var trigger = item.querySelector(":scope > a");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }
  items.forEach(function (item) {
    var trigger = item.querySelector(":scope > a");
    var menu = item.querySelector(".nav-dropdown");
    if (!trigger || !menu) return;
    trigger.setAttribute("aria-haspopup", "true");
    if (!trigger.hasAttribute("aria-expanded")) trigger.setAttribute("aria-expanded", "false");

    function setOpen(open) {
      item.classList.toggle("is-open", !!open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    trigger.addEventListener("click", function (e) {
      // Allow real navigation on second click when already open, or modified clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || trigger.target === "_blank") return;
      var open = item.classList.contains("is-open");
      if (!open) {
        e.preventDefault();
        closeAll(item);
        setOpen(true);
      }
      // if already open, let the link navigate
    });

    item.addEventListener("mouseenter", function () { setOpen(true); });
    item.addEventListener("mouseleave", function () { setOpen(false); });
    item.addEventListener("focusin", function () { setOpen(true); });
    item.addEventListener("focusout", function (e) {
      if (!item.contains(e.relatedTarget)) setOpen(false);
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest(".nav-item")) closeAll();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAll();
      var active = document.activeElement;
      if (active && active.closest && active.closest(".nav-dropdown")) {
        var parent = active.closest(".nav-item");
        var t = parent && parent.querySelector(":scope > a");
        if (t) t.focus();
      }
    }
  });

  // Hash targets inside scrollable <main class="page">
  function scrollHashIntoMain() {
    var id = (location.hash || "").replace(/^#/, "");
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    var main = document.querySelector("main.page") || document.querySelector("main");
    if (main && main.contains(el) && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    // open creative details if needed
    if (el.tagName === "DETAILS") el.open = true;
  }
  scrollHashIntoMain();
  window.addEventListener("hashchange", scrollHashIntoMain);

  if (reduce) return;

  document.querySelectorAll('a[href$=".html"], a[href^="index.html"], a[href*=".html?"], a.brand-name, a.brand').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("http") || href.startsWith("#")) return;
      if (href.indexOf("#") !== -1 && href.split("#")[0] === (location.pathname.split("/").pop() || "index.html")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === "_blank") return;
      // don't animate away when toggling dropdown
      if (link.closest && link.closest(".nav-item") && link.parentElement && link.parentElement.classList.contains("nav-item") && e.defaultPrevented) return;
      var page = document.querySelector(".page");
      if (!page) return;
      // only same-site html navigations
      if (!/\.html(\?|#|$)/.test(href) && href !== "index.html") return;
      e.preventDefault();
      page.classList.add("is-leaving");
      setTimeout(function () { location.href = href; }, 170);
    });
  });
})();
