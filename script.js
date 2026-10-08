/* =====================================================
   NEON MATH
   JOGO DE MATEMÁTICA - 6º ANO
===================================================== */


/* =====================================================
   PERGUNTAS
===================================================== */

const questions = [

    {
        category: "OPERAÇÕES",
        icon: "＋",

        question: "Qual é o resultado de 48 ÷ 6?",

        answers: [
            "6",
            "7",
            "8",
            "9"
        ],

        correct: 2
    },

    {
        category: "NÚMEROS",
        icon: "✦",

        question: "Qual é o resultado de 25 + 37?",

        answers: [
            "52",
            "62",
            "72",
            "57"
        ],

        correct: 1
    },

    {
        category: "MULTIPLICAÇÃO",
        icon: "×",

        question: "Quanto é 9 × 7?",

        answers: [
            "54",
            "63",
            "72",
            "67"
        ],

        correct: 1
    },

    {
        category: "FRAÇÕES",
        icon: "½",

        question: "Qual destas frações representa a metade de um inteiro?",

        answers: [
            "1/3",
            "1/4",
            "1/2",
            "2/3"
        ],

        correct: 2
    },

    {
        category: "PORCENTAGEM",
        icon: "%",

        question: "Quanto é 10% de 100?",

        answers: [
            "1",
            "5",
            "10",
            "20"
        ],

        correct: 2
    },

    {
        category: "GEOMETRIA",
        icon: "△",

        question: "Quantos lados possui um hexágono?",

        answers: [
            "4",
            "5",
            "6",
            "8"
        ],

        correct: 2
    },

    {
        category: "EXPRESSÕES",
        icon: "∑",

        question: "Qual é o resultado de 5 + 3 × 2?",

        answers: [
            "16",
            "11",
            "13",
            "10"
        ],

        correct: 1
    },

    {
        category: "GEOMETRIA",
        icon: "□",

        question: "Um quadrado possui lados de 5 cm. Qual é o seu perímetro?",

        answers: [
            "10 cm",
            "15 cm",
            "20 cm",
            "25 cm"
        ],

        correct: 2
    },

    {
        category: "NÚMEROS INTEIROS",
        icon: "−",

        question: "Qual destes números é o maior?",

        answers: [
            "-5",
            "-2",
            "-8",
            "-10"
        ],

        correct: 1
    },

    {
        category: "DESAFIO FINAL",
        icon: "★",

        question:
            "Uma caixa possui 6 fileiras com 8 objetos em cada uma. Quantos objetos há ao todo?",

        answers: [
            "42",
            "48",
            "54",
            "56"
        ],

        correct: 1
    }

];


/* =====================================================
   ELEMENTOS
===================================================== */

const homeScreen =
    document.getElementById("homeScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");


const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


const questionElement =
    document.getElementById("question");

const categoryElement =
    document.getElementById("category");

const questionIcon =
    document.getElementById("questionIcon");

const answersElement =
    document.getElementById("answers");


const scoreElement =
    document.getElementById("score");

const livesElement =
    document.getElementById("lives");

const comboElement =
    document.getElementById("combo");

const finalComboElement =
    document.getElementById("finalCombo");


const timerElement =
    document.getElementById("timer");

const timer =
    document.querySelector(".timer");


const feedbackElement =
    document.getElementById("feedback");


const questionNumberElement =
    document.getElementById("questionNumber");

const totalQuestionsElement =
    document.getElementById("totalQuestions");


const progressElement =
    document.getElementById("progress");


const finalScoreElement =
    document.getElementById("finalScore");

const correctAnswersElement =
    document.getElementById("correctAnswers");

const wrongAnswersElement =
    document.getElementById("wrongAnswers");


const resultTitleElement =
    document.getElementById("resultTitle");

const resultMessageElement =
    document.getElementById("resultMessage");


/* =====================================================
   ESTADO DO JOGO
===================================================== */

let currentQuestion = 0;

let score = 0;

let lives = 3;

let combo = 0;

let bestCombo = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let timeLeft = 15;

let timerInterval;

let locked = false;


totalQuestionsElement.textContent =
    questions.length;


/* =====================================================
   COMEÇAR
===================================================== */

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);


function startGame() {

    currentQuestion = 0;

    score = 0;

    lives = 3;

    combo = 0;

    bestCombo = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    locked = false;

    updateInterface();

    showScreen(gameScreen);

    loadQuestion();
}


/* =====================================================
   TROCA DE TELA
===================================================== */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });

    screen.classList.add("active");
}


/* =====================================================
   CARREGAR PERGUNTA
===================================================== */

function loadQuestion() {

    clearInterval(timerInterval);

    locked = false;

    const data =
        questions[currentQuestion];


    categoryElement.textContent =
        data.category;


    questionIcon.textContent =
        data.icon;


    questionElement.textContent =
        data.question;


    questionNumberElement.textContent =
        currentQuestion + 1;


    progressElement.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    feedbackElement.textContent = "";

    feedbackElement.className =
        "feedback";


    answersElement.innerHTML = "";


    data.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-button";

            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => checkAnswer(index, button)
            );


            answersElement.appendChild(button);

        }
    );


    startTimer();
}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    timeLeft = 15;

    timerElement.textContent =
        timeLeft;

    timer.classList.remove("danger");


    timerInterval =
        setInterval(() => {

            timeLeft--;

            timerElement.textContent =
                timeLeft;


            if (timeLeft <= 5) {

                timer.classList.add("danger");

            }


            if (timeLeft <= 0) {

                clearInterval(timerInterval);

                timeOut();

            }

        }, 1000);
}


