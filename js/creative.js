(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll("details.creative-card"));
  if (!cards.length) return;

  function openFromHash() {
    var id = (location.hash || "").replace(/^#/, "");
    if (!id) return;
    var el = document.getElementById(id);
    if (!el || el.tagName !== "DETAILS") return;
    el.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  cards.forEach(function (card) {
    card.addEventListener("toggle", function () {
      if (!card.open) return;
      // keep hash in sync for sharing / nav dropdown
      if (history.replaceState) {
        history.replaceState(null, "", "#" + card.id);
      } else {
        location.hash = card.id;
      }
    });
  });

  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
