$(document).ready(function(){

 
 var timerFunc;
 var  board;
 var mineArray;
 var unOpenedCells;
 var totalCells;
 var openedMatrix;
 initialiseGame();

	
});

function initialiseGame()
{
$("#startButton").empty();
$("#timer").empty();
timerFunc = null;
$("table").empty()
board = makeBoard(8,8,10);
renderBoard(board);
$("#content").hide();
 $("#startButton").html("Click to start!");
 $("#startButton").click(startGame);

}


function makeBoard(rows,cols,mines)
{
var i,j;
 totalCells = rows*cols;
 var adjacentElems = {
 	t:[-1,0],
 	tr:[-1,1],
 	r:[0,1],
 	br:[1,1],
 	b:[1,0],
 	bl:[1,-1],
 	l:[0,-1],
 	tl:[-1,-1]

 }

//Helper function to initialise matrix
Array.matrix = function(numRows,numCols,initial)
{
	var arr = [];
	for(var i=0;i<numRows;i++)
	{
	  var columns = [];
     for(var j=0;j<numCols;j++)
     {
     	columns[j]=initial;
     }
     arr[i] = columns;
	}

	 return arr;
}

//Making empty board of size 8x8 here.
var board = Array.matrix(8,8,0);
openedMatrix = Array.matrix(8,8,0);
//Adding mines and filling board.

   mineArray = [];
var rowCol;
var randRow, randCol;
var isMarked;

for(i=1;i<=mines;i++)
{
     rowCol = [];
     isMarked = true;
     //Assume the random mine generated is already present at the location
     //This makes sure that no two mines are placed on the same spot 
     while(isMarked)
     {
	 randRow=Math.floor(Math.random()*(rows));
	 randCol=Math.floor(Math.random()*(cols));
	 if(board[randRow][randCol]!=-1)
	 isMarked = false;
     }
    //Adding mine here (-1 Represents a mine)
	board[randRow][randCol] = -1;
	rowCol.push(randRow,randCol);
	mineArray.push(rowCol);
	
}
//After mines have been added, fill the matrix with surrounding elements of the mine
mineArray.forEach(function(minePos){
fillAdjacent(minePos[0],minePos[1],board,adjacentElems);
});
console.log(board);
return board;
}

function fillAdjacent(curRow,curCol,board,adjacentElems)
{

var i;
var allPositions = Object.keys(adjacentElems);

//Iterate through all 8 possible surrounding elements (clockwise)
allPositions.forEach(function(position){
	//Calculate row and column to be changed
	var adjacentRow = curRow+adjacentElems[position][0];
	var adjacentCol = curCol+adjacentElems[position][1];
	//Check if row and column calculated don't exceed boundary cases, and the element is not a mine.
  if(adjacentRow>=0&&adjacentRow<board[0].length)
  	if(adjacentCol>=0&&adjacentCol<board[0].length)
  		if(board[adjacentRow][adjacentCol]>=0)
  			board[adjacentRow][adjacentCol]+=1;
  	});
  

}


