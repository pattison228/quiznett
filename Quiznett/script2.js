
const questions = [
    {
        question: "Hvilket spill ble laget av Mojang?",
        answers: [
            "Roblox",
            "Minecraft",
            "Fortnite",
            "Terraria"
        ],
        correct: 1
    },
    {
        question: "Hvilket spill har Battle Royale-modus?",
        answers: [
            "Fortnite",
            "The Sims 4",
            "FIFA",
            "GTA V"
        ],
        correct: 0
    },
    {
        question: "Hva heter hovedfiguren i Minecraft?",
        answers: [
            "Alex",
            "Herobrine",
            "Steve",
            "Enderman"
        ],
        correct: 2
    },
    {
        question: "Hvilket selskap laget Fortnite?",
        answers: [
            "Valve",
            "Epic Games",
            "Mojang",
            "Ubisoft"
        ],
        correct: 1
    },
    {
        question: "Hvilket spill er kjent for klosser og bygging?",
        answers: [
            "Roblox",
            "Terraria",
            "Minecraft",
            "Valorant"
        ],
        correct: 2
    },
    {
        question: "Hva betyr FPS i spill?",
        answers: [
            "First Person Shooter",
            "Fast Playing Server",
            "Final Player Score",
            "Full Power System"
        ],
        correct: 0
    },
    {
        question: "I hvilket spill finner du kartet Dust 2?",
        answers: [
            "Fortnite",
            "Valorant",
            "Counter-Strike 2",
            "Overwatch"
        ],
        correct: 2
    },
    {
        question: "Hvilken farge viser ofte den høyeste sjeldenheten på en gjenstand?",
        answers: [
            "Grå",
            "Grønn",
            "Blå",
            "Gull"
        ],
        correct: 3
    },
    {
        question: "Hva heter fotballspillet fra EA?",
        answers: [
            "Rocket League",
            "EA FC",
            "NBA 2K",
            "Madden NFL"
        ],
        correct: 1
    },
    {
        question: "Hvilket spill har figuren Creeper?",
        answers: [
            "Roblox",
            "Minecraft",
            "Terraria",
            "Fortnite"
        ],
        correct: 1
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
        message = "du kan er god i spill:)";
    } else if (score >= 7) {
        message = "du kan en del om videospill";
    } else if (score >= 4) {
        message = "du suger bra nok";
    } else {
        message = "du suger:(";
    }

    document.getElementById("result-message").textContent = message;
}
