//Représente un paysage
function SceneryMiami(parentDomElementName)
{
	//Element DOM parent pour mettre les composantes graphiques
	this.parentDomElementName = parentDomElementName;
	
	//Fields
	this.isShowPalmLeft;
	this.isShowPalmRight;
	
	//Éléments de construction
	this.setBackgroundStyle();
	this.createPalms();
}

SceneryMiami.prototype.reset = function SceneryMiami_reset()
{
	this.isShowPalmLeft = false;
	this.isShowPalmRight = false;
	
	document.getElementById("palmAStick").style.visibility = "hidden";
	document.getElementById("palmALeaf1").style.visibility = "hidden";
	document.getElementById("palmALeaf2").style.visibility = "hidden";
	
	document.getElementById("palmBStick").style.visibility = "hidden";
	document.getElementById("palmBLeaf1").style.visibility = "hidden";
	document.getElementById("palmBLeaf2").style.visibility = "hidden";
}

SceneryMiami.prototype.animateSceneryElements = function SceneryMiami_animateSceneryElements(elementId, time, segmentHeight, marginLeft, topPosition, segmentWidth, sinYOffset)
{
	this.animatePalms(elementId, time, segmentHeight, marginLeft, topPosition, segmentWidth);
}

SceneryMiami.prototype.getTrackColor = function SceneryMiami_getTrackColor(elementId, currentTime, sinYOffset)
{
	return this.getRoadColor(elementId, currentTime);
}

SceneryMiami.prototype.setBackgroundStyle = function SceneryMiami_setBackgroundStyle()
{
	var parentComponent = document.getElementById(this.parentDomElementName);
	parentComponent.backgroundColor = "#0AF";
}

SceneryMiami.prototype.isFellOut = function SceneryMiami_isFellOut(elementId, currentTime, height)
{
	return this.isBridge(elementId, currentTime, height);
}

SceneryMiami.prototype.getSegmentColor = function SceneryMiami_getSegmentColor(elementId, currentTime, sinYOffset, absoluteTime)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return this.getWaterColor(elementId, currentTime);
	else
		return this.getSandColor(elementId, currentTime);
}

SceneryMiami.prototype.getSegmentZIndex = function SceneryMiami_getSegmentZIndex(elementId, currentTime, sinYOffset)
{
	return 100 - elementId
	
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return 90 - elementId;
	else
		return 100 - elementId;
}

SceneryMiami.prototype.getRoadSegmentHeight = function SceneryMiami_getRoadSegmentHeight(elementId, currentTime, sinYOffset, segmentHeight)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return segmentHeight + 50;
	else
		return segmentHeight + 10;
}

SceneryMiami.prototype.buildTrack = function SceneryMiami_buildTrack(value)
{
	var track = new Track();
	track.hillAmplitude1 = Math.random()*1 + 0.25;
	track.hillAmplitude2 = Math.random()*1 + 0.25;
	track.hillAmplitude2 = Math.random()*1 + 0.25;
	track.hillAmplitude2 = Math.random()*1 + 0.25;
	track.hillPhase1 = Math.random()*200 - 100;
	track.hillPhase2 = Math.random()*200 - 100;
	track.hillPhase3 = Math.random()*200 - 100;
	track.hillPhase4 = Math.random()*200 - 100;
	track.hillFreq1 = Math.random()*0.1 + 0.95;
	track.hillFreq2 = Math.random()*0.1 + 0.45;
	track.hillFreq2 = Math.random()*0.1 + 0.45;
	track.hillFreq2 = Math.random()*0.1 + 0.45;
	
	track.curveAmplitude1 = Math.random()*.5 + 5.95;
	track.curveAmplitude2 = Math.random()*.5 + 5.95;
	track.curveAmplitude3 = Math.random()*100 + 950;
	track.curveAmplitude4 = Math.random()*200 + 1900;
	track.curvePhase1 = Math.random()*200 - 100;
	track.curvePhase2 = Math.random()*200 - 100;
	track.curvePhase3 = Math.random()*200 - 100;
	track.curvePhase4 = Math.random()*200 - 100;
	track.curveFreq1 = Math.random()*0.1 + 1.4;
	track.curveFreq1 = Math.random()*0.1 + 1.4;
	track.curveFreq3 = Math.random()*0.002 + 0.004;
	track.curveFreq4 = Math.random()*0.002 + 0.004;
	
	track.difficultyDivisorY = 1000000;
	track.difficultyDivisorX = 1000000;
	return track;
}