/* =====================================================
   TEMPO ESGOTADO
===================================================== */

function timeOut() {

    if (locked) return;

    locked = true;

    wrongAnswers++;

    combo = 0;

    lives--;


    feedbackElement.textContent =
        "O tempo acabou! ⏳";

    feedbackElement.className =
        "feedback wrong-feedback";


    showCorrectAnswer();

    updateInterface();


    setTimeout(() => {

        nextQuestion();

    }, 1200);
}


/* =====================================================
   VERIFICAR RESPOSTA
===================================================== */

function checkAnswer(
    selectedIndex,
    selectedButton
) {

    if (locked) return;

    locked = true;

    clearInterval(timerInterval);


    const data =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    if (selectedIndex === data.correct) {

        /* ACERTO */

        selectedButton.classList.add(
            "correct"
        );


        correctAnswers++;

        combo++;


        if (combo > bestCombo) {

            bestCombo = combo;

        }


        const basePoints = 100;

        const comboPoints =
            combo * 25;

        const speedPoints =
            timeLeft * 5;


        const points =
            basePoints +
            comboPoints +
            speedPoints;


        score += points;


        feedbackElement.textContent =
            `Muito bem! +${points} pontos ✨`;


        feedbackElement.className =
            "feedback correct-feedback";


        createGlowEffect();

    }


    else {

        /* ERRO */

        selectedButton.classList.add(
            "wrong"
        );


        wrongAnswers++;

        combo = 0;

        lives--;


        feedbackElement.textContent =
            "Quase! A resposta correta está destacada.";


        feedbackElement.className =
            "feedback wrong-feedback";


        showCorrectAnswer();

    }


    buttons.forEach(button => {

        button.style.pointerEvents =
            "none";

    });


    updateInterface();


    setTimeout(() => {

        nextQuestion();

    }, 1300);
}


/* =====================================================
   MOSTRAR RESPOSTA CORRETA
===================================================== */

function showCorrectAnswer() {

    const data =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    if (buttons[data.correct]) {

        buttons[data.correct]
            .classList.add("correct");

    }
}


/* =====================================================
   PRÓXIMA
===================================================== */

function nextQuestion() {

    if (lives <= 0) {

        endGame();

        return;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        endGame();

        return;

    }


    loadQuestion();
}


/* =====================================================
   ATUALIZAR INTERFACE
===================================================== */

function updateInterface() {

    scoreElement.textContent =
        String(score).padStart(5, "0");


    comboElement.textContent =
        `x${combo}`;


    livesElement.textContent =
        "♥ ".repeat(lives).trim() +
        (
            lives < 3
                ? " " + "♡ ".repeat(3 - lives).trim()
                : ""
        );

}


/* =====================================================
   FINALIZAR
===================================================== */

function endGame() {

    clearInterval(timerInterval);


    finalScoreElement.textContent =
        String(score).padStart(5, "0");


    correctAnswersElement.textContent =
        correctAnswers;


    wrongAnswersElement.textContent =
        wrongAnswers;


    finalComboElement.textContent =
        `x${bestCombo}`;


    const percentage =
        (correctAnswers / questions.length) * 100;


    if (percentage === 100) {

        resultTitleElement.textContent =
            "ABSURDAMENTE INCRÍVEL!";

        resultMessageElement.textContent =
            "Você dominou todos os desafios matemáticos! 🌟";

    }

    else if (percentage >= 80) {

        resultTitleElement.textContent =
            "VOCÊ BRILHOU!";

        resultMessageElement.textContent =
            "Seu cérebro está em modo neon. ⚡";

    }

    else if (percentage >= 60) {

        resultTitleElement.textContent =
            "MUITO BOM!";

        resultMessageElement.textContent =
            "Você está ficando cada vez melhor. 💜";

    }

    else if (percentage >= 40) {

        resultTitleElement.textContent =
            "QUASE LÁ!";

        resultMessageElement.textContent =
            "Mais uma tentativa e você chega lá! ✨";

    }

    else {

        resultTitleElement.textContent =
            "NÃO DESISTA!";

        resultMessageElement.textContent =
            "Todo grande matemático começa praticando. 🚀";

    }


    showScreen(resultScreen);
}


/* =====================================================
   EFEITO VISUAL AO ACERTAR
===================================================== */

function createGlowEffect() {

    const colors = [
        "#19f9ff",
        "#ff2bd6",
        "#7b2cff",
        "#ffd84d"
    ];


    for (let i = 0; i < 12; i++) {

        const particle =
            document.createElement("div");


        particle.textContent = "✦";


        particle.style.position =
            "fixed";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 70 + 10}%`;


        particle.style.color =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        particle.style.fontSize =
            `${Math.random() * 14 + 10}px`;


        particle.style.pointerEvents =
            "none";


        particle.style.zIndex =
            "100";


        particle.style.transition =
            "all 0.9s ease";


        document.body.appendChild(
            particle
        );


        setTimeout(() => {

            particle.style.transform =
                `translate(
                    ${(Math.random() - 0.5) * 250}px,
                    ${(Math.random() - 0.5) * 250}px
                ) rotate(180deg)`;

            particle.style.opacity = "0";

        }, 20);


        setTimeout(() => {

            particle.remove();

        }, 1000);

    }
}