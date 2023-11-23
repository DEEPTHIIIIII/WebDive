const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const welcomeSection=document.getElementById('welcomeSection');
const quizSection=document.getElementById('quizSection');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Storing question , options , correct answer and the correct explanation in a array 
const quiz = [
    {
        question: "Q. Which of the following can read and render HTML web pages?",
        choices: ["Server", "Head tak", "Web browser", "empty"],
        answer: "Web browser",
        exp:"Web browsers can read and render HTML web pages."
    },
    {
        question: "Q. Identify the range of byte data types in JavaScript.",
        choices: ["-10 to 9", "-128 to 127", "-32768 to 32767", "-2147483648 to 2147483647"],
        answer: "-128 to 127",
        exp:"The range of byte data type is - 128 to 127."
    },
    {
        question: "Q. Why were cookies designed?",
        choices: ["For server-side programming", "For client-side programming", "Both a and b", "None"],
        answer: "For server-side programming",
        exp:" Cookies were designed for server-side programming."
    },
    {
        question: "Q. Why is XPATH used?",
        choices: ["To address the server", "To store the IP address of this server", "To address the document by specifying a location path", "None"],
        answer: "To address the document by specifying a location path",
        exp:"XPATH is used to address the document by specifying a location path"
    },
    {
        question: "Q. Simple network management protocol uses which of the following port number ?",
        choices: ["164", "163", "160", "161"],
        answer: "161",
        exp:"Simple network management protocol uses port number 161."
    },
    {
        question: "Q. What is the full form of W3C ?",
        choices: ["World Wide Websites community", "World Wide Web community", "World Web Websites consortium", "World Wide Web consortium"],
        answer: "World Wide Web consortium",
        exp:"W3C stands for World Wide Web consortium."
    },
    {
        question: "Q. Identify the empty or void element in HTML ",
        choices: ["<sup>", "<br>", "<p>", "<abbr>"],
        answer: "<br>",
        exp:"<br> Is the empty or void element in HTML"
    },
    {
        question: "Q. Which of the following attribute is used for merging two or more adjacent columns ?",
        choices: ["CELLSPACING", "ROWSPAN", "COLSPAN", "CELLPADDING"],
        answer: "COLSPAN",
        exp:"COLSPAN Is used for merging two or more adjacent columns."
    },
    {
        question: "Q. On which model is www based upon ?",
        choices: ["client-server", "local server", "3 tier", "None of the above"],
        answer: "client-server",
        exp:"www is based upon client-server."
    },
    {
        question: "Q. How many sizes of headers are available in HTML by default?",
        choices: ["5", "3", "2", "6"],
        answer: "6",
        exp:" 6 headers are available in HTML by default ranging from h1 to h6."
    },

];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
let isCorrect='';
// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
  
    choicesBox.textContent = "";
    const selectedChoices = []; // Array to store selected choices
  
    for (let i = 0; i < questionDetails.choices.length; i++) {
      const currentChoice = questionDetails.choices[i];
      const choiceDiv = document.createElement('div');
      choiceDiv.textContent = currentChoice;
      choiceDiv.classList.add('choice');
      choicesBox.appendChild(choiceDiv);
  
      choiceDiv.addEventListener('click', () => {
        if (choiceDiv.classList.contains('selected')) {
          // If already selected, remove the selection
          choiceDiv.classList.remove('selected');
          const index = selectedChoices.indexOf(currentChoice);
          selectedChoices.splice(index, 1);
        } else {
          // If not selected, add the selection and remove selection from other choices
          selectedChoices.forEach((choice) => {
            const otherChoiceDiv = document.querySelector(`.choice:nth-child(${questionDetails.choices.indexOf(choice) + 1})`);
            otherChoiceDiv.classList.remove('selected');
          });
          choiceDiv.classList.add('selected');
          selectedChoices.length = 0;
          selectedChoices.push(currentChoice);
        }
      });
    }
  
    // Start timer only if there's a valid question to display
    if (currentQuestionIndex < quiz.length) {
      startTimer();
    }
  }


// Function to check answers and set our feedback 
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        isCorrect=true;
        displayAlert(`Correct Answer ! Explanation:  ${quiz[currentQuestionIndex].exp}`,isCorrect)
        score++;
    }
    else {
        isCorrect=false;
        displayAlert(`Wrong Answer ! Explanation:  ${quiz[currentQuestionIndex].exp}`,isCorrect)
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// To show the score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Feedback to choices made by user along with the explanation
const displayAlert = (msg, isCorrect) => {
    const alert = document.querySelector('.alert');
    alert.textContent = msg;
    if(isCorrect)
    {
        alert.style.backgroundColor='#9ADE7B' //if ans is correct setting bg to green
    }
    else{
        alert.style.backgroundColor='#F94C10'// if ans is wrong setting bg to red
    }
    alert.style.width = '67%'; // Set width of alert
    alert.style.display = 'block';
    alert.style.position = 'fixed';
    alert.style.top = '91%';
    alert.style.left = '50%';
    alert.style.transform = 'translate(-50%, 50%)';
    alert.style.textAlign = 'center';
  
    setTimeout(() => {
      alert.style.display = 'none';
    }, 2000);
  };
  //til
// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Opps! Time's Up ! Do you wish to continue ?");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    welcomeSection.style.display="none";
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});