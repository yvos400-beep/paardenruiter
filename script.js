const articles = [
  {
    category: "verzorging", time: 7, image: "images/stallaarzen.jpg",
    url: "/artikelen/outdoorlaarzen-stal-vergelijking",
    title: "De 5 beste outdoorlaarzen voor op stal: onze favorieten",
    excerpt: "Covalliero, Ariat, Horka, Epplejeck of Pénélope? Zo kies je de stallaars die past bij jouw dag op stal."
  },
  {
    category: "gezondheid", time: 8, image: "images/koliek-colosan.jpg",
    url: "/artikelen/koliek-paard-colosan",
    title: "Koliek bij je paard: herkennen, handelen en waarom Colosan in je stal-EHBO hoort",
    excerpt: "Herken koliek op tijd, weet wat je wél en níet doet en zorg dat je de juiste middelen al in huis hebt."
  },
  {
    category: "verzorging", time: 7, image: "images/deken.jpg",
    url: "/artikelen/welke-deken-paard-hoeveel-gram",
    imagePos: "center 35%",
    title: "Welke deken heeft je paard nodig? Hoeveel gram bij welke temperatuur",
    excerpt: "Deken erop of niet, en welke dan? Met deze temperatuurtabel en een paar vuistregels kies je in een paar seconden de juiste deken."
  },
  {
    category: "training", time: 4, image: "images/therapy-deken.jpg",
    url: "/artikelen/spierherstel-paard-therapiedeken",
    imageFit: "contain",
    title: "Sneller herstel na de training: zo houd je de spieren van je paard soepel",
    excerpt: "Warming-up, uitstappen en je paard warm houden: zo help je de spieren herstellen. Plus: wat een therapiedeken wel en niet doet."
  },
  {
    category: "verzorging", time: 9, image: "https://www.ej.nl/img/scheermachine-farmclipper-akku-diverse_111779.png",
    url: "/artikelen/paard-scheren-scheermachine",
    imageFit: "contain",
    title: "Paard scheren: wanneer, hoe en met welke scheermachine?",
    excerpt: "Een dikke wintervacht en veel zweten? Lees wanneer je scheert, welk scheermodel past en hoe je het zelf netjes doet."
  },
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
    imagePos: "center top",
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
    <div class="img-wrap${a.imageFit === "contain" ? " img-contain" : ""}"><img src="${a.image}" alt="" loading="lazy"${a.imagePos ? ` style="object-position: ${a.imagePos}"` : ""}></div>
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
