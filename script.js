const texto = "Escritório de Imaginação";
const container = document.getElementById("texto");

const fontes = [
  "Arial", "Verdana", "Georgia", "Courier New",
  "Times New Roman", "Comic Sans MS", "Tahoma", "Impact", "Lucida Console"
];

function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
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

function carregarVideos() {
  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {
      const galeria = document.getElementById("galeria");

      videos.forEach(video => {
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
      });
    });
}

criarLetras();
carregarVideos();
