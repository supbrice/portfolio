(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".nav-links a[data-nav]").forEach(function (a) {
    if (a.getAttribute("href") === location.pathname.split("/").pop() ||
        (a.getAttribute("data-nav") === "home" && /\/(index\.html)?$/.test(location.pathname))) {
      a.classList.add("active");
    }
  });

  if (reduce) return;

  document.querySelectorAll('a[href$=".html"], a[href="index.html"], a.brand').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("http") || href.startsWith("#")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === "_blank") return;
      var page = document.querySelector(".page");
      if (!page) return;
      e.preventDefault();
      page.classList.add("is-leaving");
      setTimeout(function () {
        location.href = href;
      }, 170);
    });
  });
})();
