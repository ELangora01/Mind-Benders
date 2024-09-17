
let inputName=document.getElementById('name')
let introduction=document.getElementById('intro')
//----------------making to execute function when enter key is pressed--------------
inputName.addEventListener('keypress',function(enter){
    if(enter.key==='Enter'){
        getData();
    }
})
//----------------------------------------------------------------------------------
let mainDiv=document.getElementById('main');
let startBtn=document.getElementById('start');
startBtn.addEventListener('click',getData);
let nextBtn=document.getElementById('next');
nextBtn.addEventListener('click',nextButton);
function nextButton(){
    checkAnswer();
    count++;
    displayData()
}
nextBtn.classList.add('hide');
let restartBtn=document.getElementById('restart')
restartBtn.addEventListener('click',restartQuiz)
restartBtn.classList.add('hide');
let suggestion=document.getElementById('note')
suggestion.classList.add('hide')
let quizData=[];

let ansData=[];
let correctAnswer='';
function getData(){
    alert("There will be 15 questions and you can't go back to the previous question even if it is answered or unanswered")
    if(inputName.value!=""){
    introduction.style.display="none";
    nextBtn.classList.remove('hide');
    suggestion.classList.remove('hide')
    fetch(`https://opentdb.com/api.php?amount=15&category=17&difficulty=medium&type=multiple`)
    .then(function(response){return response.json()})
    .then(function(data){
        quizData=data.results;
        displayData();
    })
   .catch(function(error){mainDiv.innerHTML="Some error happened please refresh the page"})
}
else{
    mainDiv.innerHTML="*Enter your name to proceed";
}
}


let count=0;
function displayData(){
    mainDiv.innerHTML="";
    if(count< quizData.length){
        const question=document.createElement('h2');
        question.innerText=`${count+1}. ${quizData[count].question}`;//for question
        mainDiv.appendChild(question);
        correctAnswer=quizData[count].correct_answer
        options();
    }
    if(count>=quizData.length){
        let result=document.createElement('h1')
        result.innerText=`Hey ${(inputName.value).toUpperCase()}, Your Score is ${ansCount} out of ${quizData.length}`
        mainDiv.appendChild(result)
        nextBtn.classList.add('hide');
        restartBtn.classList.remove('hide');
        suggestion.classList.add('hide');
    }

}




function options(){
    let ans=[];
    ans.push(quizData[count].correct_answer);
    ans.push(...quizData[count].incorrect_answers);// those 3 dots used to add the incorrect values separately


   /* the above line and the below or same if we don't add 3 dots we have enter each element
    in incorrect answers as below anything can be used

    ans[1]=quizData[count].incorrect_answers[0];
    ans[2]=quizData[count].incorrect_answers[1];
    ans[3]=quizData[count].incorrect_answers[2];

    */

    ansData=_.shuffle(ans);
    let optionList=document.createElement('div');
    optionList.classList.add('option')
    ansData.forEach(function(option,index){
        let optionsData=document.createElement('div')
        let radioBtn=document.createElement('input')
        let label=document.createElement('label')
        radioBtn.type="radio";
        radioBtn.name="option";
        radioBtn.value=option;
        radioBtn.id=`option_${index+1}`;
        label.htmlFor=radioBtn.id;
        label.innerText=option;
        label.prepend(radioBtn);
        optionsData.appendChild(label);
        optionList.appendChild(optionsData)   
    });
    mainDiv.appendChild(optionList)
    nextBtn.classList.remove('hide') // Show the Next button once options are displayed
}
let ansCount=0
function checkAnswer(){
    const selectedRadio = document.querySelector('input[name="option"]:checked');
    if(selectedRadio){
    if(selectedRadio.value===correctAnswer){
        ansCount++;
    }
}

}

//----------to restart thje quiz--------------------------------------
function restartQuiz() {
    count = 0;
    ansCount = 0;
    quizData = [];
    mainDiv.innerHTML = "";
    introduction.style.display = "block";
    nextBtn.classList.add('hide');
    restartBtn.classList.add('hide');
}