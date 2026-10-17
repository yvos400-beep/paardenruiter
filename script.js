const articles = [
  {
    category: "voeding", time: 5, image: "images/elektrolyten.jpg",
    url: "/artikelen/elektrolyten-paard-zomer",
    imagePos: "center 65%",
    title: "Zweet je paard veel in de zomer? Herstel met elektrolyten",
    excerpt: "Zwaar zweten kost meer dan water alleen. Met elektrolyten vul je mineralen aan en voorkom je uitdroging."
  },
  {
    category: "gezondheid", time: 5, image: "images/magnesium.jpg",
    url: "/artikelen/magnesium-paard-stijve-spieren",
    imagePos: "center 15%",
    title: "Stijve spieren na het rijden? Magnesium maakt het verschil",
    excerpt: "Spierstijfheid en stress hangen vaak samen met een magnesiumtekort. Zo herken je het en pak je het aan."
  },
  {
    category: "voeding", time: 4, image: "images/eetlust.jpg",
    title: "Kieskeurige eter? Zo krijgt je paard weer eetlust",
    excerpt: "Een paard dat niet eet, verliest snel gewicht. Met deze aanpak vind je de oorzaak en breng je de eetlust terug."
  },
  {
    category: "training", time: 5, image: "images/zadel.jpg",
    title: "Schuift je zadel tijdens het rijden? Zo los je het op",
    excerpt: "Een schuivend zadel zorgt voor drukplekken en onbalans. Met de juiste onderlegger zit alles weer stabiel."
  },
  {
    category: "gezondheid", time: 4, image: "images/hoeven.jpg",
    title: "Brokkelige hoeven? Versterk ze van binnenuit",
    excerpt: "Droge, scheurende hoeven vragen om meer dan hoefvet. Biotine en zink helpen de hoorn sterker te groeien."
  },
  {
    category: "verzorging", time: 5, image: "images/vliegenplaag.jpg",
    url: "/artikelen/vliegenplaag-in-de-wei",
    title: "Vliegenplaag in de wei? Bescherm je paard goed",
    excerpt: "Insecten bezorgen je paard stress en huidirritatie. Zo houd je de wei draaglijk in het warme seizoen."
  }
];

const grid = document.getElementById("article-grid");
if (grid) {
const label = c => c.charAt(0).toUpperCase() + c.slice(1);

grid.innerHTML = articles.map(a => `
  <a href="${a.url || "#"}" class="article-card" data-category="${a.category}">
    <div class="img-wrap"><img src="${a.image}" alt="" loading="lazy"${a.imagePos ? ` style="object-position: ${a.imagePos}"` : ""}></div>
    <div class="article-body">
      <p class="meta">${label(a.category)} <span>•</span> ${a.time} min leestijd</p>
      <h3>${a.title}</h3>
      <p class="excerpt">${a.excerpt}</p>
      <span class="link">Lees meer <span class="arrow">→</span></span>
    </div>
  </a>`).join("");

}

// Hide broken images so the gradient fallback shows
document.querySelectorAll(".img-wrap img").forEach(img => {
  img.addEventListener("error", () => { img.style.visibility = "hidden"; });
});

// Filters
if (grid) {
const chips = document.querySelectorAll(".chip");
function applyFilter(filter) {
  chips.forEach(c => c.classList.toggle("is-active", c.dataset.filter === filter));
  grid.querySelectorAll(".article-card").forEach(card => {
    card.classList.toggle("is-hidden", filter !== "alles" && card.dataset.category !== filter);
  });
}
chips.forEach(chip => chip.addEventListener("click", () => applyFilter(chip.dataset.filter)));
document.querySelectorAll(".theme-card").forEach(card =>
  card.addEventListener("click", () => applyFilter(card.dataset.theme))
);
}

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("main-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}));

// Newsletter
const form = document.getElementById("newsletter-form");
const msg = document.getElementById("form-msg");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const email = form.querySelector("#email");
  if (!email.checkValidity() || !email.value) {
    msg.textContent = "Vul een geldig e-mailadres in.";
    email.focus();
    return;
  }
  msg.textContent = "Bedankt! Je ontvangt binnenkort je eerste oplossing.";
  form.reset();
});
