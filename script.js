// Array de preguntas y respuestas
const questions = [
    {
        question: "La expresión senθ ⋅ cscθ es igual a:",
        answers: ["1", "sen(2θ)", "secθ", "tanθ", "cot(θ)"],
        correct: "1"
    },
    {
        question: "¿Qué expresión es equivalente a sen²θ + cos²θ?",
        answers: ["cos²θ - sen²θ", "2senθcosθ", "1", "1 + cot²θ", "sec²θ - 1"],
        correct: "1"
    },
    {
        question: "¿Cuál es la equivalencia correcta de cos(-θ)?",
        answers: ["-cosθ", "cosθ", "senθ", "-senθ", "tanθ"],
        correct: "cosθ"
    }
    // Añade más preguntas aquí usando los datos del documento
];

let score = 0;
let timeRemaining = 15 * 60; // 15 minutos en segundos
let timerId;

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const messageContainerEl = document.getElementById('message-container');

function startTimer() {
    timerId = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerEl.textContent = `Tiempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function loadNewQuestion() {
    // Escoge una pregunta aleatoria
    const randomIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[randomIndex];

    questionTextEl.textContent = currentQuestion.question;
    optionsContainerEl.innerHTML = ''; // Limpia las opciones anteriores

    // Crea los botones de las opciones
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('option-button');
        button.onclick = () => checkAnswer(button, answer, currentQuestion.correct);
        optionsContainerEl.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        // En tu solicitud indicaste 0 puntos por acierto, la lógica se mantiene así.
        messageContainerEl.textContent = "¡Respuesta correcta!";
        messageContainerEl.style.color = "green";
    } else {
        score -= 10;
        scoreEl.textContent = `Puntuación: ${score}`;
        messageContainerEl.textContent = "Respuesta incorrecta. -10 puntos.";
        messageContainerEl.style.color = "red";
    }

    // Deshabilita los botones y carga la siguiente pregunta
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(btn => btn.disabled = true);
    setTimeout(() => {
        messageContainerEl.textContent = "";
        loadNewQuestion();
    }, 1500);
}

function endGame() {
    clearInterval(timerId);
    questionTextEl.textContent = "¡Tiempo terminado!";
    optionsContainerEl.innerHTML = "";
    messageContainerEl.textContent = `Puntuación final: ${score}`;
}

// Iniciar el juego
startTimer();
loadNewQuestion();
