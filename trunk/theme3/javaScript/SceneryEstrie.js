//Représente un paysage
function SceneryEstrie(parentDomElementName)
{
	//Element DOM parent pour mettre les composantes graphiques
	this.parentDomElementName = parentDomElementName;
	
	//Fields
	this.isShowLampLeft;
	this.isShowLampRight;
	
	//Éléments de construction
	this.setBackgroundStyle();
	this.createLamps();
}

SceneryEstrie.prototype.reset = function SceneryEstrie_reset()
{
	this.isShowLampLeft = false;
	this.isShowLampRight = false;
	
	var lampStickA = document.getElementById("lampStickA");
	var lampStickSideA = document.getElementById("lampStickSideA");
	var lampLampA = document.getElementById("lampLampA");
	var lampStickB = document.getElementById("lampStickB");
	var lampStickSideB = document.getElementById("lampStickSideB");
	var lampLampB = document.getElementById("lampLampB");
	lampStickA.style.visibility = "hidden";
	lampStickSideA.style.visibility = "hidden";
	lampLampA.style.visibility = "hidden";
	lampStickB.style.visibility = "hidden";
	lampStickSideB.style.visibility = "hidden";
	lampLampB.style.visibility = "hidden";
}

SceneryEstrie.prototype.animateSceneryElements = function SceneryEstrie_animateSceneryElements(elementId, time, segmentHeight, marginLeft, topPosition, segmentWidth, sinYOffset)
{
	this.animateLine(elementId, time, sinYOffset, segmentWidth,segmentHeight);
	this.animateLamps(elementId, time, segmentHeight, marginLeft, topPosition, segmentWidth);
}

SceneryEstrie.prototype.getTrackColor = function SceneryEstrie_getTrackColor(elementId, currentTime, sinYOffset)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return this.getBridgeColor(elementId, currentTime);
	else
		return this.getRoadColor(elementId, currentTime);
}

SceneryEstrie.prototype.setBackgroundStyle = function SceneryEstrie_setBackgroundStyle()
{
	var parentComponent = document.getElementById(this.parentDomElementName);
	parentComponent.backgroundColor = "#0AF";
}

SceneryEstrie.prototype.isFellOut = function SceneryEstrie_isFellOut(elementId, currentTime, height)
{
	return this.isBridge(elementId, currentTime, height);
}

SceneryEstrie.prototype.getSegmentColor = function SceneryEstrie_getSegmentColor(elementId, currentTime, sinYOffset, absoluteTime)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return this.getWaterColor(elementId, currentTime);
	else
		return this.getGrassColor(elementId, currentTime);
}

SceneryEstrie.prototype.getSegmentZIndex = function SceneryEstrie_getSegmentZIndex(elementId, currentTime, sinYOffset)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return 70 - elementId;
	else
		return 100 - elementId;
}

SceneryEstrie.prototype.getRoadSegmentHeight = function SceneryEstrie_getRoadSegmentHeight(elementId, currentTime, sinYOffset, segmentHeight)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return segmentHeight + 50;
	else
		return segmentHeight + 10;
}

SceneryEstrie.prototype.buildTrack = function SceneryEstrie_buildTrack(value)
{
	var track = new Track();
	track.hillAmplitude1 = Math.random()*20 + 25;
	track.hillAmplitude2 = Math.random()*20 + 25;
	track.hillAmplitude3 = Math.random()*20 + 25;
	track.hillAmplitude4 = Math.random()*20 + 55;
	track.hillPhase1 = Math.random()*200 - 100;
	track.hillPhase2 = Math.random()*200 - 100;
	track.hillPhase3 = Math.random()*200 - 100;
	track.hillPhase4 = Math.random()*200 - 100;
	track.hillFreq1 = Math.random()*0.01 + 0.095;
	track.hillFreq2 = Math.random()*0.01 + 0.045;
	track.hillFreq3 = Math.random()*0.01 + 0.095;
	track.hillFreq4 = Math.random()*0.001 + 0.01;
	
	track.curveAmplitude1 = Math.random()*10 + 95;
	track.curveAmplitude2 = Math.random()*10 + 95;
	track.curveAmplitude3 = Math.random()*100 + 950;
	track.curveAmplitude4 = Math.random()*200 + 1900;
	track.curvePhase1 = Math.random()*200 - 100;
	track.curvePhase2 = Math.random()*200 - 100;
	track.curvePhase3 = Math.random()*200 - 100;
	track.curvePhase4 = Math.random()*200 - 100;
	track.curveFreq1 = Math.random()*0.02 + 0.12;
	track.curveFreq2 = Math.random()*0.02 + 0.10;
	track.curveFreq3 = Math.random()*0.002 + 0.002;
	track.curveFreq4 = Math.random()*0.002 + 0.002;
	
	track.difficultyDivisorY = Math.random()*2000 + 9000;
	track.difficultyDivisorX = Math.random()*2000 + 9000;
	return track;
}

