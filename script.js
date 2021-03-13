const input = document.querySelector("#number_field");
const button = document.querySelector("#submit_btn");
const next_btn = document.getElementById("next_btn");

var num1;
var num2;
var operator;
var correct;

function buttonDisable(){
	button.disabled = true;
	input.addEventListener("keyup", ()=> {
	button.disabled = false;
});
}

function problemGenerator(min, max, operator_arg){
	
	num1 = generator(min, max);
	num2 = generator(min, max);
	operator = operator_arg;
	correct = num1 + num2;
}

function problemDisplay(){
	
	document.getElementById('probleme').innerHTML = String(num1) + operator + String(num2) + "=";
}

function generator(minVal,maxVal){
	var randVal = minVal+(Math.random()*(maxVal-minVal));
	return Math.round(randVal);
}

function OnButtonClick(){
	let answer = "";
	let content = input.value;
	if (correct == content) {
		answer = "correct";
		document.getElementById('result').innerHTML = answer;
		next_btn.style.display = "block";
		
	} else {
		answer = "Pas correct. La réponse est " + correct;
		document.getElementById('result').innerHTML = answer;
		next_btn.style.display = "block";
	}
}

function clearNumber(){
	let numberForm = document.getElementById("number_field");
	numberForm.value = "";
}
function OnButtonNextClick(){
	problemGenerator(0, 9, "+");
	problemDisplay();
	clearNumber();
}

document.getElementById("next_btn").style.display = "none";
buttonDisable();
problemGenerator(0, 9, "+");
problemDisplay();
OnButtonNextClick();
