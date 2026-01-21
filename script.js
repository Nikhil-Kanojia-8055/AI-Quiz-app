const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer: 0 },
    { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: 0 },
    { question: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Lion", "Elephant", "Giraffe"], answer: 1 },
    { question: "What year did World War II end?", options: ["1944", "1945", "1946", "1947"], answer: 1 },
    { question: "Which programming language is known for web development?", options: ["Python", "JavaScript", "C++", "Java"], answer: 1 },
    { question: "What is the square root of 16?", options: ["2", "4", "6", "8"], answer: 1 },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], answer: 2 },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: 2 },
    { question: "Which country has the most natural lakes?", options: ["Canada", "Russia", "Finland", "USA"], answer: 0 },
    { question: "What is the currency of Japan?", options: ["Won", "Yen", "Ringgit", "Baht"], answer: 1 },
    { question: "Who discovered penicillin?", options: ["Fleming", "Pasteur", "Darwin", "Einstein"], answer: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let results = []; // Track correct/incorrect per question

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const progressFill = document.getElementById('progress-fill');
const scoreDisplay = document.getElementById('score-display');
const finalScoreEl = document.getElementById('final-score');

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
        option.addEventListener('click', () => checkAnswer(index));
    });
    feedbackEl.classList.add('hidden');
    updateProgress();
    updateScoreDisplay();
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.disabled = true);

    const isCorrect = selectedIndex === currentQuestion.answer;
    results.push(isCorrect ? 1 : 0); // 1 for correct, 0 for incorrect

    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        feedbackEl.textContent = "Correct! AI thinks you're smart.";
        feedbackEl.classList.add('correct-feedback');
        score++;
        createConfetti();
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[currentQuestion.answer].classList.add('correct');
        feedbackEl.textContent = "Incorrect. AI suggests studying more!";
        feedbackEl.classList.add('incorrect-feedback');
    }

    feedbackEl.classList.remove('hidden');
    updateScoreDisplay();
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showEndScreen();
        }
    }, 2000);
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}/${currentQuestionIndex + 1}`;
}

function createConfetti() {
    for (let i = 0; i = 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function showEndScreen() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreEl.textContent = `Your final score: ${score}/${questions.length}. AI rates you: ${score > questions.length / 2 ? 'Genius!' : 'Keep trying!'}`;
    renderGraph();
}

function renderGraph() {
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: questions.map((_, i) => `Q${i + 1}`),
            datasets: [{
                label: 'Performance (1=Correct, 0=Incorrect)',
                data: results,
                backgroundColor: results.map(r => r ? '#4ecdc4' : '#ff6b6b'),
                borderColor: '#333',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 1 }
            }
        }
    });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    results = [];
    endScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}
