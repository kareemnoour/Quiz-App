// const a = function () {
//     console.log(this);

//     const b = {
//         func1: function () {
//             console.log(this);
//         }
//     }

//     const c = { func2: () => {
//         console.log(this);
//     }
//     }

//     b.func1();
//     c.func2();
// }

// a();

// const ApiUrl = fetch('https://the-trivia-api.com/v2/questions')
// .then((response) => response.json()) // parse JSON from request
// .catch((error) => console.error(`Error fetching data: ${error}`))
// // handle errors
// console.log("Api Url", ApiUrl );
// fetch('/data').then(()=>{})  .catch() ;
// function getData(){
//     return new Promise ((resolve , reject)=>{
//         setTimeout (()=>{
//             resolve ('Data fetched successfully');
//             },5000 )})};

    const ApiUrl = 'https://opentdb.com/api.php?amount=50';
    async function getData() {
    const _questions = await fetch(ApiUrl);
    const _data = await _questions.json();
   
    
    
    
    name();
   
    const info = document.querySelector(".title-info");
    const quizArea = document.querySelector(".quiz-area");
    const question = document.querySelector(".quiz-area h1");
    
    const optionList = document.querySelector(".quiz-area ul");
    
    const btn = document.getElementById("btn");
    btn.disabled = true;

    const score = document.querySelector(".score");
    score.innerHTML = 0;
    
    let num = 0;
    
    function showData() {
        let index = Math.floor(Math.random() * _data.results.length);
    
        question.innerHTML = "";
        question.innerHTML = _data.results[index].question;

        optionList.innerHTML = "";

        btn.style.cursor = "not-allowed";
        optionList.style.pointerEvents = "auto";

        const rAnswer = _data.results[index].correct_answer.trim();
        const Answers = _data.results[index].incorrect_answers;
        Answers.push(rAnswer);
        const shuffleArray = Answers.sort(() => Math.random() - 0.5);

        for (let i = 0; i < Answers.length; i++) {
            let li = document.createElement("li")
            li.innerHTML = Answers[i];
            optionList.appendChild(li);
            
            li.addEventListener("click", (e) => {
                e.target.innerHTML === rAnswer? num = num + 1 : num;
                btn.style.cursor = "pointer";
                btn.disabled = false;
                optionList.style.pointerEvents = "none";

                btn.addEventListener("click", () => {
                    li.innerHTML === rAnswer? li.style.backgroundColor = "green" : li.style.backgroundColor = "red";
                    num < 10? score.innerHTML = `0${num}`: score.innerHTML = num;
                    btn.disabled = true;
                    let inter = setInterval(() => {
                        showData()
                        clearInterval(inter)
                    }, 2000);
                })
            })
        };

        const cate = document.querySelector(".cate").innerHTML = _data.results[index].category;
        const diff = document.querySelector(".diff").innerHTML = _data.results[index].difficulty;
        
        if(parseInt(score.innerHTML) === 11){
            info.innerHTML = "";
            quizArea.innerHTML = "";
            swal({
                title: "Congratulation!",
                text: "You did it champ!",
                icon: "success",
                button: "continue!",
                className: "res",
                }).then((value)=>{
                    location.reload()
              });
        }
    }

    showData();
}
getData();


function name() {
    swal("Write Your Name here:", {
        content: "input",
        className : "data",
      })
      .then((value) => {
        value === null || value === ""? document.querySelector(".title span").innerHTML = "Unknown" : document.querySelector(".title span").innerHTML = value;
      }).then((value) => {
        swal({
            title:"Ready for the quiz!",
            icon:'info',
            button : "Start"
        }) 
      })
}
