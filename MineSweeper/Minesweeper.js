$(document).ready(function(){

var  board = makeBoard(8,8,10);
renderBoard(board);

function getBoard(){
	return board;
}
	
});

function makeBoard(rows,cols,mines)
{
var i,j;

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
debugger;
//Adding mines and filling board.

var mineArray = [];
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
 $("#mineBoard").append('<td><button id='+buttonId+'>'+board[i][j]+'</button></td>');
 $('#'+buttonId).click(buttonClicked);
 

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
    $('#'+this.id).css("font-size","inherit");
}


function revealAdjacent(x,y,isVisited)
{
	var checkArr = [];
	checkArr.push(parseInt(x));
	checkArr.push(parseInt(y));
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
 	
 	var adjacentRow = x+adjacentElems[index][0];
	var adjacentCol = y+adjacentElems[index][1];
    arr.push(adjacentRow);
    arr.push(adjacentCol);
 if(isVisited.indexOf(arr)==-1)  
 {
if(adjacentRow>=0&&adjacentRow<=board.length&&adjacentCol>=0&&adjacentCol<=board[0].length)
{

	if(board[adjacentRow][adjacentCol]==0)
	{
		$('#'+x+y).css("font-size","inherit");
		revealAdjacent(adjacentRow,adjacentCol,isVisited);
	}
	else
	{
	 	if(board[adjacentRow][adjacentCol]>0)
	    $('#'+adjacentRow+adjacentCol).css("font-size","inherit");
    }
	
}
}

 }

}
}



