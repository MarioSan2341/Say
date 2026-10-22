const cielo = document.getElementById("cielo");
const puerta = document.getElementById("puerta");
const abrir = document.getElementById("abrir");
const reproductor = document.getElementById("reproductor");
const enlace = document.getElementById("enlace-cancion");
const abrazo = document.getElementById("abrazo");
const aviso = document.getElementById("abrazo-mensaje");

const corazon =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#corazon"/></svg>';
const flor =
  '<svg viewBox="0 0 64 64" aria-hidden="true"><use href="#flor"/></svg>';

function flotar(tipo, cantidad) {
  for (let i = 0; i < cantidad; i += 1) {
    const pieza = document.createElement("span");
    pieza.className = `flota flota-${tipo}`;
    pieza.style.left = `${Math.random() * 100}%`;
    pieza.style.animationDuration = `${14 + Math.random() * 16}s`;
    pieza.style.animationDelay = `${-Math.random() * 22}s`;
    pieza.style.setProperty("--s", (0.55 + Math.random() * 1.05).toFixed(2));
    pieza.style.opacity = (0.28 + Math.random() * 0.4).toFixed(2);
    pieza.innerHTML = tipo === "corazon" ? corazon : flor;
    cielo.appendChild(pieza);
  }
}

function soltar(x, y, grande) {
  const beso = document.createElement("span");
  beso.className = "beso";
  beso.style.left = `${x}px`;
  beso.style.top = `${y}px`;
  beso.style.width = grande ? "34px" : "20px";
  beso.innerHTML = corazon;
  document.body.appendChild(beso);
  window.setTimeout(() => beso.remove(), 1200);
}

function ponerCancion(id, boton) {
  document.querySelectorAll(".cancion").forEach((item) => {
    item.classList.remove("activa");
    item.querySelector(".disco").classList.remove("gira");
  });
  boton.classList.add("activa");
  boton.querySelector(".disco").classList.add("gira");
  const titulo = boton.querySelector("strong").textContent;
  const artista = boton.querySelector("small").textContent;
  reproductor.innerHTML = `<iframe title="${titulo} de ${artista} en Spotify" src="https://open.spotify.com/embed/track/${id}?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  enlace.href = `https://open.spotify.com/track/${id}`;
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const estrecho = window.matchMedia("(max-width: 700px)").matches;
  flotar("corazon", estrecho ? 6 : 11);
  flotar("flor", estrecho ? 5 : 9);
}

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("visible");
      observador.unobserve(entrada.target);
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".revelar").forEach((bloque) => observador.observe(bloque));

function abrirCarta() {
  puerta.classList.add("abierta");
  const titulo = document.querySelector(".hero-texto h2");
  if (titulo) titulo.focus({ preventScroll: true });
}

abrir.addEventListener("click", abrirCarta);

document.querySelectorAll(".cancion").forEach((boton) => {
  boton.addEventListener("click", () => ponerCancion(boton.dataset.id, boton));
});

let toque = null;

document.addEventListener("pointerdown", (evento) => {
  toque = { x: evento.clientX, y: evento.clientY, objetivo: evento.target };
});

document.addEventListener("pointerup", (evento) => {
  if (!toque) return;
  const movido = Math.abs(evento.clientX - toque.x) > 10 || Math.abs(evento.clientY - toque.y) > 10;
  const bloqueado = toque.objetivo.closest("button, a, iframe, .hoja, .reproductor");
  if (!movido && !bloqueado) soltar(evento.clientX, evento.clientY, false);
  toque = null;
});

abrazo.addEventListener("click", () => {
  const ancho = window.innerWidth;
  const alto = window.innerHeight;
  for (let i = 0; i < 16; i += 1) {
    window.setTimeout(() => {
      soltar(ancho * (0.12 + Math.random() * 0.76), alto * (0.2 + Math.random() * 0.55), true);
    }, i * 70);
  }
  aviso.textContent = "Te quiero, Say";
  aviso.classList.remove("visible");
  void aviso.offsetWidth;
  aviso.classList.add("visible");
});