SceneryEstrie.prototype.getTrackWidth = function SceneryEstrie_getTrackWidth()
{
	return 1800;
}

SceneryEstrie.prototype.createLamps = function SceneryEstrie_createLamps()
{
	var parentDomElement = document.getElementById(this.parentDomElementName);
	
	var lampStickA = document.createElement('div');
	lampStickA.className = "LampStick";
	lampStickA.setAttribute("id", "lampStickA");
	parentDomElement.appendChild(lampStickA);
	
	var lampStickB = document.createElement('div');
	lampStickB.className = "LampStick";
	lampStickB.setAttribute("id", "lampStickB");
	parentDomElement.appendChild(lampStickB);
	
	var lampStickSideA = document.createElement('div');
	lampStickSideA.className = "LampStickSide";
	lampStickSideA.setAttribute("id", "lampStickSideA");
	parentDomElement.appendChild(lampStickSideA);
	
	var lampStickSideB = document.createElement('div');
	lampStickSideB.className = "LampStickSide";
	lampStickSideB.setAttribute("id", "lampStickSideB");
	parentDomElement.appendChild(lampStickSideB);
	
	var lampLampA = document.createElement('div');
	lampLampA.className = "LampLamp";
	lampLampA.setAttribute("id", "lampLampA");
	parentDomElement.appendChild(lampLampA);
	
	var lampLampB = document.createElement('div');
	lampLampB.className = "LampLamp";
	lampLampB.setAttribute("id", "lampLampB");
	parentDomElement.appendChild(lampLampB);
}

SceneryEstrie.prototype.animateLamps = function SceneryEstrie_animateLamps(elementId, currentTime, segmentHeight, marginLeft, topPosition, segmentWidth)
{
	var isLampLeftBool = this.isLamp(elementId, currentTime, true);
	var isLampRightBool = this.isLamp(elementId, currentTime, false);
	
	if ((!isLampLeftBool && !isLampRightBool) || (this.isShowLampLeft && this.isShowLampRight))
		return;

	var lampStickHeight = segmentHeight * 30;
	var lampLampHeight = segmentHeight;
	var lampLampWidth = segmentHeight * 2.5;
	var lampStickSideWidth = segmentHeight * 5;
	var lampStickA = document.getElementById("lampStickA");
	var lampStickSideA = document.getElementById("lampStickSideA");
	var lampLampA = document.getElementById("lampLampA");
	var lampStickB = document.getElementById("lampStickB");
	var lampStickSideB = document.getElementById("lampStickSideB");
	var lampLampB = document.getElementById("lampLampB");
	var lampStickWidth = segmentHeight / 2;
	
	if (!this.isShowLampLeft && isLampLeftBool)
	{
		lampStickA.style.height = lampStickHeight + "px";
		lampStickA.style.width = lampStickWidth + "px";
		lampStickA.style.zIndex = (100 - elementId);
		lampStickA.style.marginLeft = marginLeft-400 +"px";
		lampStickA.style.top = topPosition - lampStickHeight  +"px";
		lampStickA.style.visibility = "visible";
		
		lampStickSideA.style.height = lampStickWidth + "px";
		lampStickSideA.style.width = lampStickSideWidth + "px";
		lampStickSideA.style.zIndex = (100 - elementId);
		lampStickSideA.style.marginLeft = marginLeft-400 +lampStickWidth + "px";
		lampStickSideA.style.top = topPosition - lampStickHeight + "px";
		lampStickSideA.style.visibility = "visible";
		
		lampLampA.style.height = lampLampHeight + "px";
		lampLampA.style.width = lampLampWidth + "px";
		lampLampA.style.zIndex = (100 - elementId);
		lampLampA.style.marginLeft = marginLeft-400 +lampStickWidth +lampLampWidth+ "px";
		lampLampA.style.top = topPosition - lampStickHeight + "px";
		lampLampA.style.visibility = "visible";
		
		this.isShowLampLeft = true;
	}

	if (!this.isShowLampRight && isLampRightBool)
	{
		lampStickB.style.height = lampStickHeight + "px";
		lampStickB.style.width = lampStickWidth + "px";
		lampStickB.style.zIndex = (100 - elementId);
		lampStickB.style.marginLeft = marginLeft-400 + segmentWidth + lampStickWidth +"px";
		lampStickB.style.top = topPosition - lampStickHeight +"px";
		lampStickB.style.visibility = "visible";
		
		lampStickSideB.style.height = lampStickWidth + "px";
		lampStickSideB.style.width = lampStickSideWidth + "px";
		lampStickSideB.style.zIndex = (100 - elementId);
		lampStickSideB.style.marginLeft = marginLeft-400 + segmentWidth - lampStickSideWidth + lampStickWidth + "px";
		lampStickSideB.style.top = topPosition - lampStickHeight + "px";
		lampStickSideB.style.visibility = "visible";
		
		lampLampB.style.height = lampLampHeight + "px";
		lampLampB.style.width = lampLampWidth + "px";
		lampLampB.style.zIndex = (100 - elementId);
		lampLampB.style.marginLeft = marginLeft-400 + segmentWidth - lampLampWidth*2 + lampStickWidth + "px";
		lampLampB.style.top = topPosition - lampStickHeight +"px";
		lampLampB.style.visibility = "visible";
		
		this.isShowLampRight = true;
	}
}

