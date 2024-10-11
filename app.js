let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let progress = 0;
let memoryCards = [];
let flippedCards = [];

// Quiz starten
function startQuiz() {
  currentQuiz = generateQuiz();
  currentIndex = 0;
  score = 0;
  progress = 0;
  displayQuestion();
}

// Quizfragen generieren
function generateQuiz() {
  return [
    { question: "Was ist die Hauptstadt von Frankreich?", answers: ["Paris", "London", "Berlin"], correct: "Paris" },
    { question: "Wie viele Planeten hat unser Sonnensystem?", answers: ["7", "8", "9"], correct: "8" },
    { question: "Wer hat die Relativitätstheorie entwickelt?", answers: ["Newton", "Einstein", "Galileo"], correct: "Einstein" }
  ];
}

// Nächste Frage anzeigen
function displayQuestion() {
  if (currentIndex < currentQuiz.length) {
    const quiz = currentQuiz[currentIndex];
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
      <h2 class="quiz-question">${quiz.question}</h2>
      ${quiz.answers.map(answer => `<button class="answer-button" onclick="checkAnswer('${answer}')">${answer}</button>`).join('')}
    `;
  } else {
    showResult();
  }
}

// Antwort überprüfen
function checkAnswer(answer) {
  if (answer === currentQuiz[currentIndex].correct) {
    score++;
  }
  currentIndex++;
  progress += 100 / currentQuiz.length;
  updateProgress();
  displayQuestion();
}

// Ergebnis anzeigen
function showResult() {
  const gameArea = document.getElementById('gameArea');
  gameArea.innerHTML = `<h2>Du hast ${score} von ${currentQuiz.length} Fragen richtig beantwortet!</h2>`;
}

// Fortschrittsbalken aktualisieren
function updateProgress() {
  const progressBarFill = document.getElementById('progress-bar-fill');
  progressBarFill.style.width = progress + '%';
}

// Fortschritt anzeigen
function viewProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  progressBar.innerHTML = '<div id="progress-bar-fill"></div>';
  const progressSection = document.getElementById('progress');
  progressSection.classList.remove('hidden');
  progressSection.innerHTML = '<h2>Dein Fortschritt:</h2>';
  progressSection.appendChild(progressBar);
  updateProgress();
}

// Memory-Spiel starten
function startMemory() {
  memoryCards = generateMemoryCards();
  flippedCards = [];
  displayMemoryCards();
}

// Memory-Karten generieren
function generateMemoryCards() {
  const symbols = ['🌟', '🌍', '🎯', '⚡', '🔥', '💧'];
  const cards = [...symbols, ...symbols]; // Paare bilden
  return shuffleArray(cards);
}

// Memory-Karten anzeigen
function displayMemoryCards() {
  const gameArea = document.getElementById('gameArea');
  gameArea.innerHTML = `<div class="memory-grid"></div>`;
  const memoryGrid = gameArea.querySelector('.memory-grid');

  memoryCards.forEach((symbol, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('memory-card');
    cardElement.dataset.symbol = symbol;
    cardElement.dataset.index = index;
    cardElement.innerHTML = '?';
    cardElement.addEventListener('click', flipCard);
    memoryGrid.appendChild(cardElement);
  });
}

// Karte umdrehen
function flipCard(event) {
  const cardElement = event.target;
  const index = cardElement.dataset.index;

  if (flippedCards.length < 2 && !flippedCards.includes(index)) {
    cardElement.innerHTML = cardElement.dataset.symbol;
    cardElement.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Karten vergleichen
function checkMatch() {
  const [firstIndex, secondIndex] = flippedCards;
  const firstCard = document.querySelector(`.memory-card[data-index="${firstIndex}"]`);
  const secondCard = document.querySelector(`.memory-card[data-index="${secondIndex}"]`);

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.style.visibility = 'hidden';
    secondCard.style.visibility = 'hidden';
  } else {
    firstCard.innerHTML = '?';
    secondCard.innerHTML = '?';
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
  }

  flippedCards = [];
}

// Array mischen
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
