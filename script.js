const videos = [
  { url: "Videos/Video1-Fake.mp4", explicacaoUrl: "videos/Video1-Explicacao.mp4", respostaCorreta: "Fake", tema: "Formações em fumaças são forças de outro mundo?" },
  { url: "Videos/Video2-Fato.mp4", explicacaoUrl: "videos/Video2-Explicacao.mp4", respostaCorreta: "Fato", tema: "Pedra da Somalia é um Meteorito?" },
  { url: "Videos/Video3-Fato.mp4", explicacaoUrl: "videos/Video3-Explicacao.mp4", respostaCorreta: "Fato", tema: "Luzes no céu do Mexico são OVNIS?" },
  { url: "Videos/Video4-Fake.mp4", explicacaoUrl: "videos/Video4-Explicacao.mp4", respostaCorreta: "Fake", tema: "Criatura seria um Chupa Cabra?" },
  { url: "Videos/Video5-Fake.mp4", explicacaoUrl: "videos/Video5-Explicacao.mp4", respostaCorreta: "Fake", tema: "Espelhos são portais para outro mundo?" },
  { url: "Videos/Video6-Fato.mp4", explicacaoUrl: "videos/Video6-Explicacao.mp4", respostaCorreta: "Fato", tema: "Uma carpa na China pode ter traços humano?" },
  { url: "Videos/Video7-Fake.mp4", explicacaoUrl: "videos/Video7-Explicacao.mp4", respostaCorreta: "Fake", tema: "Câmera de segurnaça captura imagem Fantasmagórica?" },
  { url: "Videos/video8-Fato.mp4", explicacaoUrl: "videos/Video8-Explicacao.mp4", respostaCorreta: "Fato", tema: "Homem toca óleo quente e não se queima?" },
  { url: "Videos/Video9-Fato.mp4", explicacaoUrl: "videos/Video9-Explicacao.mp4", respostaCorreta: "Fato", tema: "Tubarão bebê Mutante?" },
  { url: "Videos/Video10-Fake.mp4", explicacaoUrl: "videos/Video10-Explicacao.mp4", respostaCorreta: "Fake", tema: "Exército de Naves Alienígenas?" },
];


let nome = "";
let respostas = [];
let indice = 0;
let mostrandoExplicacao = false;


function iniciar() {
  nome = document.getElementById("nome").value.trim();
  if (!nome) return alert("Enter your Name"); // alerta para digitar o nome
  document.getElementById("inicio").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  carregarVideo();
}


function carregarVideo() {
  const videoAtual = videos[indice];
  document.getElementById("video").src = videoAtual.url;

  // mantém o título normal
  document.getElementById("video-titulo").innerText = `Video ${indice + 1}`;

  // adiciona o tema sobreposto
  document.getElementById("video-tema").innerText = videoAtual.tema;

  document.getElementById("botoes").style.display = "block";
  document.getElementById("explicacao-controles").style.display = "none";
}


function responder(resposta) {
  respostas.push(resposta);
  const videoAtual = videos[indice];

  const imagem = document.getElementById("imagem-resposta");
  if (videoAtual.respostaCorreta === "Fato") {
    imagem.src = "Imagens/Fato.png";
    imagem.alt = "Este vídeo é Fato";
    imagem.className = "imgfato";
  } else {
    imagem.src = "Imagens/Fake.png";
    imagem.alt = "Este vídeo é Fake";
    imagem.className = "imgfake";
  }
  imagem.style.display = "block";

  const videoElement = document.getElementById("video");
  videoElement.src = videoAtual.explicacaoUrl;
  videoElement.load();
  videoElement.play();

  document.getElementById("video-titulo").innerText = `Video Verdict ${indice + 1}`;
  document.getElementById("botoes").style.display = "none";
  document.getElementById("explicacao-controles").style.display = "block";

  document.getElementById("video-tema").innerText = ""; // remove tema
  document.getElementById("video-titulo").innerText = `Video Verdict ${indice + 1}`;

  mostrandoExplicacao = true;
}


function avancarVideo() {
  mostrandoExplicacao = false;
  document.getElementById("explicacao-controles").style.display = "none";
  indice++;
  if (indice < videos.length) {
    carregarVideo();
  } else {
    // Pausa o vídeo antes de finalizar
    document.getElementById("video").pause();
    finalizar();
  }
}


function finalizar() {
  let pontos = 0;
  for (let i = 0; i < videos.length; i++) {
    if (respostas[i] === videos[i].respostaCorreta) pontos++;
  }

  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";
  document.getElementById("pontuacao").innerText = `${nome}, you scored  ${pontos} point(s)!`;

  salvarRanking(nome, pontos);
  mostrarRanking();
}


function salvarRanking(nome, pontos) {
  // Ranking (pode ser zerado)
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ nome, pontos });
  ranking.sort((a, b) => b.pontos - a.pontos);
  localStorage.setItem("ranking", JSON.stringify(ranking));

  // Lista de usuários (NUNCA apagada)
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const dataHora = new Date().toLocaleString("pt-BR"); // salva data e hora
  usuarios.push({ nome, pontos, dataHora });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// Mostrar lista completa de usuários
function mostrarUsuarios() {
  const listaUsuarios = document.getElementById("lista-usuarios");
  listaUsuarios.innerHTML = "";
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = `${index + 1}º - ${item.nome} - ${item.pontos} point(s) - ${item.dataHora}`;
    listaUsuarios.appendChild(li);
  });

  // Alterna visibilidade
  document.getElementById("resultado").style.display = "none"; // esconde resultado final
  document.getElementById("usuarios-container").style.display = "block"; // mostra lista de usuários
}


function voltarInicio() {
  window.location.href = "index.html";
}


function mostrarRanking() {
  const lista = document.getElementById("ranking");
  lista.innerHTML = "";
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.slice(0, 10).forEach((item, index) => {
    const li = document.createElement("li");
    const posicao = `${index + 1}º`;

    let medalha = "";
    let cor = "";

    if (index === 0) {
      medalha = "🥇";
      cor = "#d4af37";
    } else if (index === 1) {
      medalha = "🥈";
      cor = "#c0c0c0";
    } else if (index === 2) {
      medalha = "🥉";
      cor = "#cd7f32";
    }

    if (medalha) {
      li.innerHTML = `${medalha} ${posicao} - <strong>${item.nome}</strong> - ${item.pontos} point(s)`;
      li.style.color = cor;
    } else {
      li.innerText = `${posicao} - ${item.nome} - ${item.pontos} point(s)`;
    }

    lista.appendChild(li);
  });
}


function zerarRanking() {
  localStorage.removeItem("ranking");
  alert("Ranking Reset!");
  mostrarRanking(); // Atualiza a tela após zerar
}

function zerarUsuarios() {
  localStorage.removeItem("usuarios");
  alert("Lista de usuários resetada!");
  mostrarUsuarios(); // Atualiza a tela após zerar
}
