(function () {
  var KEY = "po-theme";

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function current() {
    return document.documentElement.getAttribute("data-theme") || systemTheme();
  }

  function syncButtons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var next = theme === "dark" ? "light" : "dark";
      btn.setAttribute("aria-label", "Switch to " + next + " mode");
      btn.setAttribute("data-active-theme", theme);
      btn.title = theme === "dark" ? "Dark mode" : "Light mode";
    });
  }

  function apply(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem(KEY, theme); } catch (e) {}
    }
    syncButtons(theme);
    try {
      window.dispatchEvent(new CustomEvent("po-theme-change", { detail: { theme: theme } }));
    } catch (e) {}
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  apply(stored || systemTheme(), false);

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      apply(current() === "dark" ? "light" : "dark", true);
    });
  });

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () {
      var s = null;
      try { s = localStorage.getItem(KEY); } catch (e) {}
      if (!s) apply(systemTheme(), false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
