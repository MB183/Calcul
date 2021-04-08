const input = document.querySelector("#number_field");
const start_button = document.querySelector("#start_btn");
const submit_button = document.querySelector("#submit_btn");
const next_button = document.getElementById("next_btn");

const new_button = document.getElementById("new_btn");
const restart_button = document.getElementById("restart_btn");

var done_questions = 0;
var good_answer = 0;

var type_calc;
var level;
var number_questions;

var num1;
var num2;
var correct;
var symbol;

//timer ////////////////////////////////////////////////////////////////////////////////////
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

// ストップウォッチを動かすときに用いるsetIntervalの返り値
var timer_id;

// ストップウォッチを動かし始めてからの時間
let stopwatch_time = 0;

// STARTボタンを押した時間
let press_start_time = 0;

// STOPボタンを押した時間
let press_stop_time = 0;

//ストップウォッチが動いていた時間の合計（STARTボタンを押してからSTOPボタンを押すまでの時間の合計）
let past_moving_time = 0;

var time_seconds;
var time_minutes;
//timer//////////////////////////////////////////////////////////////////////////////////

function setSymbol(){
	switch(type_calc){
		case '+':
		symbol = '<img src="images/plus.png" width="8">';
		break;

		case '-':
		symbol = '<img src="images/moins.png" width="8">';
		break;

		case '*':
		symbol = '<img src="images/multi.png" width="8">';
		break;

		case '/':
		symbol = '<img src="images/diviser.png" width="8">';
		break;
	}
}

function problemDisplay(){
	
	document.getElementById('probleme').innerHTML = String(num1) + symbol + String(num2) + "=";
}

function generator(minVal,maxVal){
	var randVal = minVal+(Math.random()*(maxVal-minVal));
	return Math.round(randVal);
}


function buttonDisable(){
	submit_button.disabled = true;
	input.addEventListener("keyup", ()=> {
	submit_button.disabled = false;
});
}


window.onload = function(){
	//document.getElementById("next_button").style.display = "none";
	next_button.style.display = "none";
	//document.getElementById("calcul").style.display = "none";
	new_button.style.display = "none";
	restart_button.style.display = "none";
	document.getElementById("calcul").style.display = "none";
	};

//timer ///////////////////////////////////////////
function startStopwatch(){

	press_start_time = new Date().getTime();
	timer_id = setInterval(() => {
    stopwatch_time = new Date().getTime() - press_start_time + past_moving_time;

    time_seconds = `0${Math.floor((stopwatch_time / 1000) % 60)}`.slice(
      -2
    );
    time_minutes = `0${
      Math.floor(stopwatch_time / 1000 / 60) % 60
    }`.slice(-2);

    //ブラウザに時間を描画する
    minutes.innerHTML = time_minutes;
    seconds.innerHTML = time_seconds;
  }, 1);

}

function stopStopwatch(){
	clearInterval(timer_id);

  	press_stop_time = new Date().getTime();
  	past_moving_time += press_stop_time - press_start_time;
}

function resetStopwatch(){
	clearInterval(timer_id);

	minutes.innerHTML = '00';
    seconds.innerHTML = '00';

    stopwatch_time = 0;
	press_start_time = 0;
	press_stop_time = 0;
	past_moving_time = 0;
}

//timer  //////////////////////////////////////////////////////////

function OnButtonStartClick(){
	document.getElementById("formula").style.display = "none";
	type_calc = document.querySelector('input[name=radio1]:checked').value;
	level = document.querySelector('input[name=radio2]:checked').value;
	number_questions = document.querySelector('input[name=radio3]:checked').value;
	problemGenerator();
	setSymbol();
	problemDisplay();
	startStopwatch();
	document.getElementById("calcul").style.display = "block";
	//console.log(done_questions);
	document.getElementById('questions').innerHTML = (done_questions + 1)  + "/" + number_questions;
}

function problemGenerator(){
		switch(level){
		case '1':
		var min_num = 1;
		var max_num = 9;
		break;

		case '2':
		var min_num = 10;
		var max_num = 99;
		break;

		case '3':
		var min_num = 100;
		var max_num = 999;
		break;
	}

	num1 = generator(min_num, max_num);
	num2 = generator(min_num, max_num);

	switch(type_calc){
		case '+':
		correct = num1 + num2;
		break;

		case '-':
		correct = num1 - num2;
		break;

		case '*':
		correct = num1 * num2;
		break;

		case '/':
		correct = num1 / num2;
		break;
	}
}

function OnButtonSubmitClick(){
	let answer = "";
	let content = input.value;
	done_questions++;
	document.getElementById('questions').innerHTML = (done_questions + 1)  + "/" + number_questions;

	if (correct == content) {
		answer = "correct";
		document.getElementById('result').innerHTML = answer;
		next_button.style.display = "block";
		good_answer++;
		
	} else {
		answer = "Pas correct. La réponse est " + correct;
		document.getElementById('result').innerHTML = answer;
		next_button.style.display = "block";
	}
	if (done_questions == number_questions) {
		document.getElementById("calcul").style.display = "none";
		document.getElementById("resultat").style.display = "block";
		stopStopwatch();
		console.log(minutes);

		//cookie /////////////////////////////////////////////////
		var rate = good_answer / number_questions * 100;

		document.cookie = 'Le nombre de bonne réponse =' + good_answer;
		document.cookie = 'Le nombre de questions =' + number_questions;
		document.cookie = 'Le taux de réussite =' + rate + '%';
		//cookie /////////////////////////////////////////////////
		document.getElementById('resultat').innerHTML = "Résultat <br>" + time_minutes + "min" + time_seconds + "sec <br>" + good_answer +" Bonnes réponses !<br>";
		new_button.style.display = "block";
		restart_button.style.display = "block";
	}
}

function clearNumber(){
	let numberForm = document.getElementById("number_field");
	numberForm.value = "";
	document.getElementById('result').innerHTML = "";

}

function OnButtonNextClick(){
	problemGenerator();
	problemDisplay();
	clearNumber();
	buttonDisable();
}

function OnButtonNewClick(){
		document.getElementById("formula").style.display = "block";
		document.getElementById("resultat").style.display = "none";
		document.getElementById('questions').innerHTML = "";
		new_button.style.display = "none";
		restart_button.style.display = "none";
		clearNumber();
		done_questions = 0;	
		resetStopwatch();
}

function OnButtonRestartClick(){
	document.getElementById("resultat").style.display = "none";
	new_button.style.display = "none";
	restart_button.style.display = "none";
	clearNumber();
	done_questions = 0;	
	resetStopwatch();
	startStopwatch();
	document.getElementById('questions').innerHTML = (done_questions + 1)  + "/" + number_questions;
	document.getElementById("calcul").style.display = "block";

}



buttonDisable();


