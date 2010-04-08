var isIE = document.all?true:false;

if (!isIE) document.captureEvents(Event.MOUSEMOVE)

function initAnimation()
{
	var chatPageDiv = document.getElementById("chatPage");
	
	addLayer(chatPageDiv, "div", "LayerImage", "layer001Image");
	addLayer(chatPageDiv, "div", "LayerImage", "layer002Image");
	addLayer(chatPageDiv, "div", "LayerImage", "layer003Image");
	addLayer(chatPageDiv, "div", "LayerImage", "layer004Image");
	addLayer(chatPageDiv, "div", "LayerImage", "layer005Image");
	addLayer(chatPageDiv, "div", "LayerImage", "layer006Image");

	animateAllLayers();
}

function addLayer(parentDiv, domType, className, elementId)
{
	/*var layerDiv = document.createElement('div');
	layerDiv.className = className;//layerDiv.setAttribute("class", className);
	layerDiv.setAttribute("id", elementId);
	parentDiv.appendChild(layerDiv);*/
	parentDiv.innerHTML = "<" + domType + " class='" + className + "' id='" + elementId + "'></" + domType + ">" + parentDiv.innerHTML;
}

function animateAllLayers()
{
	animateLayer(document.getElementById("layer002Image"),8, 2200, -92);
	animateLayer(document.getElementById("layer003Image"),6, 2200, 0);
	animateLayer(document.getElementById("layer004Image"),4, 1452, 0);
	animateLayer(document.getElementById("layer005Image"),2, 1377, 0);
	animateLayer(document.getElementById("layer006Image"),1, 1666, 0);
	
	setTimeout("animateAllLayers()", 30);
}

function animateLayer(layerDiv, speed, width, newPosition)
{
	var position = layerDiv.offsetLeft;

	position -= speed;
	
	if (position < (width * -1))
		position = newPosition;
	
	
	layerDiv.style.left = position + "px";
}