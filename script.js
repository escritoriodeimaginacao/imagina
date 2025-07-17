const texto = "Escritório de Imaginação";
const container = document.getElementById("texto");

const fontes = [
  "Arial", "Verdana", "Georgia", "Courier New",
  "Times New Roman", "Comic Sans MS", "Tahoma", "Impact", "Lucida Console"
];

function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 100) + 155;  // mínimo 155
  const g = Math.floor(Math.random() * 100) + 155;
  const b = Math.floor(Math.random() * 100) + 155;
  return `rgb(${r}, ${g}, ${b})`;
}

function criarLetras() {
  container.innerHTML = "";
  for (let char of texto) {
    const span = document.createElement("span");

    if (char === " ") {
      span.className = "espaco";
    } else {
      span.className = "letra";
      span.textContent = char;
      span.style.color = gerarCorAleatoria();
      span.style.fontFamily = fontes[Math.floor(Math.random() * fontes.length)];
    }

    container.appendChild(span);
  }
}

let videosGlobais = [];
let tagsAtivas = new Set();

function atualizarGaleriaFiltrada() {
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  videosGlobais.forEach(video => {
    const temTags = video.tags && video.tags.length > 0;
    const corresponde = tagsAtivas.size === 0 || (temTags && video.tags.some(tag => tagsAtivas.has(tag)));

    if (corresponde) {
      const card = document.createElement("div");
      card.className = "video-card";

      const iframe = document.createElement("iframe");
      if (video.tipo === "youtube") {
        const videoId = new URL(video.url).searchParams.get("v");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
      } else if (video.tipo === "instagram") {
        iframe.src = video.url;
      }

      const titulo = document.createElement("h2");
      titulo.textContent = video.titulo;

      const descricao = document.createElement("p");
      descricao.textContent = video.descricao;

      card.appendChild(iframe);
      card.appendChild(titulo);
      card.appendChild(descricao);
      galeria.appendChild(card);
    }
  });
}

function carregarVideos() {
  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {
      videosGlobais = videos;
      const tagsContainer = document.getElementById("tags-container");
      tagsContainer.innerHTML = "";
      let tagsSet = new Set();

      videos.forEach(video => {
        if (video.tags) {
          video.tags.forEach(tag => tagsSet.add(tag));
        }
      });

      tagsSet.forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;

        span.addEventListener("click", () => {
          if (tagsAtivas.has(tag)) {
            tagsAtivas.delete(tag);
            span.classList.remove("tag-ativa");
          } else {
            tagsAtivas.add(tag);
            span.classList.add("tag-ativa");
          }
          atualizarGaleriaFiltrada();
        });

        tagsContainer.appendChild(span);
      });

      atualizarGaleriaFiltrada();
    });
}

criarLetras();
setInterval(criarLetras, 1000);
carregarVideos();
