$(document).ready(function (){
var result;
var curResult;
var curOperator;
var curOperand;
var displayScreen;
var operators;
var operationsDisplay;
var operationStack;
setOnClick();
setDefault();

}	);

function setDefault()
{
	operationStack = [];
	curOperator = "";
	curOperand  = "0"
	curResult =0;
	result = 0;
    displayScreen = document.getElementById("display");
	displayScreen.innerHTML = ""+result;
}

function setOnClick()
{
	//Operators
	document.getElementById("AC").onclick = function() {compute(this.id)};
	document.getElementById("+/-").onclick = function() {compute(this.id)};
	document.getElementById("%").onclick = function() {compute(this.id)};
	document.getElementById("/").onclick = function() {compute(this.id)};
	document.getElementById("-").onclick = function() {compute(this.id)};
    document.getElementById("+").onclick = function() {compute(this.id)};
	document.getElementById(".").onclick = function() {compute(this.id)};
	document.getElementById("X").onclick = function() {compute(this.id)};
	document.getElementById("=").onclick = function() {compute(this.id)};
    //Operands
	document.getElementById("1").onclick = function() {compute(this.id)};
    document.getElementById("2").onclick = function() {compute(this.id)};
	document.getElementById("3").onclick = function() {compute(this.id)};
	document.getElementById("4").onclick = function() {compute(this.id)};
    document.getElementById("5").onclick = function() {compute(this.id)};
	document.getElementById("6").onclick = function() {compute(this.id)};
    document.getElementById("8").onclick = function() {compute(this.id)};
    document.getElementById("9").onclick = function() {compute(this.id)};
    document.getElementById("0").onclick = function() {compute(this.id)};
}

function compute(pressedKey)
{
	switch(pressedKey)
	{
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "0":
		case ".":
		operandPressed(pressedKey);
		break;
		case "/":
		case "+":
		case "-":
		case "X":
		operatorPressed(pressedKey);
		break;
		
	}
}



function operandPressed(keyPressed)
{

 if(curOperand=="0")
 {
  if(keyPressed==".")
   curOperand+=".";
  else
   curOperand=keyPressed;
 }
 else
  curOperand+=keyPressed;
displayScreen.innerHTML = curOperand;
}

function operatorPressed(keyPressed)
{
 
  if(curOperand!="")
  {	
  curOperand = parseFloat(curOperand);
  curResult = curOperand;
  operationStack.push(curOperand);
  displayScreen.innerHTML = curOperand + keyPressed;
  curOperand="";
  if(operationStack.length==2)
  computeCurrentStack();
 }
 curOperator  = keyPressed;
 displayScreen.innerHTML = curResult + keyPressed;
}


function computeCurrentStack()
{
 var operator  = curOperator;

 switch(operator)
 {
 	case "+":
 	operationStack[0] = operationStack[0] + operationStack[1];
 	break;
 	case "/":
 	operationStack[0] = operationStack[0] / operationStack[1];
 	break;
 	case "X":
 	operationStack[0] = operationStack[0] * operationStack[1];
 	break;
 	case "-":
 	operationStack[0] = operationStack[0] - operationStack[1];
 	break;
 }
displayScreen.innerHTML =""+ operationStack[0];

//Pop the last element of the stack to make space for further elements.
 operationStack.pop();

}


 
