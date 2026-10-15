/**
 * IKI'S ARQUITETURA
 * Script de Lógica do Quiz com Alternativas Diversificadas (A, B, C, D)
 */

// 5 Perguntas completas e diversificadas baseadas nos arquivos
const quizData = [
  {
    pergunta: "1. De acordo com o Estudo de Marca, qual é o objetivo central da empresa?",
    opcoes: [
      { letra: "A", texto: "Fazer projetos para todos os tipos de clientes, inclusive quem tem menos dinheiro, com preços mais baixos e sem perder a qualidade.", correta: true },
      { letra: "B", texto: "Priorizar unicamente clientes corporativos de alto poder aquisitivo para maximizar o lucro a curto prazo.", correta: false },
      { letra: "C", texto: "Fornecer apenas consultorias gratuitas sem manter estrutura ou organização empresarial.", correta: false },
      { letra: "D", texto: "Comercializar materiais de construção de baixo custo sem desenvolvimento de projetos arquitetônicos.", correta: false }
    ],
    explicacao: "Correto! O estudo de marca destaca que a empresa quer ajudar as pessoas e ter lucro, democratizando o acesso à arquitetura sem perder a qualidade."
  },
  {
    pergunta: "2. Como a empresa equilibra a sua operação financeira para atender públicos de diferentes rendas?",
    opcoes: [
      { letra: "A", texto: "Dependendo de subsídios governamentais e doações de ONGs internacionais.", correta: false },
      { letra: "B", texto: "Ganhando mais nos projetos mais caros e menos nos mais acessíveis para equilibrar as contas e ajudar mais pessoas.", correta: true },
      { letra: "C", texto: "Cobrando o mesmo valor fixo elevado de todos os clientes, independentemente da renda.", correta: false },
      { letra: "D", texto: "Eliminando plantas técnicas e o suporte do arquiteto nos projetos mais baratos.", correta: false }
    ],
    explicacao: "Exato! Ganhando mais nos projetos de maior porte, a empresa consegue cobrar valores acessíveis nos projetos menores e manter a saúde financeira."
  },
  {
    pergunta: "3. No problema econômico com orçamento de R$ 700,00, qual é a decisão correta e por quê?",
    opcoes: [
      { letra: "A", texto: "Produzir o Produto B, pois custa R$ 800,00 e agrega mais valor, mesmo gerando endividamento.", correta: false },
      { letra: "B", texto: "Dividir o orçamento para tentar produzir ambos os produtos pela metade.", correta: false },
      { letra: "C", texto: "Produzir o Produto A, porque ele custa R$ 600,00 e está dentro do orçamento de R$ 700,00, respeitando a escassez.", correta: true },
      { letra: "D", texto: "Não produzir nenhum produto até conseguir um orçamento de R$ 1.500,00.", correta: false }
    ],
    explicacao: "Muito bem! Isso demonstra a escassez: a empresa precisa escolher com sabedoria o que produzir com o dinheiro limitado."
  },
  {
    pergunta: "4. Sobre a procura e escassez, por que a empresa adota a ideia de 'vagas limitadas'?",
    opcoes: [
      { letra: "A", texto: "Para aumentar o interesse, planejar melhor o uso dos recursos e equilibrar ajuda social com os ganhos da empresa.", correta: true },
      { letra: "B", texto: "Para impedir que novos clientes consigam contratar os serviços de arquitetura.", correta: false },
      { letra: "C", texto: "Apenas para fechar o escritório durante a maior parte do ano.", correta: false },
      { letra: "D", texto: "Porque a equipe não utiliza cronogramas ou gestão de prazos.", correta: false }
    ],
    explicacao: "Perfeito! A escassez exige planejamento e uso consciente dos recursos. As vagas limitadas organizam a capacidade produtiva e valorizam a entrega."
  },
  {
    pergunta: "5. Quais são os cargos e as atribuições dos membros da equipe?",
    opcoes: [
      { letra: "A", texto: "Três arquitetos que desempenham exatamente as mesmas funções de desenho sem divisão de tarefas.", correta: false },
      { letra: "B", texto: "Kevelin Dobinski (Arquiteto), Isabella de Lima (Gerenciador de Projeto) e Isabele dos Anjos (Analista de Marketing Digital).", correta: true },
      { letra: "C", texto: "Kevelin na administração geral, Isabella no marketing de vendas e Isabele na obra civil.", correta: false },
      { letra: "D", texto: "Dois consultores financeiros e apenas uma desenhista terceirizada.", correta: false }
    ],
    explicacao: "Correto! A equipe é multidisciplinar: Kevelin cuida do projeto arquitetônico, Isabella gerencia prazos/custos e Isabele conduz o marketing digital."
  }
];