SceneryMiami.prototype.getTrackWidth = function SceneryMiami_getTrackWidth()
{
	return 2400;
}

SceneryMiami.prototype.createPalms = function SceneryMiami_createPalms()
{
	var parentDomElement = document.getElementById(this.parentDomElementName);
	
	var palmAStick = document.createElement('div');
	palmAStick.className = "PalmStick";
	palmAStick.setAttribute("id", "palmAStick");
	parentDomElement.appendChild(palmAStick);
	
	var palmALeaf1 = document.createElement('div');
	palmALeaf1.className = "PalmLeaf";
	palmALeaf1.setAttribute("id", "palmALeaf1");
	parentDomElement.appendChild(palmALeaf1);
	
	var palmALeaf2 = document.createElement('div');
	palmALeaf2.className = "PalmLeaf";
	palmALeaf2.setAttribute("id", "palmALeaf2");
	parentDomElement.appendChild(palmALeaf2);
	
	var palmBStick = document.createElement('div');
	palmBStick.className = "PalmStick";
	palmBStick.setAttribute("id", "palmBStick");
	parentDomElement.appendChild(palmBStick);
	
	var palmBLeaf1 = document.createElement('div');
	palmBLeaf1.className = "PalmLeaf";
	palmBLeaf1.setAttribute("id", "palmBLeaf1");
	parentDomElement.appendChild(palmBLeaf1);
	
	var palmBLeaf2 = document.createElement('div');
	palmBLeaf2.className = "PalmLeaf";
	palmBLeaf2.setAttribute("id", "palmBLeaf2");
	parentDomElement.appendChild(palmBLeaf2);
}

SceneryMiami.prototype.animatePalms = function SceneryMiami_animatePalms(elementId, currentTime, segmentHeight, marginLeft, topPosition, segmentWidth)
{
	var isLampLeftBool = this.isLamp(elementId, currentTime, true);
	var isLampRightBool = this.isLamp(elementId, currentTime, false);
	
	if ((!isLampLeftBool && !isLampRightBool) || (this.isShowPalmLeft && this.isShowPalmRight))
		return;

	var palmHeight = segmentHeight * 30;
	var leaf1Height = segmentHeight;
	var leaf1Width = segmentHeight * 10;
	var lampStickSideWidth = segmentHeight * 5;
	var lampStickA = document.getElementById("palmAStick");
	var lampStickSideA = document.getElementById("palmALeaf1");
	var lampLampA = document.getElementById("palmALeaf2");
	var lampStickB = document.getElementById("palmBStick");
	var lampStickSideB = document.getElementById("palmBLeaf1");
	var lampLampB = document.getElementById("palmBLeaf2");
	var lampStickWidth = segmentHeight;
	
	if (!this.isShowPalmLeft && isLampLeftBool)
	{
		lampStickA.style.height = palmHeight + "px";
		lampStickA.style.width = lampStickWidth + "px";
		lampStickA.style.zIndex = (100 - elementId);
		lampStickA.style.marginLeft = marginLeft-400 +"px";
		lampStickA.style.top = topPosition - palmHeight  +"px";
		lampStickA.style.visibility = "visible";
		
		lampStickSideA.style.height = leaf1Width * 0.75 + "px";
		lampStickSideA.style.width = leaf1Height + "px";
		lampStickSideA.style.zIndex = (100 - elementId);
		lampStickSideA.style.marginLeft = marginLeft-400+lampStickWidth +"px";
		lampStickSideA.style.top = topPosition - palmHeight - lampStickWidth*2 + "px";
		lampStickSideA.style.visibility = "visible";
		
		lampLampA.style.height = leaf1Height + "px";
		lampLampA.style.width = leaf1Width + "px";
		lampLampA.style.zIndex = (101 - elementId);
		lampLampA.style.marginLeft = marginLeft- 400 - leaf1Width /2 +  "px";
		lampLampA.style.top = topPosition - palmHeight + "px";
		lampLampA.style.visibility = "visible";
		
		this.isShowPalmLeft = true;
	}

	if (!this.isShowPalmRight && isLampRightBool)
	{
		lampStickB.style.height = palmHeight + "px";
		lampStickB.style.width = lampStickWidth + "px";
		lampStickB.style.zIndex = (100 - elementId);
		lampStickB.style.marginLeft = marginLeft-400 + segmentWidth + lampStickWidth +"px";
		lampStickB.style.top = topPosition - palmHeight +"px";
		lampStickB.style.visibility = "visible";
		
		lampStickSideB.style.height = leaf1Width * 0.75 + "px";
		lampStickSideB.style.width = leaf1Height + "px";
		lampStickSideB.style.zIndex = (100 - elementId);
		lampStickSideB.style.marginLeft = marginLeft-400 + segmentWidth +"px";
		lampStickSideB.style.top = topPosition - palmHeight - lampStickWidth*2 + "px";
		lampStickSideB.style.visibility = "visible";
		
		lampLampB.style.height = leaf1Height + "px";
		lampLampB.style.width = leaf1Width + "px";
		lampLampB.style.zIndex = (101 - elementId);
		lampLampB.style.marginLeft = marginLeft-400 + segmentWidth - leaf1Width/2 + (lampStickWidth/2) + "px";
		lampLampB.style.top = topPosition - palmHeight +"px";
		lampLampB.style.visibility = "visible";
		
		this.isShowPalmRight = true;
	}
}