SceneryEstrie.prototype.getBridgeColor = function SceneryEstrie_getBridgeColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 128;
	opacity -= elementId *2;
	
	opacity += this.getSinWoodShade(elementId + currentTime);
	
	opacity = Math.round(opacity);
	
	blue = opacity;
	red = opacity * 1.5;
	green = opacity * 1.33;
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	green = GraphicsCommon.makeColorValid(green);
	red = GraphicsCommon.makeColorValid(red);
	
	return "rgb(" + red + "," + green  + "," + blue + ")";
}

SceneryEstrie.prototype.getLineColor = function SceneryEstrie_getLineColor(elementId)
{
	var opacity = 255;
	opacity -= elementId *2;
	
	if (opacity < 0)
		opacity = 0;
	return "rgb(" + opacity + "," + opacity  + "," + opacity + ")";
}

SceneryEstrie.prototype.getGrassColor = function SceneryEstrie_getGrassColor(elementId, currentTime)
{
	var green = 255;
	green -= elementId *3;
	
	green += this.getSinRoadShade(elementId + currentTime);
	green = GraphicsCommon.makeColorValid(green);

	return "rgb(10," + green  + ",10)";
}

SceneryEstrie.prototype.getWaterColor = function SceneryEstrie_getWaterColor(elementId, currentTime)
{
	var blue = 192;
	var red = 0;
	var green = 0;
	
	blue -= elementId *3;
	blue += this.getSinWaterShade(elementId + currentTime);
	
	if (blue < 64)
		blue+=128;
	
	if (blue > 144)
	{
		red = blue / 3;
		green = blue / 2;
	}
	
	blue = GraphicsCommon.makeColorValid(blue);
	red = GraphicsCommon.makeColorValid(red);
	green = GraphicsCommon.makeColorValid(green);
	return "rgb(" + red + "," + green + ","+ blue +")";
}

SceneryEstrie.prototype.getSinRoadShade = function SceneryEstrie_getSinRoadShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 6;
}

SceneryEstrie.prototype.getSinWoodShade = function SceneryEstrie_getSinWoodShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 3.7) * 5.5 + Math.sin((value) * 0.3) * 30 + Math.sin((value + 17.1) * 0.7) * 3.5;
}

SceneryEstrie.prototype.getSinWaterShade = function SceneryEstrie_getSinWaterShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 40;
}

SceneryEstrie.prototype.getSinRoadShadeOverPass = function SceneryEstrie_getSinRoadShadeOverPass(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 25;
}

SceneryEstrie.prototype.isLamp = function SceneryEstrie_isLamp(elementId, currentTime, isLeft)
{
	if (isLeft)
		return Math.round(elementId + currentTime) % 96 == 0;
	else
		return Math.round(elementId + currentTime) % 96 == 48;
}

SceneryEstrie.prototype.isBridge = function SceneryEstrie_isBridge(elementId, currentTime, height)
{
	return height < -1.75 && Math.round((elementId + currentTime) / 50) % 8 == 3;
}

SceneryEstrie.prototype.getRoadColor = function SceneryEstrie_getRoadColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 128;
	opacity -= elementId *2;
	
	opacity += this.getSinRoadShade(elementId + currentTime);
	
	opacity = Math.round(opacity);
	
	blue = opacity;
	red = opacity;
	green = opacity;
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	green = GraphicsCommon.makeColorValid(green);
	red = GraphicsCommon.makeColorValid(red);
	
	return "rgb(" + red + "," + green  + "," + blue + ")";
}

SceneryEstrie.prototype.getLineWidth = function SceneryEstrie_getLineWidth(segmentWidth)
{
	return segmentWidth / 50;
}

SceneryEstrie.prototype.animateLine = function SceneryEstrie_animateLine(elementId, currentTime, sinYOffset, segmentWidth,segmentHeight)
{
	var lineSegment = document.getElementById("lineSegment" + elementId);
	if (this.isBridge(elementId, currentTime, sinYOffset))
	{
		lineSegment.style.visibility="hidden";
	}
	else
	{
		var lineWidth = this.getLineWidth(segmentWidth);	
		lineSegment.style.backgroundColor = this.getLineColor(elementId);
		lineSegment.style.width = lineWidth + "px";
		lineSegment.style.marginLeft = segmentWidth / 2 - (lineWidth / 2) + "px";
		lineSegment.style.height = segmentHeight + 10+ "px";
		lineSegment.style.visibility="visible";
	}
}