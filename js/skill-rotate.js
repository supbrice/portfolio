(() => {
  const el = document.querySelector("[data-skill-rotate]");
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const skills = JSON.parse(el.getAttribute("data-skills") || "[]");
  if (!skills.length) return;
  let i = 0;
  if (reduce) {
    el.textContent = skills.join(" · ");
    return;
  }
  const swap = () => {
    el.classList.add("is-out");
    window.setTimeout(() => {
      i = (i + 1) % skills.length;
      el.textContent = skills[i];
      el.classList.remove("is-out");
      el.classList.add("is-in");
      window.setTimeout(() => el.classList.remove("is-in"), 420);
    }, 280);
  };
  window.setInterval(swap, 2600);
})();