SceneryMiami.prototype.getSandColor = function SceneryMiami_getGrassColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 128;
	opacity -= elementId *2;
	
	opacity += this.getSinSandShade(elementId + currentTime);
	
	opacity = Math.round(opacity);
	
	blue = opacity;
	red = opacity * 1.6;
	green = opacity * 1.5;
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	green = GraphicsCommon.makeColorValid(green);
	red = GraphicsCommon.makeColorValid(red);
	
	return "rgb(" + red + "," + green  + "," + blue + ")";
}

SceneryMiami.prototype.getWaterColor = function SceneryMiami_getWaterColor(elementId, currentTime)
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

SceneryMiami.prototype.getSinRoadShade = function SceneryMiami_getSinRoadShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 6;
}

SceneryMiami.prototype.getSinSandShade = function SceneryMiami_getSinSandShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 6;
}

SceneryMiami.prototype.getSinWaterShade = function SceneryMiami_getSinWaterShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 40;
}

SceneryMiami.prototype.getSinRoadShadeOverPass = function SceneryMiami_getSinRoadShadeOverPass(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 25;
}

SceneryMiami.prototype.isLamp = function SceneryMiami_isLamp(elementId, currentTime, isLeft)
{
	if (isLeft)
		return Math.round(elementId + currentTime) % 96 == 0;
	else
		return Math.round(elementId + currentTime) % 81 == 48;
}

SceneryMiami.prototype.isBridge = function SceneryMiami_isBridge(elementId, currentTime, height)
{
	return height < -1.75 && Math.round((elementId + currentTime) / 50) % 8 != 3;
}

SceneryMiami.prototype.getRoadColor = function SceneryMiami_getRoadColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 128;
	opacity -= elementId *2;
	
	opacity += this.getSinRoadShade(elementId + currentTime);
	
	opacity = Math.round(opacity);
	
	blue = opacity;
	red = opacity * 1.4;
	green = opacity * 1.25;
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	green = GraphicsCommon.makeColorValid(green);
	red = GraphicsCommon.makeColorValid(red);
	
	return "rgb(" + red + "," + green  + "," + blue + ")";
}