let quizCurrentIndex = 0;
let quizScore = 0;
let isAnswered = false;

function carregarQuestaoQuiz() {
  isAnswered = false;
  const current = quizData[quizCurrentIndex];

  const counterEl = document.getElementById('quizCounterDisplay');
  const scoreEl = document.getElementById('quizScoreDisplay');
  const titleEl = document.getElementById('quizQuestionTitle');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const feedbackBanner = document.getElementById('quizFeedbackBanner');
  const btnNext = document.getElementById('btnNextQuiz');
  const progressBar = document.getElementById('quizProgressBar');

  if (!titleEl || !optionsContainer) return;

  counterEl.textContent = `Pergunta ${quizCurrentIndex + 1} de ${quizData.length}`;
  scoreEl.textContent = quizScore;
  progressBar.style.width = `${((quizCurrentIndex + 1) / quizData.length) * 100}%`;

  titleEl.textContent = current.pergunta;
  optionsContainer.innerHTML = '';
  feedbackBanner.className = 'quiz-feedback-banner';
  feedbackBanner.style.display = 'none';
  feedbackBanner.textContent = '';
  btnNext.style.display = 'none';

  current.opcoes.forEach((opcao, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-button';
    btn.innerHTML = `
      <span class="option-letter">${opcao.letra}</span>
      <span class="option-text">${opcao.texto}</span>
      <i class="fa-regular fa-circle option-icon"></i>
    `;
    btn.onclick = () => responderQuestao(idx, btn);
    optionsContainer.appendChild(btn);
  });
}

function responderQuestao(index, botaoClicado) {
  if (isAnswered) return;
  isAnswered = true;

  const current = quizData[quizCurrentIndex];
  const allOptionBtns = document.querySelectorAll('.quiz-option-button');
  const feedbackBanner = document.getElementById('quizFeedbackBanner');
  const btnNext = document.getElementById('btnNextQuiz');
  const scoreEl = document.getElementById('quizScoreDisplay');

  const opcaoEscolhida = current.opcoes[index];

  allOptionBtns.forEach(b => b.disabled = true);

  if (opcaoEscolhida.correta) {
    quizScore++;
    scoreEl.textContent = quizScore;
    botaoClicado.classList.add('correct');
    const icon = botaoClicado.querySelector('.option-icon');
    if (icon) icon.className = 'fa-solid fa-circle-check option-icon';
    feedbackBanner.className = 'quiz-feedback-banner correct';
    feedbackBanner.innerHTML = `<strong><i class="fa-solid fa-check"></i> Resposta Correta!</strong><br>${current.explicacao}`;
  } else {
    botaoClicado.classList.add('wrong');
    const icon = botaoClicado.querySelector('.option-icon');
    if (icon) icon.className = 'fa-solid fa-circle-xmark option-icon';

    current.opcoes.forEach((op, i) => {
      if (op.correta) {
        allOptionBtns[i].classList.add('correct');
        const correctIcon = allOptionBtns[i].querySelector('.option-icon');
        if (correctIcon) correctIcon.className = 'fa-solid fa-circle-check option-icon';
      }
    });

    feedbackBanner.className = 'quiz-feedback-banner wrong';
    feedbackBanner.innerHTML = `<strong><i class="fa-solid fa-xmark"></i> Resposta Incorreta.</strong><br>${current.explicacao}`;
  }

  feedbackBanner.style.display = 'block';

  if (quizCurrentIndex === quizData.length - 1) {
    btnNext.innerHTML = 'Ver Resultado Final <i class="fa-solid fa-trophy"></i>';
  } else {
    btnNext.innerHTML = 'Próxima Pergunta <i class="fa-solid fa-arrow-right"></i>';
  }
  btnNext.style.display = 'inline-flex';
}

