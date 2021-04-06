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

function problemDisplay(){
	
	document.getElementById('probleme').innerHTML = String(num1) + type_calc + String(num2) + "=";
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

function OnButtonStartClick(){
	document.getElementById("formula").style.display = "none";
	type_calc = document.querySelector('input[name=radio1]:checked').value;
	level = document.querySelector('input[name=radio2]:checked').value;
	number_questions = document.querySelector('input[name=radio3]:checked').value;
	problemGenerator();
	problemDisplay();
	document.getElementById("calcul").style.display = "block";
	console.log(done_questions);
	document.getElementById('questions').innerHTML = (done_questions + 1)  + "/" + number_questions;
}

function problemGenerator(){
		switch(level){
		case '1':
		var min_num = 0;
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
		document.getElementById('resultat').innerHTML = "Résultat <br>" + good_answer +" Bonnes réponses !<br>";
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
}

function OnButtonRestartClick(){
	document.getElementById("resultat").style.display = "none";
	//document.getElementById('questions').innerHTML = "";
	new_button.style.display = "none";
	restart_button.style.display = "none";
	clearNumber();
	done_questions = 0;	
	document.getElementById('questions').innerHTML = (done_questions + 1)  + "/" + number_questions;
	document.getElementById("calcul").style.display = "block";

}

buttonDisable();


