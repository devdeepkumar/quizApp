const questions = [
  {
    question: "What is Largest Animal",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue Whale",
        correct: true,
      },
      {
        text: "Elephant",
        correct: false,
      },
      {
        text: "Giraffe",
        correct: false,
      },
    ],
  },

  {
    question: "Which is the smallest continent in the World",
    answers: [
      {
        text: "Asia",
        correct: false,
      },
      {
        text: "Australia",
        correct: true,
      },
      {
        text: "Arctic",
        correct: false,
      },
      {
        text: "Africa",
        correct: false,
      },
    ],
  },

  {
    question: "Which is the Largest  Desert in the World",
    answers: [
      {
        text: "Kalahari",
        correct: false,
      },
      {
        text: "Gobi",
        correct: true,
      },
      {
        text: "Sahara",
        correct: false,
      },
      {
        text: "Antartica",
        correct: true,
      },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answersButons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-button");
// console.log(questionElement,answersButon,nextButton);

let questionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.ineerHtml = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersButons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answersButons.firstChild) {
    answersButons.removeChild(answersButons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answersButons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `ypu scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "play again";
  nextButton.style.display = "block"
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
