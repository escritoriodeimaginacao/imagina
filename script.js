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
    }

    container.appendChild(span);
  }
}

function animarLetras() {
  const letras = document.querySelectorAll(".letra");
  letras.forEach(letra => {
    letra.style.fontSize = `${Math.floor(Math.random() * 30) + 20}px`;
    letra.style.fontFamily = fontes[Math.floor(Math.random() * fontes.length)];
    letra.style.color = gerarCorAleatoria();
  });
}

criarLetras();
animarLetras();
setInterval(animarLetras, 1000);
