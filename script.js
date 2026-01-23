const questions=[
{q:"Capital of India?",o:["Delhi","Mumbai","Chennai","Kolkata"],a:0},
{q:"HTML stands for?",o:["Hyper Text Markup Language","High Text","Tool","None"],a:0},
{q:"CSS is used for?",o:["Logic","Styling","DB","Server"],a:1},
{q:"JS is?",o:["Markup","Styling","Programming","DB"],a:2},
{q:"Largest planet?",o:["Earth","Mars","Jupiter","Venus"],a:2},
{q:"2+2?",o:["3","4","5","6"],a:1},
{q:"Founder of Microsoft?",o:["Jobs","Gates","Musk","Zuck"],a:1},
{q:"Python is?",o:["Snake","Language","OS","Game"],a:1},
{q:"RAM full form?",o:["Random Access Memory","Read Only","Run App","None"],a:0},
{q:"HTTP is?",o:["Protocol","Lang","OS","Browser"],a:0},
{q:"CPU is?",o:["Brain","Storage","Input","Output"],a:0},
{q:"Git is?",o:["IDE","Version Control","OS","Compiler"],a:1},
{q:"Linux is?",o:["Browser","OS","Lang","Game"],a:1},
{q:"AI means?",o:["Artificial Intelligence","Auto Info","Net","None"],a:0},
{q:"RGB used for?",o:["Sound","Color","AI","Net"],a:1},
{q:"SQL used for?",o:["Design","Database","Game","OS"],a:1},
{q:"WWW inventor?",o:["Jobs","Berners-Lee","Gates","Tesla"],a:1},
{q:"Chrome is?",o:["OS","Browser","Server","IDE"],a:1},
{q:"Binary base?",o:["2","8","10","16"],a:0},
{q:"Bootstrap is?",o:["Framework","Lang","OS","DB"],a:0}
];

let i=0,score=0,results=[],timer, timeLeft=15;

const qEl=document.getElementById("question");
const opts=document.querySelectorAll(".option");
const progress=document.getElementById("progress");
const scoreEl=document.getElementById("score");
const timerEl=document.getElementById("timer");

const correctSound=new Audio("sounds/correct.mp3");
const wrongSound=new Audio("sounds/wrong.mp3");
const tickSound=new Audio("sounds/tick.mp3");

function startQuiz(){
start.classList.add("d-none");
quiz.classList.remove("d-none");
load();
}

function load(){
clearInterval(timer);
timeLeft=15;
timerEl.innerText=`⏱ ${timeLeft}s`;
timer=setInterval(countdown,1000);

let q=questions[i];
qEl.innerText=q.q;
opts.forEach((b,idx)=>{
b.innerText=q.o[idx];
b.className="btn option";
b.disabled=false;
});
progress.style.width=((i+1)/questions.length)*100+"%";
scoreEl.innerText=`Score: ${score}/${i}`;
}

function countdown(){
timeLeft--;
tickSound.play();
timerEl.innerText=`⏱ ${timeLeft}s`;
if(timeLeft===0){
clearInterval(timer);
answer(-1);
}
}

function answer(x){
clearInterval(timer);
opts.forEach(b=>b.disabled=true);
let correct=x===questions[i].a;
results.push(correct?1:0);

if(correct){
opts[x].classList.add("correct");
score++;
correctSound.play();
confetti();
}else{
if(x>=0) opts[x].classList.add("wrong");
opts[questions[i].a].classList.add("correct");
wrongSound.play();
}

setTimeout(()=>{
i++;
i<questions.length?load():showResult();
},1000);
}

function confetti(){
for(let j=0;j<25;j++){
let c=document.createElement("div");
c.className="confetti";
c.style.left=Math.random()*100+"%";
c.style.background=`hsl(${Math.random()*360},100%,50%)`;
document.body.appendChild(c);
setTimeout(()=>c.remove(),3000);
}
}

function showResult(){
quiz.classList.add("d-none");
result.classList.remove("d-none");
final.innerText=`Final Score: ${score}/${questions.length}`;

new Chart(chart,{
type:"bar",
data:{
labels:results.map((_,i)=>"Q"+(i+1)),
datasets:[{
data:results,
backgroundColor:results.map(r=>r?"#00ff9d":"#ff4d4d")
}]
},
options:{
scales:{y:{min:0,max:1,ticks:{stepSize:1}}},
plugins:{legend:{display:false}}
}
});
}
