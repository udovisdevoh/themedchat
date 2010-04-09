var isIE = document.all?true:false;
var desiredSquareCount = 100;
var freqX = Math.random()*100;
var freqY = Math.random()*100;
var freqX2 = Math.random()*100;
var freqY2 = Math.random()*100;


var redMultiplicator = Math.floor(Math.random()*255);
var greenMultiplicator = Math.floor(Math.random()*255);
var blueMultiplicator = Math.floor(Math.random()*255);

var ampX = Math.random()*7 + 3;
var ampY = Math.random()*7 + 3;
var ampX2 = Math.random()*7 + 3;
var ampY2 = Math.random()*7 + 3;
var phaseX = Math.random()*100;
var phaseY = Math.random()*100;
var phaseX2 = Math.random()*100;
var phaseY2 = Math.random()*100;

var ampWidth = Math.random()*7 + 3;
var ampHeight = Math.random()*7 + 3;
var phaseWidth = Math.random()*100;
var phaseHeight = Math.random()*100;
var freqWidth = Math.random()*100;
var freqHeight = Math.random()*100;

var timeDelta = 0;



//if (!isIE) document.captureEvents(Event.MOUSEMOVE)

function main()
{
	return;
	for (var squareCount = 0; squareCount < desiredSquareCount; squareCount++)
	{
		drawSquare(document.getElementById("chatPage"), getXPosition(squareCount,0), getYPosition(squareCount,0), getWidth(squareCount), getHeight(squareCount), getColor(squareCount), getZIndex(squareCount), squareCount);
	}
	
	setTimeout("animate()", 60);
}

function animate()
{
	for (var squareCount = 0; squareCount < desiredSquareCount; squareCount++)
	{
		var square = document.getElementById("RecursiveSquare" + squareCount);
		square.style.top = getYPosition(squareCount, timeDelta) + "px";
		square.style.left = getXPosition(squareCount, timeDelta) + "px";
		timeDelta+= 0.01;
		if (timeDelta == 32767)
			timeDelta = 0;
	}
		
	setTimeout("animate()", 60);
}

function drawSquare(parentDomElement, xPosition, yPosition, width, height, color, zIndex, elementId)
{
	var square = document.createElement('div');
	square.className = "RecursiveSquare";
	square.setAttribute("id", "RecursiveSquare" + elementId);
	square.style.borderStyle="solid";
	square.style.borderWidth="1px";
	square.style.borderColor="#000";
	square.style.backgroundColor=color;
	square.style.width = width + "px";
	square.style.height = height + "px";
	square.style.zIndex = zIndex;
	square.style.left = xPosition + "px";
	square.style.top = yPosition + "px";
	
	parentDomElement.appendChild(square);
}

function getXPosition(squareId, timeDelta)
{
	var sinValue1 = (Math.sin((squareId + timeDelta + phaseX) / ampX) * freqX);
	var sinValue2 = (Math.sin((squareId + timeDelta + phaseX2) / ampX2) * freqX2);

	return squareId * 7 + sinValue1 + sinValue2 - 400;
}

function getYPosition(squareId, timeDelta)
{
	var sinValue1 = (Math.sin((squareId + timeDelta + phaseY) / ampY) * freqY);
	var sinValue2 = (Math.sin((squareId + timeDelta + phaseY2) / ampY2) * freqY2);

	return squareId * 5 + sinValue1 + sinValue2;
}

function getWidth(squareId)
{
	var size = 400 - squareId * 4;
	
	size += (Math.sin((squareId + timeDelta + phaseWidth) / ampWidth) * freqWidth);
	
	size = Math.floor(size);
	
	if (size < 0)
		size = 0;
	return size;
}

function getHeight(squareId)
{
	var size = 400 - squareId * 4;
	
	size += (Math.sin((squareId + timeDelta + phaseHeight) / ampHeight) * freqHeight);
	
	size = Math.floor(size);
	
	if (size < 0)
		size = 0;
	return size;
}

function getColor(squareId)
{
	//return "rgb(" + (255 - squareId) * redMultiplicator + "," + (255 - squareId) * greenMultiplicator + "," + (255 - squareId) * blueMultiplicator + ")";
	
	var red = (redMultiplicator - squareId);
	if (red < 0)
		red += 64;
		
	var green = (greenMultiplicator - squareId);
	if (green < 0)
		green += 64;
		
	var blue = (blueMultiplicator - squareId);
	if (blue < 0)
		blue += 64;
	
	return "rgb(" + red + "," + green  + "," + blue + ")";
}

function getZIndex(squareId)
{
	return (squareId * -1) - 1;
}