const questions = [
    {
      question : "What does DOM stand for in JavaScript?",
      answers : [
        {text: "Document Object Model", correct : true},
        {text: "Data Object Model", correct : false},
        {text: "Document Oriented Model", correct : false},
        {text: "Dynamic Object Model", correct : false},
      ]
    },
     {
      question : "What will typeof null return?",
      answers : [
        {text: "null", correct : false},
        {text: "object", correct : true},
        {text: "undefined", correct : false},
        {text: "string", correct : false},
      ]
    },
     {
      question : "How do you declare a function in JavaScript?",
      answers : [
        {text: "function: myFunction()", correct : false},
        {text: "function myFunction()", correct : true},
        {text: "def myFunction()", correct : false},
        {text: "func myFunction()", correct : false},
      ]
    },
     {
      question : "What is the output of 5 + '5' in JavaScript?",
      answers : [
        {text: "10", correct : false},
        {text: "'55'", correct : true},
        {text: "55", correct : false},
        {text: "Error", correct : false},
      ]
    },
     {
      question : "What does the this keyword refer to in JavaScript?",
      answers : [
        {text: "Refers to the current function", correct : false},
        {text: "Refers to the parent function", correct : false},
        {text: "Refers to the global object", correct : false},
        {text: "Refers to the current object", correct : true},
      ]
    },
    
  ];
  
  let test = (ele) => {
    ele.style.backgroundColor = "red";
  }

  const questionElement = document.getElementById("question");
  const progressElement = document.getElementById("myBar");
  const scoreElement = document.getElementById("score");
  const ansElement = document.getElementById("ans-container")
  const nextButton = document.querySelector(".next-btn");
  const questionNumElement = document.getElementById("question-num")
  let score = 0;
  let progress = 20;
  let currentQuestionNum = 0;

  function startQuiz (){
    progress = 20;
    score = 0;
    currentQuestionNum = 0;
    questionNumElement.innerText = `${currentQuestionNum+1}/${questions.length}`
    showQuestion();
  }

  function showQuestion (){
    resetAll();
    questionElement.innerText = `${currentQuestionNum + 1}. ${questions[currentQuestionNum].question}`;
    questions[currentQuestionNum].answers.forEach(ans => {
        let button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        if (ans.correct){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click", selectAns)
        ansElement.appendChild(button);
    })
    currentQuestionNum ++;

  }

  function selectAns (e){
    const selectedAns = e.target;
    const isCorrect = selectedAns.dataset.correct == "true";
    console.log(isCorrect)
    if (isCorrect){
        selectedAns.classList.add("correct");
        score++;
        scoreElement.innerText = score;
        
    }
    else if (!isCorrect){
        selectedAns.classList.add("incorrect");
    }
    Array.from(ansElement.children).forEach(btn=>{
        if (btn.dataset.correct == "true"){
            btn.classList.add("correct");
        }
        btn.classList.remove(".btn");
        btn.disabled = "true";
        btn.style.cursor = "not-allowed";
    });
    nextButton.style.display = "block"
  }

  function resetAll (){
    nextButton.style.display = "none";
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
    }
  }

  function nextQuestion (){
    if (currentQuestionNum +1 > questions.length){
        startQuiz()
    } 
    else {
    progress+=20;
    questionNumElement.innerText = `${currentQuestionNum+1}/${questions.length}`
    progressElement.style.width = `${progress}%`;
    showQuestion();}
  }

  nextButton.addEventListener("click", nextQuestion);
  startQuiz();

 