const questions = [
    {
        question: "Hva er hovedstaden i Norge?",
        answers: [
            "Bergen",
            "Trondheim",
            "Oslo",
            "Stavanger"
        ],
        correct: 2
    },
    {
        question: "Hvilket land er størst i verden?",
        answers: [
            "USA",
            "Kina",
            "Russland",
            "Canada"
        ],
        correct: 2
    },
    {
        question: "Hvilket hav ligger mellom Europa og Amerika?",
        answers: [
            "Atlanterhavet",
            "Stillehavet",
            "Indiahavet",
            "Polhavet"
        ],
        correct: 0
    },
    {
        question: "Hvilket land har formen av en støvel?",
        answers: [
            "Spania",
            "Italia",
            "Frankrike",
            "Hellas"
        ],
        correct: 1
    },
    {
        question: "Hva er verdens høyeste fjell?",
        answers: [
            "Kilimanjaro",
            "Elbrus",
            "Mont Blanc",
            "Mount Everest"
        ],
        correct: 3
    },
    {
        question: "Hvilken elv er lengst?",
        answers: [
            "Nilen",
            "Glomma",
            "Rhinen",
            "Themsen"
        ],
        correct: 0
    },
    {
        question: "Hvilket kontinent ligger Egypt i?",
        answers: [
            "Europa",
            "Afrika",
            "Asia",
            "Sør-Amerika"
        ],
        correct: 1
    },
    {
        question: "Hva er hovedstaden i Sverige?",
        answers: [
            "Göteborg",
            "Malmö",
            "Stockholm",
            "Uppsala"
        ],
        correct: 2
    },
    {
        question: "Hvilket land er kjent for pyramidene?",
        answers: [
            "Egypt",
            "Mexico",
            "India",
            "Peru"
        ],
        correct: 0
    },
    {
        question: "Hvilket kontinent er størst?",
        answers: [
            "Europa",
            "Afrika",
            "Nord-Amerika",
            "Asia"
        ],
        correct: 3
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionNumber = document.getElementById("question-number");
const scoreText = document.getElementById("score");
const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestion = 0;
let score = 0;
let answered = false;

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Spørsmål ${currentQuestion + 1} av ${questions.length}`;

    scoreText.textContent = `Poeng: ${score}`;
    questionText.textContent = q.question;

    progress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    answersDiv.innerHTML = "";
    feedback.textContent = "";
    nextBtn.classList.add("hidden");

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-btn";

        button.addEventListener("click", () => checkAnswer(index));

        answersDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const buttons = answersDiv.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.correct) {
            button.classList.add("correct");
        }

        if (index === selected && index !== q.correct) {
            button.classList.add("wrong");
        }
    });

    if (selected === q.correct) {
        score++;
        feedback.textContent = "Good boy, honey";
    } else {
        feedback.textContent =
            `Du er en idiot, Riktig svar er: ${q.answers[q.correct]}`;
    }

    scoreText.textContent = `Poeng: ${score}`;
    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Se resultat "
            : "Neste spørsmål →";

    nextBtn.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    document.getElementById("final-score").textContent =
        `Du fikk ${score} av ${questions.length} poeng!`;

    let message;

    if (score === 10) {
        message = "du kan er god i geografi:)";
    } else if (score >= 7) {
        message = "du kan en del om geografi";
    } else if (score >= 4) {
        message = "du suger bra nok";
    } else {
        message = "du suger:(";
    }

    document.getElementById("result-message").textContent = message;
}
