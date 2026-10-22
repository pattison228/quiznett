
const questions = [
    {
        question: "Hva står CPU for?",
        answers: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Power Unit"
        ],
        correct: 0
    },
    {
        question: "Hva brukes RAM til?",
        answers: [
            "Å lagre filer permanent",
            "Midlertidig lagring av data",
            "Å vise bilder på skjermen",
            "Å koble PC-en til strøm"
        ],
        correct: 1
    },
    {
        question: "Hva brukes en SSD til?",
        answers: [
            "Å kjøle ned datamaskinen",
            "Å koble til internett",
            "Å lagre filer og programmer",
            "Å behandle grafikk"
        ],
        correct: 2
    },
    {
        question: "Hva gjør en ruter (router)?",
        answers: [
            "Skriver ut dokumenter",
            "Lader datamaskinen",
            "Spiller av lyd",
            "Sender data mellom nettverk"
        ],
        correct: 3
    },
    {
        question: "Hva betyr Wi-Fi?",
        answers: [
            "En trådløs nettverksteknologi",
            "Et dataprogram",
            "En type prosessor",
            "Et operativsystem"
        ],
        correct: 0
    },
    {
        question: "Hva er phishing?",
        answers: [
            "En metode for å øke internettfarten",
            "Et forsøk på å lure til seg informasjon",
            "Et antivirusprogram",
            "En type datakabel"
        ],
        correct: 1
    },
    {
        question: "Hva gjør et operativsystem?",
        answers: [
            "Lagrer bare bilder",
            "Gir strøm til PC-en",
            "Styrer datamaskinens funksjoner",
            "Forbedrer Wi-Fi-signalet"
        ],
        correct: 2
    },
    {
        question: "Hva brukes HTML til?",
        answers: [
            "Å reparere maskinvare",
            "Å beskytte mot virus",
            "Å koble sammen nettverk",
            "Å strukturere innhold på nettsider"
        ],
        correct: 3
    },
    {
        question: "Hva er et sterkt passord?",
        answers: [
            "12345678",
            "Et langt og unikt passord",
            "Fornavnet ditt",
            "Passordet ditt på alle nettsider"
        ],
        correct: 1
    },
    {
        question: "Hva er en IP-adresse?",
        answers: [
            "En adresse som identifiserer en enhet på et nettverk",
            "Et program for å skrive tekst",
            "En type skjerm",
            "Et passord til datamaskinen"
        ],
        correct: 0
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
        message = "du kan mer en Leiv:)";
    } else if (score >= 7) {
        message = "du kan en del om IT";
    } else if (score >= 4) {
        message = "du suger bra nok";
    } else {
        message = "du suger:(";
    }

    document.getElementById("result-message").textContent = message;
}
