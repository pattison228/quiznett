
const questions = [
    {
        question: "Hvilken filmserie handler om en ung trollmann?",
        answers: [
            "Star Wars",
            "Harry Potter",
            "Avatar",
            "Marvel"
        ],
        correct: 1
    },
    {
        question: "Hvem er Iron Man?",
        answers: [
            "Tony Stark",
            "Steve Rogers",
            "Bruce Banner",
            "Thor"
        ],
        correct: 0
    },
    {
        question: "Hvilken film har blå mennesker på en annen planet?",
        answers: [
            "Titanic",
            "Dune",
            "Avatar",
            "Interstellar"
        ],
        correct: 2
    },
    {
        question: "Hva heter skipet i filmen Titanic?",
        answers: [
            "Olympic",
            "Britannic",
            "Queen Mary",
            "Titanic"
        ],
        correct: 3
    },
    {
        question: "Hvilket selskap laget filmen Frost?",
        answers: [
            "Disney",
            "Pixar",
            "DreamWorks",
            "Sony"
        ],
        correct: 0
    },
    {
        question: "Hvem er kjent som The Dark Knight?",
        answers: [
            "Spider-Man",
            "Batman",
            "Superman",
            "Hulk"
        ],
        correct: 1
    },
    {
        question: "Hvilken filmserie inneholder Darth Vader?",
        answers: [
            "Star Trek",
            "Harry Potter",
            "Dune",
            "Star Wars"
        ],
        correct: 3
    },
    {
        question: "Hva heter den grønne kjempen i Marvel?",
        answers: [
            "Thor",
            "Loki",
            "Hulk",
            "Groot"
        ],
        correct: 2
    },
    {
        question: "Hvilken film handler om dinosaurer i en fornøyelsespark?",
        answers: [
            "Godzilla",
            "Jurassic Park",
            "King Kong",
            "Rampage"
        ],
        correct: 1
    },
    {
        question: "Hvilket dyr er Simba i Løvenes Konge?",
        answers: [
            "Tiger",
            "Løve",
            "Ulv",
            "Gepard"
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
        message = "du kan er god i filmer:)";
    } else if (score >= 7) {
        message = "du kan en del om filmer";
    } else if (score >= 4) {
        message = "du suger bra nok";
    } else {
        message = "du suger:(";
    }

    document.getElementById("result-message").textContent = message;
}