function renderBoard(board)
{
 
 var i ,j;
 for(i=0;i<board.length;i++)
 {
 $("#mineBoard").append('<tr>');
 for(j=0;j<board[i].length;j++)
 {
 var buttonId = ''+i+''+j;
 $("#mineBoard").append('<td><button class="noselect" id='+buttonId+'>'+board[i][j]+'</button></td>');
 $('#'+buttonId).click(buttonClicked);
 var button = document.getElementById(buttonId);
 button.addEventListener('contextmenu',function(ev){
 	debugger;
 	ev.preventDefault();
 	var buttonId = this.id;
 	 var color = $("#"+buttonId).css("background-color");
 	 if(color=="rgb(237, 237, 237)")
 	 	$("#"+buttonId).css("background-color","red");
 	 else
 	 	 $("#"+buttonId).css("background-color","#ededed");
 	 	return false;
 },false);
 

 }
 $("#mineBoard").append('</tr>');

}
function buttonClicked()
{
	console.log(this.id);
	var id = this.id;
	var index = id.split('');
	var curElem = board[index[0]][index[1]];
	if(curElem==0)
	revealAdjacent(index[0],index[1],[]);
	else
	if(board[index[0]][index[1]]>0)
	{
        if(board[index[0]][index[1]]==1)
	    $('#'+index[0]+index[1]).css("color","black");
		if(board[index[0]][index[1]]==2)
	    $('#'+index[0]+index[1]).css("color","blue");
		if(board[index[0]][index[1]]>2)
	    $('#'+index[0]+index[1]).css("color","red");
	    $("#"+index[0]+index[1]).css("background-color","#ededed");
	    $('#'+index[0]+index[1]).css("opacity","0.4");
	    $('#'+index[0]+index[1]).attr("disabled","disabled");
	    openedMatrix[index[0]][index[1]]=1;
    }
    else{
    debugger;
     $('#'+index[0]+index[1]).css("background-color","red");
     endGame(false,timerFunc);
    }
    var count = 0;
    for(var i =0;i<openedMatrix.length;i++)
     for(var j =0;j<openedMatrix[i].length;j++)
     	if(openedMatrix[i][j]==0)
     		count++;

     if(count==mineArray.length)
     	endGame(true,timerFunc);
 }
	   
    
    



function revealAdjacent(x,y,isVisited)
{
	var checkArr = [];
	checkArr.push(parseInt(x));
	checkArr.push(parseInt(y));
	if(board[x][y]==0)
	{
    $('#'+x+y).attr("disabled","disabled");
	$('#'+x+y).css("opacity","0.4");
	 openedMatrix[x][y]=1;
     }

	isVisited.push(checkArr);
	var adjacentElems = {
 	t:[-1,0],
 	tr:[-1,1],
 	r:[0,1],
 	br:[1,1],
 	b:[1,0],
 	bl:[1,-1],
 	l:[0,-1],
 	tl:[-1,-1]

 }

 for(index in adjacentElems)
 {
 	x = parseInt(x);
 	y = parseInt(y);
 	var arr = [];
 	var marked = false;
 	var adjacentRow = x+adjacentElems[index][0];
	var adjacentCol = y+adjacentElems[index][1];
    arr.push(adjacentRow);
    arr.push(adjacentCol);

    for(var i = 0;i<isVisited.length;i++)
	if(isVisited[i][0]==arr[0]&&isVisited[i][1]==arr[1])
	   marked = true;
    
 if(!marked)  
 {
if(adjacentRow>=0&&adjacentRow<board.length&&adjacentCol>=0&&adjacentCol<board[0].length)
{

	if(board[adjacentRow][adjacentCol]==0)
	{
		//$('#'+adjacentRow+adjacentCol).css("font-size","inherit");
		//$('#'+adjacentRow+adjacentCol).focus();
	    $('#'+adjacentRow+adjacentCol).attr("disabled","disabled");
	    $("#"+adjacentRow+adjacentCol).css("background-color","#ededed");
	    $('#'+adjacentRow+adjacentCol).css("opacity","0.4");
	     openedMatrix[adjacentRow][adjacentCol]=1;
		revealAdjacent(adjacentRow,adjacentCol,isVisited);
	}
	else
	{
	 	if(board[adjacentRow][adjacentCol]==1)
	    $('#'+adjacentRow+adjacentCol).css("color","black");
		if(board[adjacentRow][adjacentCol]==2)
	    $('#'+adjacentRow+adjacentCol).css("color","blue");
		if(board[adjacentRow][adjacentCol]>2)
	    $('#'+adjacentRow+adjacentCol).css("color","red");
         openedMatrix[adjacentRow][adjacentCol]=1;
       $("#"+adjacentRow+adjacentCol).css("background-color","#ededed");
	   $('#'+adjacentRow+adjacentCol).css("opacity","0.4");
	   $('#'+adjacentRow+adjacentCol).attr("disabled","disabled");
	 	//$('#'+adjacentRow+adjacentCol).focus();

    }
	
}
}

 }

}
}


function startGame()
{
	$("#content").show();
	startTimer(10);
	$("#startButton").toggle();

}

function startTimer(maxMinutes)
{
  //ten minutes interval initially
  //var intervalInMinutes = 60 * maxMinutes;
  clearInterval(timerFunc);
  var minutes,seconds;
  minutes = 0,seconds =0;

 timerFunc = setInterval(function(){
 	if(seconds/60==1)
 	minutes = parseInt(minutes)+1;
 	
  minutes = parseInt(minutes);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = parseInt(seconds % 60, 10);

  seconds = seconds < 10 ? "0" + seconds : seconds;
  $("#timer").html(minutes+":"+seconds);
  seconds++;
   if (seconds == 300) {
           // timer = intervalInMinutes;
            endGame(false,timerFunc);
        }
   }, 1000);
 
 
}




function endGame(isWin,timerFunc)
{
	debugger;
	clearInterval(timerFunc);
	var time = $("#timer").text();
	var strTime  = time.split(":");
	var minutes = strTime[0]
	var seconds = strTime[1]
	

	if(minutes==9&&seconds==60)
	{
		minutes = 10;
		seconds = 0;
	}



 if(!isWin)

 {
 window.alert("You lost,and you took "+minutes+" minutes and "+seconds+" seconds to play. What a loser.");
 for(var i =0;i<board.length;i++)
 	for(var j=0;j<board[i].length;j++)
 	{
 		$('#'+i+j).attr("disabled","disabled");
 		$('#'+i+j).css("opacity","0.4");
 		if(board[i][j]==1)
	    $('#'+i+j).css("color","black");
		if(board[i][j]==2)
	    $('#'+i+j).css("color","blue");
		if(board[i][j]>2)
	    $('#'+i+j).css("color","red");
 	}

 for(var i=0;i<mineArray.length;i++)
 	    $('#'+mineArray[i][0]+mineArray[i][1]).css("background-color","red");
 }
if(isWin)
{
	 for(var i =0;i<board.length;i++)
 	for(var j=0;j<board[i].length;j++)
 	$('#'+i+j).attr("disabled","disabled");
window.alert("You won. Your time: "+time+" Feeling lucky? Punk?");
}
$("#startButton").unbind();
$("#startButton").html("Play again?");
$("#startButton").click(initialiseGame);
$("#startButton").toggle();

timerFunc = undefined;
//initialiseGame();
}