function avancarQuiz() {
  if (quizCurrentIndex < quizData.length - 1) {
    quizCurrentIndex++;
    carregarQuestaoQuiz();
  } else {
    concluirQuiz();
  }
}

function concluirQuiz() {
  document.getElementById('quizQuestionBox').style.display = 'none';
  const finalScreen = document.getElementById('quizResultFinal');
  finalScreen.style.display = 'block';

  document.getElementById('scoreDisplayHuge').textContent = `${quizScore} / ${quizData.length}`;

  const heading = document.getElementById('quizResultHeading');
  const text = document.getElementById('quizResultText');

  if (quizScore === 5) {
    heading.textContent = 'Excelente! 100% de Aproveitamento!';
    text.textContent = 'Você compreendeu com precisão total o estudo de marca, a visão social, a tomada de decisão sob escassez e o papel de cada profissional da empresa!';
  } else if (quizScore >= 3) {
    heading.textContent = 'Muito Bom Desempenho!';
    text.textContent = 'Você absorveu a maioria dos conceitos fundamentais de equilíbrio financeiro, impacto social e gestão da empresa.';
  } else {
    heading.textContent = 'Vale a pena revisar!';
    text.textContent = 'Dê uma olhada rápida nas seções de Estudo de Marca e Economia acima para fixar os pontos principais e refaça o quiz!';
  }
}

function reiniciarQuizCompleto() {
  quizCurrentIndex = 0;
  quizScore = 0;
  document.getElementById('quizResultFinal').style.display = 'none';
  document.getElementById('quizQuestionBox').style.display = 'block';
  carregarQuestaoQuiz();
}

// Simulador de Orçamento
function atualizarSimulador() {
  const range = document.getElementById('simAreaRange');
  const display = document.getElementById('simAreaDisplay');
  const modalidade = document.getElementById('simModalidade')?.value || 'social';
  const precoFinal = document.getElementById('simPrecoFinal');
  const nota = document.getElementById('simNota');

  if (!range || !precoFinal) return;

  const area = parseInt(range.value, 10);
  display.textContent = `${area} m²`;

  let preco = 0;
  if (modalidade === 'social') {
    preco = 600;
    if (area > 50) preco += (area - 50) * 3;
    nota.textContent = 'Plano Acessível • Projetado para caber no orçamento de R$ 700,00.';
  } else {
    preco = 1600 + (area * 20);
    nota.textContent = 'Linha Premium • Projeto integral com 3D que apoia o modelo social.';
  }

  precoFinal.textContent = preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function enviarSimulacaoZap() {
  const areaVal = document.getElementById('simAreaRange')?.value || '45';
  const preco = document.getElementById('simPrecoFinal')?.textContent || 'R$ 600,00';
  const modEl = document.getElementById('simModalidade');
  const modText = modEl ? modEl.options[modEl.selectedIndex].text : 'Linha Acessível';

  const texto = `Olá, Equipe IKI'S Arquitetura! Realizei uma simulação:\n- Modalidade: ${modText}\n- Área: ${areaVal} m²\n- Estimativa: ${preco}\n\nGostaria de mais informações!`;
  window.open(`https://wa.me/5541999998888?text=${encodeURIComponent(texto)}`, '_blank');
}

// Contato
function enviarMensagemContato(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSubmitContact');
  const msg = document.getElementById('contactSuccessMsg');

  btn.innerHTML = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = 'Mensagem Enviada';
    msg.style.display = 'block';
    document.getElementById('cleanContactForm')?.reset();
  }, 700);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Garante a exibição do nome da empresa na barra de endereços (URL)
  if (window.location.protocol.startsWith('http') && !window.location.pathname.includes('ikis-arquitetura')) {
    try {
      window.history.replaceState(null, '', '/ikis-arquitetura');
    } catch (e) {
      console.log(e);
    }
  }

  carregarQuestaoQuiz();
  atualizarSimulador();
});

