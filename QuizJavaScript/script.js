const btnIniciar = document.getElementById("btn-iniciar");
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaResult = document.getElementById("tela-resultado");
const telaRanking = document.getElementById("tela-ranking");
const btnRanking = document.getElementById("btn-ir-ranking");
const listaRanking = document.getElementById("lista-ranking");
const btnReiniciar = document.getElementById("btn-reiniciar");
const txtPergunta = document.getElementById("texto-pergunta");
const notaFinal = document.getElementById("nota-final");
const botoesResposta = document.querySelectorAll(".btn-resposta");
const txtPontuacao = document.getElementById("valor-pontuacao");
const txtTempo = document.getElementById("valor-tempo");

let nomes = [];
let pontos = [];

let cont = 0;
let prox = 0;

let respostaSelecionada = null;

let tempo = 30;
let intervalo;

const perguntas = [
  {
    pergunta: "Qual tag serve para criar parágrafos no HTML?",

    respostas: ["<p>", "<h1>", "<img>", "<header>"],

    correta: "<p>",
  },

  {
    pergunta:
      "Qual linguagem é responsável pela interatividade das páginas web?",

    respostas: ["HTML", "CSS", "JavaScript", "PHP"],

    correta: "JavaScript",
  },

  {
    pergunta: "Qual comando mostra uma mensagem no navegador?",

    respostas: ["print()", "alert()", "message()", "console()"],

    correta: "alert()",
  },
];

botoesResposta.forEach(function (botao) {
  botao.addEventListener("click", function () {
    botoesResposta.forEach(function (botaoResposta) {
      botaoResposta.classList.remove("selecionada");
    });

    botao.classList.add("selecionada");

    respostaSelecionada = botao.textContent;
  });
});

btnIniciar.setAttribute("onclick", "iniciar()");

function iniciar() {
  const input = document.getElementById("input-nome");

  const text = input.value.trim();

  if (text === "") {
    alert("Digite seu nome!");

    return;
  }

  nomes[cont] = text;

  pontos[cont] = 0;

  prox = 0;

  respostaSelecionada = null;

  telaInicial.classList.add("hidden");

  telaJogo.classList.remove("hidden");

  txtPergunta.innerHTML = perguntas[prox].pergunta;
  mostrarRespostas();

  txtPontuacao.textContent = pontos[cont];
  iniciarTemporizador();

  input.value = "";
}

function iniciarTemporizador() {
  clearInterval(intervalo);

  tempo = 30;

  txtTempo.textContent = tempo + "s";

  intervalo = setInterval(function () {
    tempo--;

    txtTempo.textContent = tempo + "s";

    if (tempo <= 0) {
      clearInterval(intervalo);

      proximo();
    }
  }, 1000);
}


function proximo() {

    if (respostaSelecionada !== null) {

        if (respostaSelecionada === perguntas[prox].correta) {

            pontos[cont]++;

            txtPontuacao.textContent = pontos[cont];

        }

    }

    prox++;


    if (prox < perguntas.length) {

        txtPergunta.innerHTML = perguntas[prox].pergunta;

        mostrarRespostas();

        respostaSelecionada = null;


        botoesResposta.forEach(function(botao) {

            botao.classList.remove("selecionada");

        });


        iniciarTemporizador();

    } 
    
    else {

        clearInterval(intervalo);

        telaJogo.classList.add("hidden");

        telaResult.classList.remove("hidden");

        notaFinal.textContent = pontos[cont];

    }

}
  
btnRanking.addEventListener("click", function () {
  telaResult.classList.add("hidden");

  telaRanking.classList.remove("hidden");

  mostrarRanking();
});

function mostrarRanking() {

  listaRanking.innerHTML = "";

  let ranking = [];

  for (let i = 0; i < nomes.length; i++) {

    ranking.push({
      nome: nomes[i],
      pontos: pontos[i]
    });

  }

  ranking.sort(function(a, b) {
    return b.pontos - a.pontos;
  });


  for (let i = 0; i < ranking.length; i++) {

    const item = document.createElement("div");

    item.classList.add("ranking-item");

    item.innerHTML = `
      <span>${i + 1}º ${ranking[i].nome}</span>

      <span class="score">
        ${ranking[i].pontos}
      </span>
    `;

    listaRanking.appendChild(item);

  }

}
btnReiniciar.addEventListener("click", function () {
  telaRanking.classList.add("hidden");

  telaInicial.classList.remove("hidden");

  cont++;
});

function mostrarRespostas() {
  botoesResposta.forEach(function (botao, indice) {
    botao.textContent = perguntas[prox].respostas[indice];
  });
}
