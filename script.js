// Ensure all necessary elements are selected
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alertBox = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Quiz data
const quiz = [
    { question: "Q. What is the capital of Australia?", choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },

    { question: "Q.Who wrote the play Romeo and Juliet?", choices: ["Charles Dickens", "William Shakespeare", "George Orwell", "Jane Austen"], answer: "William Shakespeare" },

    { question: "Q. What is the chemical symbol for water?", choices: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" },

    { question: "Q. Which planet is known as the Red Planet?", choices: ["Venus", "Saturn", "Mars", "Jupiter"], answer: "Mars" },

    { question: "Q. Who painted the Mona Lisa?", choices: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },

    { question: "Q. What is the largest mammal in the world?", choices: ["African Elephant", "Blue Whale", "Great White Shark", "Giraffe"], answer: "Blue Whale" },

    { question: "Q. Which country is known as the Land of the Rising Sun?", choices: ["China", "India", "Japan", "South Korea"], answer: "Japan" },
    
    { question: "Q. What is the hardest natural substance on Earth?", choices: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },

    { question: "Q. How many continents are there in the world?", choices: ["5", "6", "7", "8"], answer: "7" },
    
    { question: "Q. Which organ is responsible for pumping blood throughout the body?", choices: ["Lungs", "Brain", "Heart", "Kidney"], answer: "Heart" }
];

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 25;
let timerID = null;

// Show Questions
const showQuestions = () => {
    if (currentQuestionIndex >= quiz.length) return;  // Check to avoid overflow

    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    questionDetails.choices.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected')); // Deselect others
            choiceDiv.classList.add('selected'); // Select current
        });
    });

    startTimer();
};

// Check Answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice) {
        if (selectedChoice.textContent.trim() === quiz[currentQuestionIndex].answer.trim()) {
            displayAlert("Correct Answer!");
            score++;
        } else {
            displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
        }
        currentQuestionIndex++;
    } else {
        displayAlert("Select an answer before proceeding.");
        return;
    }

    if (currentQuestionIndex < quiz.length) {
        timeLeft = 25; // Reset timer for next question
        showQuestions();
    } else {
        stopTimer();
        showScore(); // Show final score
    }
};

// Show Score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};

// Display Alert
const displayAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 2000);
};

// Timer Functions
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    timerID = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerID);
            displayAlert("Time Up! Moving to the next question.");
            checkAnswer();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timerID);
};

// Shuffle Questions
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
};

// Start Quiz
const startQuiz = () => {
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
    timeLeft = 25; // Reset time
    quizOver = false; // Reset quiz status
    timer.style.display = "flex";
    shuffleQuestions();
    container.style.display = "block";
    startBtn.style.display = "none";
    quitBtn.style.display = "block"; // Show Quit button
};



// Quit Quiz
const quitQuiz = () => {
    quizOver = true; // Set quiz status to over
    container.style.display = "none"; // Hide quiz container
    startBtn.style.display = "block"; // Show Start button
    quitBtn.style.display = "none"; // Hide Quit button
    timer.style.display = "none"; // Hide timer if you have one
};

// Event Listeners
startBtn.addEventListener('click', startQuiz);
quitBtn.addEventListener("click", quitQuiz);

nextBtn.addEventListener('click', () => {
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        startQuiz();
    } else {
        checkAnswer();
    }
});
