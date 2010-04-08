//Représente une piste
function Track()
{
	this.hillAmplitude1 = 30;
	this.hillAmplitude2 = 30;
	this.hillAmplitude3 = 30;
	this.hillAmplitude4 = 60;
	this.hillPhase1 = 0;
	this.hillPhase2 = 10.43;
	this.hillPhase3 = 0;
	this.hillPhase4 = 10.43;
	this.hillFreq1 = 0.1;
	this.hillFreq2 = 0.05;
	this.hillFreq3 = 0.1;
	this.hillFreq4 = 0.0112;
	
	this.curveAmplitude1 = 100;
	this.curveAmplitude2 = 100;
	this.curveAmplitude3 = 1000;
	this.curveAmplitude4 = 2000;
	this.curvePhase1 = 0;
	this.curvePhase2 = 0;
	this.curvePhase3 = 0;
	this.curvePhase4 = 0;
	this.curveFreq1 = 0.1314534;
	this.curveFreq2 = 0.1114534;
	this.curveFreq3 = 0.0037653;
	this.curveFreq4 = 0.0033653;
	
	/*
	this.curveTriangleFreq1 = 0.01214534;
	this.curveTriangleAmplitude1 = 500;
	this.curveTrianglePhase1 = 0;*/
	
	this.difficultyDivisorY = 10000;
	this.difficultyDivisorX = 10000;
}

Track.prototype.getSinY = function Track_getSinY(value)
{
	var sqrtNumber = Math.sqrt(Math.abs(value) / this.difficultyDivisorY);
	var difficulty = 1 - sqrtNumber;
	var difficulty2 = sqrtNumber + 1;
	return Math.sin((value + this.hillPhase1) * this.hillFreq1 * difficulty) * this.hillAmplitude1 * difficulty2 + Math.sin((value + this.hillPhase2) * this.hillFreq2 * difficulty) * this.hillAmplitude2 * difficulty2 + Math.sin((value + this.hillPhase3) * this.hillFreq3 * difficulty) * this.hillAmplitude3 * difficulty2 + Math.sin((value + this.hillPhase4) * this.hillFreq4 * difficulty) * this.hillAmplitude4 * difficulty2;
}

Track.prototype.getSinX = function Track_getSinX(value)
{
	var sqrtNumber = Math.sqrt(Math.abs(value) / this.difficultyDivisorX);
	var difficulty = 1 - sqrtNumber;
	var difficulty2 = sqrtNumber + 1;	
	return Math.sin((value + this.curvePhase1) * this.curveFreq1 * difficulty) * this.curveAmplitude1 * difficulty2 + Math.sin((value + this.curvePhase2) * this.curveFreq2 * difficulty) * this.curveAmplitude2 * difficulty2 + Math.sin((value + this.curvePhase3) * this.curveFreq3 * difficulty) * this.curveAmplitude3 * difficulty2  + Math.sin((value + this.curvePhase4) * this.curveFreq4 * difficulty) * this.curveAmplitude4 * difficulty2;
}

//Représente un paysage
function ScenerySky(parentDomElementName)
{
	//Element DOM parent pour mettre les composantes graphiques
	this.parentDomElementName = parentDomElementName;
	
	//Éléments de construction
	this.setBackgroundStyle();
}

ScenerySky.prototype.reset = function ScenerySky_reset()
{
}

ScenerySky.prototype.animateSceneryElements = function ScenerySky_animateSceneryElements(elementId, time, segmentHeight, marginLeft, topPosition, segmentWidth, sinYOffset)
{
}

ScenerySky.prototype.getTrackColor = function ScenerySky_getTrackColor(elementId, currentTime, sinYOffset)
{
	/*if (this.isBridge(elementId, currentTime, sinYOffset))
		return this.getBridgeColor(elementId, currentTime);
	else*/
		return this.getRoadColor(elementId, currentTime);
}

ScenerySky.prototype.setBackgroundStyle = function ScenerySky_setBackgroundStyle()
{
	var parentComponent = document.getElementById(this.parentDomElementName);
	parentComponent.style.backgroundColor = "#0AF";
}

ScenerySky.prototype.isFellOut = function ScenerySky_isFellOut(elementId, currentTime, height)
{
	return this.isBridge(elementId, currentTime, height);
}

ScenerySky.prototype.getSegmentColor = function ScenerySky_getSegmentColor(elementId, currentTime, sinYOffset, absoluteTime)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return this.getGroundColor(elementId, currentTime);
	else
		return this.getCloudColor(elementId, currentTime);
		
}

ScenerySky.prototype.getSegmentZIndex = function ScenerySky_getSegmentZIndex(elementId, currentTime, sinYOffset)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return 20 - elementId;
	else
		return 20 - elementId;
}

ScenerySky.prototype.getRoadSegmentHeight = function ScenerySky_getRoadSegmentHeight(elementId, currentTime, sinYOffset, segmentHeight)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return segmentHeight + 100;
	else
		return segmentHeight + 10;
}

ScenerySky.prototype.buildTrack = function ScenerySky_buildTrack(value)
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

ScenerySky.prototype.getTrackWidth = function ScenerySky_getTrackWidth()
{
	return 1800;
}

ScenerySky.prototype.getBridgeColor = function ScenerySky_getBridgeColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 128;
	opacity += elementId;
	
	opacity += this.getSinRoadShade(elementId);
	
	opacity = Math.round(opacity);
	
	blue = opacity;
	red = opacity;
	green = opacity;
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	green = GraphicsCommon.makeColorValid(green);
	red = GraphicsCommon.makeColorValid(red);
	
	return "rgb(" + red + "," + green  + "," + blue + ")";


}

ScenerySky.prototype.getLineColor = function ScenerySky_getLineColor(elementId)
{
	var opacity = 255;
	opacity -= elementId *2;
	
	if (opacity < 0)
		opacity = 0;
	return "rgb(" + opacity + "," + opacity  + "," + opacity + ")";
}

ScenerySky.prototype.getCloudColor = function ScenerySky_getCloudColor(elementId, currentTime)
{
	var red = 255;
	red -= elementId *3;
	
	red += this.getSinCloudShade(elementId + currentTime);
	green = red * 0.5;	
	
	red = GraphicsCommon.makeColorValid(red);
	green = GraphicsCommon.makeColorValid(green);

	return "rgb(" + red + "," + red  + ",255)";
}

ScenerySky.prototype.getGroundColor = function ScenerySky_getWaterColor(elementId, currentTime)
{
	var blue = 192;
	var green = 192;
	var red = 64;
	
	
	blue-= elementId *3;
	green-= elementId *3;
	
	blue  += this.getSinGroundShade(elementId + currentTime);
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	red = GraphicsCommon.makeColorValid(red);
	green = GraphicsCommon.makeColorValid(green);
	return "rgb(" + red + "," + green + ","+ blue +")";
}

ScenerySky.prototype.getSinRoadShade = function ScenerySky_getSinRoadShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.round(Math.sin((value + 10.43) * 0.7) * 6) + Math.round(Math.sin((value) * 0.1)) * 30;
}

ScenerySky.prototype.getSinWoodShade = function ScenerySky_getSinWoodShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 3.7) * 5.5 + Math.sin((value) * 0.3) * 30 + Math.sin((value + 17.1) * 0.7) * 3.5;
}

ScenerySky.prototype.getSinGroundShade = function ScenerySky_getSinGroundShade(value)
{
	value /= 10;
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 40;
}

ScenerySky.prototype.getSinCloudShade = function ScenerySky_getSinCloudShade(value)
{
	return Math.sin((value) * 0.05) * 60 + Math.sin((value + 10.43) * 0.35) * 40;
}

ScenerySky.prototype.getSinRoadShadeOverPass = function ScenerySky_getSinRoadShadeOverPass(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 25;
}

ScenerySky.prototype.isLamp = function ScenerySky_isLamp(elementId, currentTime, isLeft)
{
	if (isLeft)
		return Math.round(elementId + currentTime) % 96 == 0;
	else
		return Math.round(elementId + currentTime) % 96 == 48;
}

ScenerySky.prototype.isBridge = function ScenerySky_isBridge(elementId, currentTime, height)
{
	return height < -1.75 && Math.round((elementId + currentTime) / 50) % 8 < 6;
}

ScenerySky.prototype.getRoadColor = function ScenerySky_getRoadColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 128;
	opacity += elementId;
	
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

ScenerySky.prototype.getLineWidth = function ScenerySky_getLineWidth(segmentWidth)
{
	return segmentWidth / 50;
}

ScenerySky.prototype.animateLine = function ScenerySky_animateLine(elementId, currentTime, sinYOffset, segmentWidth,segmentHeight)
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

//Représente un paysage
function SceneryHell(parentDomElementName)
{
	//Element DOM parent pour mettre les composantes graphiques
	this.parentDomElementName = parentDomElementName;
	
	//Éléments de construction
	this.setBackgroundStyle();
}

SceneryHell.prototype.reset = function SceneryHell_reset()
{
}

SceneryHell.prototype.animateSceneryElements = function SceneryHell_animateSceneryElements(elementId, time, segmentHeight, marginLeft, topPosition, segmentWidth, sinYOffset)
{
}

SceneryHell.prototype.getTrackColor = function SceneryHell_getTrackColor(elementId, currentTime, sinYOffset)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return this.getBridgeColor(elementId, currentTime);
	else
		return this.getRoadColor(elementId, currentTime);
}

SceneryHell.prototype.setBackgroundStyle = function SceneryHell_setBackgroundStyle()
{
	var parentComponent = document.getElementById(this.parentDomElementName);
	parentComponent.style.backgroundColor = "#000";
}

SceneryHell.prototype.isFellOut = function SceneryHell_isFellOut(elementId, currentTime, height)
{
	return this.isBridge(elementId, currentTime, height);
}

SceneryHell.prototype.getSegmentColor = function SceneryHell_getSegmentColor(elementId, currentTime, sinYOffset, absoluteTime)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return this.getLavaColor(elementId, currentTime);
	else
		return this.getFireColor(elementId, currentTime, absoluteTime);
}

SceneryHell.prototype.getSegmentZIndex = function SceneryHell_getSegmentZIndex(elementId, currentTime, sinYOffset)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return 50 - elementId;
	else
		return 100 - elementId;
}

SceneryHell.prototype.getRoadSegmentHeight = function SceneryHell_getRoadSegmentHeight(elementId, currentTime, sinYOffset, segmentHeight)
{
	if (this.isBridge(elementId, currentTime, sinYOffset))
		return segmentHeight + 50;
	else
		return segmentHeight + 10;
}

SceneryHell.prototype.buildTrack = function SceneryHell_buildTrack(value)
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

SceneryHell.prototype.getTrackWidth = function SceneryHell_getTrackWidth()
{
	return 1400;
}

SceneryHell.prototype.getBridgeColor = function SceneryHell_getBridgeColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 192;
	opacity -= elementId *2;
	
	opacity += this.getSinFireShade(elementId + currentTime);
	
	opacity = Math.round(opacity);
	
	blue = opacity;
	red = opacity;
	green = opacity;
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	green = GraphicsCommon.makeColorValid(green);
	red = GraphicsCommon.makeColorValid(red);
	
	return "rgb(" + red + "," + green  + "," + blue + ")";


}

SceneryHell.prototype.getLineColor = function SceneryHell_getLineColor(elementId)
{
	var opacity = 255;
	opacity -= elementId *2;
	
	if (opacity < 0)
		opacity = 0;
	return "rgb(" + opacity + "," + opacity  + "," + opacity + ")";
}

SceneryHell.prototype.getFireColor = function SceneryHell_getFireColor(elementId, currentTime, absoluteTime)
{
	var red = 255;
	red -= elementId *3;
	
	red += this.getSinFireShade(elementId + currentTime + absoluteTime*absoluteTime);
	green = red * 0.5;	
	
	red = GraphicsCommon.makeColorValid(red);
	green = GraphicsCommon.makeColorValid(green);

	return "rgb(" + red + "," + green  + ",10)";
}

SceneryHell.prototype.getLavaColor = function SceneryHell_getWaterColor(elementId, currentTime)
{
	var blue = 0;
	var red = 192;
	var green = 0;
	
	red  -= elementId *3;
	red  += this.getSinLavaShade(elementId + currentTime);
	
	if (red  < 64)
		red +=128;
	
	if (red  > 144)
	{
		blue = red  / 3;
		green = red  / 2;
	}
	
	
	blue = GraphicsCommon.makeColorValid(blue);
	red = GraphicsCommon.makeColorValid(red);
	green = GraphicsCommon.makeColorValid(green);
	return "rgb(" + red + "," + green + ","+ blue +")";
}

SceneryHell.prototype.getSinRoadShade = function SceneryHell_getSinRoadShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.round(Math.sin((value + 10.43) * 0.7) * 6) + Math.round(Math.sin((value) * 0.1)) * 30;
}

SceneryHell.prototype.getSinWoodShade = function SceneryHell_getSinWoodShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 3.7) * 5.5 + Math.sin((value) * 0.3) * 30 + Math.sin((value + 17.1) * 0.7) * 3.5;
}

SceneryHell.prototype.getSinLavaShade = function SceneryHell_getSinLavaShade(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 40;
}

SceneryHell.prototype.getSinFireShade = function SceneryHell_getSinFireShade(value)
{
	return Math.sin((value) * 0.1) * 60 + Math.sin((value + 10.43) * 0.7) * 40;
}

SceneryHell.prototype.getSinRoadShadeOverPass = function SceneryHell_getSinRoadShadeOverPass(value)
{
	return Math.sin((value) * 0.1) * 30 + Math.sin((value + 10.43) * 0.7) * 25;
}

SceneryHell.prototype.isLamp = function SceneryHell_isLamp(elementId, currentTime, isLeft)
{
	if (isLeft)
		return Math.round(elementId + currentTime) % 96 == 0;
	else
		return Math.round(elementId + currentTime) % 96 == 48;
}

SceneryHell.prototype.isBridge = function SceneryHell_isBridge(elementId, currentTime, height)
{
	return height < -1.75 && Math.round((elementId + currentTime) / 50) % 8 < 6;
}

SceneryHell.prototype.getRoadColor = function SceneryHell_getRoadColor(elementId, currentTime)
{
	var red;
	var green;
	var blue;
	var opacity = 192;
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

SceneryHell.prototype.getLineWidth = function SceneryHell_getLineWidth(segmentWidth)
{
	return segmentWidth / 50;
}

SceneryHell.prototype.animateLine = function SceneryHell_animateLine(elementId, currentTime, sinYOffset, segmentWidth,segmentHeight)
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

var isIE = document.all?true:false;
var isPressLeft = false;
var isPressRight = false;
var isPressUp = false;
var isPressDown = false;
var isInsideCar = false;

function main()
{
	document.onkeydown = keyDownHandler;
	document.onkeyup = keyUpHandler;
	var gameModel = new GameModel();
	gameModel.update();
}

function keyDownHandler(e)
{
	var unicode = getKeyCode(e);
	var key = String.fromCharCode(unicode);
		
	if (unicode == 37 || unicode == 65)
		isPressLeft = true;
	else if (unicode == 39 || unicode == 68)
		isPressRight = true;
	else if (unicode == 38 || unicode == 87)
		isPressUp = true;
	else if (unicode == 40 || unicode == 83)
		isPressDown = true;
	else if (unicode == 32)
		isInsideCar = !isInsideCar;
}

function keyUpHandler(e)
{
	var unicode = getKeyCode(e);
	var key = String.fromCharCode(unicode);
		
	if (unicode == 37 || unicode == 65)
		isPressLeft = false;
	else if (unicode == 39 || unicode == 68)
		isPressRight = false;
	else if (unicode == 38 || unicode == 87)
		isPressUp = false;
	else if (unicode == 40 || unicode == 83)
		isPressDown = false;
}

function getKeyCode(e)
{
	if (navigator.appName == "Microsoft Internet Explorer")
		return event.keyCode; 
	return e.which;
}

function getValue(varname)
{
	try
	{
		var url = window.location.href;
		var qparts = url.split("?");

		if (qparts.length == 0)
		{
			return "";
		}
		var query = qparts[1];
		var vars = query.split("&");
		var value = "";
		for (i=0;i<vars.length;i++)
		{
			var parts = vars[i].split("=");
			if (parts[0] == varname)
			{
				value = parts[1];
				break;
			}
		}
		value = unescape(value);
		value.replace(/\+/g," ");
		return value;
	}
	catch (e)
	{
		return null;
	}
}

//Graphics communs
function GraphicsCommon(parentDomElementName, maxSegmentCount)
{
	//Fields
	this.isShownOtherCar = false;
	this.currentHtmlFile = "index.php";
	
	//Element DOM parent pour mettre les composantes graphiques
	this.parentDomElementName = parentDomElementName;
	
	this.createCars();
	this.createSegments(maxSegmentCount);
	this.setBackgroundStyle();
	this.createMenu(this.currentHtmlFile);
}

GraphicsCommon.prototype.createCars = function GraphicsCommon_createCars()
{
	var parentDomElement = document.getElementById(this.parentDomElementName);
	var car = document.createElement('div');
	car.className = "Car";
	car.setAttribute("id", "car" );
	parentDomElement.appendChild(car);
	
	var wheel1 = document.createElement('div');
	wheel1.className = "Wheel";
	wheel1.setAttribute("id", "wheel1");
	car.appendChild(wheel1);
	
	var wheel2 = document.createElement('div');
	wheel2.className = "Wheel";
	wheel2.setAttribute("id", "wheel2");
	car.appendChild(wheel2);
	
	var backWindow = document.createElement('div');
	backWindow.className = "BackWindow";
	backWindow.setAttribute("id", "backWindow");
	parentDomElement.appendChild(backWindow);
		
	var otherCar = document.createElement('div');
	otherCar.className = "OtherCar";
	otherCar.setAttribute("id", "otherCar");
	parentDomElement.appendChild(otherCar);
	
	var otherCarWheels = document.createElement('div');
	otherCarWheels.className = "OtherCarWheels";
	otherCarWheels.setAttribute("id", "otherCarWheels");
	parentDomElement.appendChild(otherCarWheels);
	
	var otherCarWindow = document.createElement('div');
	otherCarWindow.className = "OtherCarWindow";
	otherCarWindow.setAttribute("id", "otherCarWindow");
	parentDomElement.appendChild(otherCarWindow);
	
	var scoreView = document.createElement('div');
	scoreView.className = "ScoreView";
	scoreView.setAttribute("id","scoreView");
	parentDomElement.appendChild(scoreView);
}

GraphicsCommon.prototype.createSegments = function GraphicsCommon_createSegments(segmentCount)
{
	for (var roadSegmentCount = 0; roadSegmentCount < segmentCount; roadSegmentCount++)
		this.createSegment(roadSegmentCount);
}

GraphicsCommon.prototype.createSegment = function GraphicsCommon_createSegment(elementId)
{
	var parentDomElement = document.getElementById(this.parentDomElementName);
	
	var segment = document.createElement('div');
	segment.className = "Segment";
	segment.setAttribute("id", "segment" + elementId);
	parentDomElement.appendChild(segment);
	
	var roadSegment = document.createElement('div');
	roadSegment.className = "RoadSegment";
	roadSegment.setAttribute("id", "roadSegment" + elementId);
	parentDomElement.appendChild(roadSegment);	
	
	var lineSegment = document.createElement('div');
	lineSegment.className = "LineSegment";
	lineSegment.setAttribute("id", "lineSegment" + elementId);
	roadSegment.appendChild(lineSegment);
}

GraphicsCommon.prototype.setBackgroundStyle = function GraphicsCommon_setBackgroundStyle()
{
	var parentComponent = document.getElementById(this.parentDomElementName);
	parentComponent.overflow = "hidden";
	parentComponent.height = "550px";
	parentComponent.width = "100%";
}

GraphicsCommon.prototype.reset = function GraphicsCommon_reset()
{
	this.isShownOtherCar = false;

	var otherCar = document.getElementById("otherCar");
	otherCar.style.visibility = "hidden";
	
	var otherCarWheels = document.getElementById("otherCarWheels");
	otherCarWheels.style.visibility = "hidden";
	
	var otherCarWindow = document.getElementById("otherCarWindow");
	otherCarWindow.style.visibility = "hidden";
}

GraphicsCommon.prototype.animateSegment = function GraphicsCommon_animateSegment(elementId, roadSegmentHeight, trackColor, segmentWidth, marginLeft, topPosition, segmentHeight, segmentZIndex, segmentColor)
{
	//Ground segment
	var segment = document.getElementById("segment" + elementId);
	segment.style.height = segmentHeight + 10 + "px";
	segment.style.zIndex = segmentZIndex;
	segment.style.top = topPosition + "px";
	segment.style.visibility = "visible";
	segment.style.backgroundColor = segmentColor;

	//Road segment
	var roadSegment = document.getElementById("roadSegment" + elementId);
	roadSegment.style.height = roadSegmentHeight + "px";	
	roadSegment.style.backgroundColor = trackColor;
	roadSegment.style.width = segmentWidth + "px";
	roadSegment.style.zIndex = (100 - elementId + 1);
	roadSegment.style.marginLeft = marginLeft + "px";
	roadSegment.style.top = topPosition + "px";
	roadSegment.style.visibility = "visible";
}

GraphicsCommon.prototype.setPlayerCarPosition = function GraphicsCommon_setPlayerCarPosition(currentState, currentTime, speed, turnSpeed, track, isInsideCar, stateNormal, stateFellInWater)
{
	var currentSinY = track.getSinY(currentTime);
	var car = document.getElementById("car");
	car.style.top = 577 + currentSinY + "px";	
	//car.style.top = 577 + currentSinY / 10 + "px";	
	
	var windowOffset = turnSpeed * Math.abs(speed / 2);
	if (windowOffset < -14)
		windowOffset = -14;
	else if (windowOffset > 15)
		windowOffset = 15;
		
	var carBackWindow = document.getElementById("backWindow");
	carBackWindow.style.left = 415 - windowOffset + "px";
	carBackWindow.style.top = 582 + track.getSinY(currentTime + 1) - 20 + "px";
	//carBackWindow.style.top = 582 + (track.getSinY(currentTime + 1) / 10) - 20 + "px";
	
	//On affiche le véhicule ou on le cache selon la vue choisie
	if (currentState == stateNormal && !isInsideCar)
		this.setPlayerCarVisible(true);
	else if (currentState == stateFellInWater || isInsideCar)
		this.setPlayerCarVisible(false);
}

GraphicsCommon.prototype.setPlayerCarVisible = function GraphicsCommon_setPlayerCarVisible(visible)
{
	if (visible)
	{
		document.getElementById("car").style.visibility = "visible";
		document.getElementById("backWindow").style.visibility = "visible";
	}
	else
	{
		document.getElementById("car").style.visibility = "hidden";
		document.getElementById("backWindow").style.visibility = "hidden";
	}
}

GraphicsCommon.prototype.animateOtherCars = function GraphicsCommon_animateOtherCars(elementId, currentTime, segmentHeight, marginLeft, topPosition, segmentWidth, otherCarNumber, sinOtherCarXValue, impactOffset)
{
	if (this.isShownOtherCar)
		return;

	var otherCar = document.getElementById("otherCar");
	var otherCarHeight = segmentWidth / 90;
	var otherCarWidth = segmentWidth / 9;
	var otherCarPositionX = marginLeft + segmentWidth / 2 - otherCarWidth / 2 + sinOtherCarXValue - impactOffset * 20;

	
	var otherCarColor = this.getOtherCarColor(elementId, otherCarNumber);
	
	otherCar.style.height = otherCarHeight + "px";
	otherCar.style.width = otherCarWidth + "px";
	otherCar.style.zIndex = (101 - elementId);
	otherCar.style.marginLeft = otherCarPositionX -400 + "px";
	otherCar.style.top = topPosition - otherCarHeight * 2 +"px";
	otherCar.style.visibility = "visible";
	otherCar.style.backgroundColor = otherCarColor;
	otherCar.style.borderWidth = (otherCarWidth / 15) + "px";
	
	var wheelWidth = otherCarWidth / 9;
	var otherCarWheels = document.getElementById("otherCarWheels");
	otherCarWheels.style.height = otherCarHeight + "px";
	otherCarWheels.style.zIndex = (101 - elementId);
	otherCarWheels.style.width = otherCarWidth - wheelWidth + "px";
	otherCarWheels.style.borderWidth = wheelWidth + "px";
	otherCarWheels.style.top = topPosition - otherCarHeight * .43 +"px";
	otherCarWheels.style.visibility = "visible";
	otherCarWheels.style.marginLeft = otherCarPositionX - 400 + "px";
	
	var otherCarWindow = document.getElementById("otherCarWindow");
	otherCarWindow.style.height = otherCarHeight*0.7 + "px";
	otherCarWindow.style.zIndex = (101 - elementId);
	otherCarWindow.style.width = otherCarWidth - wheelWidth + "px";
	otherCarWindow.style.top = topPosition - otherCarHeight * 2.7 +"px";
	otherCarWindow.style.visibility = "visible";
	otherCarWindow.style.backgroundColor = this.getOtherCarWindowColor(elementId);
	otherCarWindow.style.marginLeft = otherCarPositionX + wheelWidth - 400 + "px";
	
	this.isShownOtherCar = true;
}

GraphicsCommon.prototype.getOtherCarColor = function GraphicsCommon_getOtherCarColor(elementId, otherCarNumber)
{
	var blue, red, green;
	
	blue = otherCarNumber * 100.1;
	red = otherCarNumber * 200.7;
	green = otherCarNumber * 150.23555;
	

	while (red > 255)
		red -= 255;
	while (green > 255)
		green -= 255;
	while (blue > 255)
		blue -= 255;
	while (red < 0)
		red += 255
	while (green < 0)
		green += 255;
	while (blue < 0)
		blue += 255;
		
	red -= elementId *2;	
	green -= elementId *2;
	blue -= elementId *2;
	
	blue = GraphicsCommon.makeColorValid(blue);
	red = GraphicsCommon.makeColorValid(red);
	green = GraphicsCommon.makeColorValid(green);

	return "rgb(" + red + "," + green + "," + blue + ")";
}

GraphicsCommon.prototype.getOtherCarWindowColor = function GraphicsCommon_getOtherCarWindowColor(elementId)
{
	var blue, red, green;
	red = 96;
	green = 160;
	blue = 240;
	
	red-= elementId*2;
	green-= elementId*2;
	blue-= elementId*2;
	
	blue = GraphicsCommon.makeColorValid(blue);
	red = GraphicsCommon.makeColorValid(red);
	green = GraphicsCommon.makeColorValid(green);

	return "rgb(" + red + "," + green + "," + blue + ")";	
}

GraphicsCommon.prototype.setScore = function GraphicsCommon_setScore(score)
{
	var scoreView = document.getElementById("scoreView");
	scoreView.innerHTML = 8 - score;
}

GraphicsCommon.prototype.createMenu = function GraphicsCommon_createMenu(currentHtmlFile)
{
	var parentDomElement = document.getElementById(this.parentDomElementName);
	var menu = document.createElement('div');
	menu.className="Menu";
	parentDomElement.appendChild(menu);
	menu.innerHTML = "";
	menu.innerHTML += '<a class="MenuItem" href="'+currentHtmlFile+'?scenery=Estrie">Estrie</a>';
	menu.innerHTML += ' | <a class="MenuItem" href="'+currentHtmlFile+'?scenery=Miami">Miami</a>';
	menu.innerHTML += ' | <a class="MenuItem" href="'+currentHtmlFile+'?scenery=Hell">Hell</a>';
	menu.innerHTML += ' | <a class="MenuItem" href="'+currentHtmlFile+'?scenery=Sky">Sky</a>';
	
}

GraphicsCommon.makeColorValid = function GraphicsCommon_makeColorValid(color)
{
	if (color > 255)
		color = 255;
	else if (color < 0)
		color = 0;	
	color = Math.round(color);
	return color;
}

//Modele de donnes du jeu
function GameModel()
{
	//Constants
	this.timeIncrementor = 1;
	this.minimumViewDistance = 10;
	this.maximumViewDistance = 100;
	this.stateNormal = 0;
	this.stateFellInWater = 1;
	this.refreshTime = 30;
	this.firstSegmentTopPosition = 640;
	this.isSpeedAdjust = true;
	this.parentDomElementName = "chatPage";
	this.topSpeed = this.timeIncrementor*3.05;

	//Fields
	this.maxRefreshTime = this.refreshTime;
	this.minRefreshTime = Math.round(this.refreshTime - (this.refreshTime / 10));
	this.currentState = this.stateNormal;
	this.desiredViewDistance = this.maximumViewDistance;
	this.speed = 0;
	this.absoluteTime = 0;
	this.turnSpeed = 0;
	this.otherCarTime = 0;
	this.otherCarFreq = 77;
	this.otherCarXImpactOffset = 0;
	this.currentTime = 0;
	this.carPositionX = 0;
	
	//Cache variables
	this.segmentMinusOneTopPosition;
	
	//Parts
	if (getValue("scenery") == "Miami")
		this.scenery = new SceneryMiami(this.parentDomElementName);
	else if (getValue("scenery") == "Hell")
		this.scenery = new SceneryHell(this.parentDomElementName);
	else if (getValue("scenery") == "Sky")
		this.scenery = new ScenerySky(this.parentDomElementName);
	else
		this.scenery = new SceneryEstrie(this.parentDomElementName);
		
	this.track = this.scenery.buildTrack();//this.trackGenerator.buildTrack();
	this.graphicsCommon = new GraphicsCommon(this.parentDomElementName, this.maximumViewDistance);
}

//Program's main loop
GameModel.prototype.update = function GameModel_update()
{
	//On prend le temp courant en ms
	var msTime = new Date().getTime();

	//On nettoie le paysage
	this.scenery.reset();
	
	//On nettoie les graphics communs
	this.graphicsCommon.reset();

	//On anime les segments
	for (var roadSegmentCount = 0; roadSegmentCount < this.desiredViewDistance; roadSegmentCount++)
		this.updateSegment(roadSegmentCount, this.currentTime);

	//On gère les touches de rotation
	if (this.currentState == this.stateNormal)
	{
		if (isPressLeft)
			this.turnSpeed+=3;
		else if (isPressRight)
			this.turnSpeed-=3;
	}
	
	//On gère les rotations
	this.turnSpeed *= 0.9;
	this.carPositionX += this.turnSpeed * this.speed;
	
	//On détecte et gère les collisions
	if (this.isCarCollision(true))
		this.performCollisionEffect(true);
	else if (this.isCarCollision(false))
		this.performCollisionEffect(false);
	

	//On positionne/affiche/cache le véhicule principal
	this.graphicsCommon.setPlayerCarPosition(this.currentState, this.currentTime, this.speed, this.turnSpeed, this.track, isInsideCar, this.stateNormal, this.stateFellInWater);
	
	//On calcule la vitesse du véhicule
	this.speed = this.getSpeed(this.speed, this.currentTime);
	
	//Lorsque le véhicule est hors route
	if (!this.isOnRoad(this.currentTime))
	{
		this.speed *= .9;
		this.turnSpeed *= 1.1;
		
		if (this.scenery.isFellOut(0, this.currentTime, this.track.getSinY(this.currentTime)))
		{
			this.currentState = this.stateFellInWater;
		}
	}
	
	//Lorsque le véhicule est tombé dans l'eau et qu'il se fait replacer
	if (this.currentState == this.stateFellInWater)
	{
		this.currentTime -= 6;
		if (!this.scenery.isFellOut(0, this.currentTime, this.track.getSinY(this.currentTime)) && !this.scenery.isFellOut(0, this.currentTime + 10, this.track.getSinY(this.currentTime + 10)) && !this.scenery.isFellOut(0, this.currentTime + 20, this.track.getSinY(this.currentTime + 20)) && !this.scenery.isFellOut(0, this.currentTime + 40, this.track.getSinY(this.currentTime + 40)))
		{
			this.speed = 0;
			this.turnSpeed = 0;
			this.currentState = this.stateNormal;
		}
	}
	
	//On ajuste les déplacements du véhicule principal
	this.currentTime += this.speed;
	this.absoluteTime += this.timeIncrementor;
	
	//On déplace les autres véhicules
	this.otherCarTime -= this.getOtherCarSpeed();
	this.otherCarXImpactOffset *= 0.95;
	
	//On affiche le score actuel
	this.graphicsCommon.setScore(Math.max(0, this.getOtherCarNumber(0, this.currentTime, this.otherCarTime, this.otherCarFreq)));
	
	//On ajuste la distance de vision selon les performances actuelles
	var timeInterval = new Date().getTime() - msTime;
	if (this.isSpeedAdjust)
		this.adjustViewDistance(timeInterval);
	
	//On prépare le prochain refresh
	var gameModel = this;
	setTimeout(function() { gameModel.update(); }, Math.max(this.refreshTime - timeInterval,0));
}

GameModel.prototype.updateSegment = function GameModel_updateSegment(elementId)
{
	var sinYOffset = this.track.getSinY(elementId + this.currentTime);
	var segmentHeight = this.getSegmentHeight(elementId);
	var trackColor = this.scenery.getTrackColor(elementId, this.currentTime, sinYOffset);
	var rawTopPosition = this.getSegmentTopPosition(elementId, this.segmentMinusOneTopPosition);
	var roadSegmentHeight = this.scenery.getRoadSegmentHeight(elementId, this.currentTime, sinYOffset, segmentHeight);
	var segmentColor = this.scenery.getSegmentColor(elementId, this.currentTime, sinYOffset, this.absoluteTime);
	var segmentWidth = this.getSegmentWidth(elementId);
	var marginLeft = this.getLeftRoadRange(elementId, this.currentTime, segmentWidth);
	var segmentZIndex = this.scenery.getSegmentZIndex(elementId, this.currentTime, sinYOffset);
	var topPosition;
	
	if (isInsideCar)
		topPosition = rawTopPosition + sinYOffset * (elementId * 0.02);	
	else
		topPosition = rawTopPosition + sinYOffset;
	//topPosition = rawTopPosition + sinYOffset * (elementId * 0.02);		
	
	
	this.segmentMinusOneTopPosition = rawTopPosition;	
	this.graphicsCommon.animateSegment(elementId, roadSegmentHeight, trackColor, segmentWidth, marginLeft, topPosition, segmentHeight, segmentZIndex, segmentColor);	
	this.scenery.animateSceneryElements(elementId, this.currentTime, segmentHeight, marginLeft, topPosition, segmentWidth, sinYOffset);
	
	//Si il y a un autre véhicule sur le segment
	if (this.isOtherCar(elementId, this.currentTime))
	{
		var impactOffset = this.getOtherCarXImpactOffset(elementId);
		var otherCarNumber = this.getOtherCarNumber(elementId, this.currentTime, this.otherCarTime, this.otherCarFreq);
		var sinOtherCarXValue = this.getSinOtherCarX(elementId, (elementId + this.currentTime + this.absoluteTime + otherCarNumber + this.speed));
		this.graphicsCommon.animateOtherCars(elementId, this.currentTime, segmentHeight, marginLeft, topPosition, segmentWidth, otherCarNumber, sinOtherCarXValue, impactOffset);
	}
}

GameModel.prototype.performCollisionEffect = function GameModel_performCollisionEffect(isFront)
{
	if (isFront)
	{
		this.speed -= 0.5;
		this.currentTime -= this.speed * 4;
		var car = document.getElementById("car");
		var otherCar = document.getElementById("otherCar");
		var sideImpact = (car.offsetLeft - otherCar.offsetLeft) / 5;
		this.turnSpeed -= sideImpact;
		this.otherCarXImpactOffset += sideImpact;
	}
	else
	{
		this.speed += 0.5;
		this.currentTime += this.speed * 5;
		var car = document.getElementById("car");
		var otherCar = document.getElementById("otherCar");
		var sideImpact = (car.offsetLeft - otherCar.offsetLeft) / 5;	
		if (this.speed < 0)
			sideImpact*= -1;
		this.turnSpeed -= sideImpact;
		this.otherCarXImpactOffset += sideImpact;
	}
}

GameModel.prototype.adjustViewDistance = function GameModel_adjustViewDistance(msInterval)
{
	if (msInterval > this.maxRefreshTime)
	{
		document.getElementById("segment" + (this.desiredViewDistance - 1)).style.visibility = "hidden";
		document.getElementById("roadSegment" + (this.desiredViewDistance - 1)).style.visibility = "hidden";
		document.getElementById("lineSegment" + (this.desiredViewDistance - 1)).style.visibility = "hidden";
		
		this.desiredViewDistance--;
		if (this.desiredViewDistance < this.minimumViewDistance)
			this.desiredViewDistance = this.minimumViewDistance;
		
		msInterval -= msInterval / this.desiredViewDistance;
	}
	else if (msInterval < this.maxRefreshTime)
	{
		this.desiredViewDistance++;	
		if (this.desiredViewDistance > this.maximumViewDistance)
			this.desiredViewDistance = this.maximumViewDistance;
	}
}

GameModel.prototype.getOtherCarXImpactOffset = function GameModel_getOtherCarXImpactOffset(elementId)
{
	var multiplier = (this.maximumViewDistance - elementId) / this.maximumViewDistance;
	return this.otherCarXImpactOffset;
}

GameModel.prototype.getOtherCarSpeed = function GameModel_getOtherCarSpeed(carNumber)
{
	var carNumber = this.getOtherCarNumber(0, this.currentTime, this.otherCarTime, this.otherCarFreq)
	
	if (carNumber < 0)
		return 0.5;
		
	if (carNumber >= 3 && carNumber <= 6)
		carNumber = 6;
	else if (carNumber >= 7 && carNumber < 10)
		carNumber = 7;
	
	return Math.pow(carNumber,2) / 36 + 1.65;
}

GameModel.prototype.getOtherCarNumber = function GameModel_getOtherCarNumber(elementId, currentTime, otherCarTime, otherCarFreq)
{
	var timeDifference = currentTime -1 + otherCarTime;
	timeDifference = Math.floor(timeDifference / otherCarFreq);
	return timeDifference;
}

GameModel.prototype.getSegmentHeight = function GameModel_getSegmentHeight(elementId)
{
	return 20 / (elementId / 6 + 1);
}

GameModel.prototype.getSegmentWidth = function GameModel_getSegmentWidth(elementId)
{
	return this.scenery.getTrackWidth() / (elementId / 6 + 1);
}

GameModel.prototype.getSegmentTopPosition = function GameModel_getSegmentTopPosition(elementId, segmentMinusOneTopPositionPrevious)
{
	if (elementId == 0)
		return this.firstSegmentTopPosition;
	return segmentMinusOneTopPositionPrevious - this.getSegmentHeight(elementId);
}

GameModel.prototype.isOnRoad = function GameModel_isOnRoad(currentTime)
{
	var leftRoadRange = this.getLeftRoadRange(3, currentTime, this.scenery.getTrackWidth());
	return !(leftRoadRange > 400 || leftRoadRange + this.scenery.getTrackWidth() < 500);
}

GameModel.prototype.getSpeed = function GameModel_getSpeed(speed, currentTime)
{
	speed += speed * (this.track.getSinY(currentTime + speed) - this.track.getSinY(currentTime)) / 200;
	
	
	if (this.currentState == this.stateNormal)
	{
		if (isPressUp)
			speed += 0.1;
		else if (isPressDown)
			speed -= 0.1;			
	}
	
	if (speed > this.topSpeed)
		speed = this.topSpeed;
	else if (speed < (this.topSpeed * -1))
		speed = (this.topSpeed * -1);

		
	return speed;
}

GameModel.prototype.getLeftRoadRange = function GameModel_getLeftRoadRange(elementId, currentTime, segmentWidth)
{
	return ((1000 - segmentWidth) / 2) + this.track.getSinX(elementId + currentTime) + this.carPositionX;
}

GameModel.prototype.isCarCollision = function GameModel_isCarCollision(isFront)
{
	var car = document.getElementById("car");
	var otherCar = document.getElementById("otherCar");
	
	if (isFront)
		return Math.abs(car.offsetLeft - otherCar.offsetLeft) < 200 && this.isOtherCar(1, this.currentTime);
	else
		return Math.abs(car.offsetLeft - otherCar.offsetLeft) < 200 && this.isOtherCar(0, this.currentTime);
}

GameModel.prototype.isOtherCar = function GameModel_isOtherCar(elementId, currentTime)
{
	return Math.round(elementId + currentTime + this.otherCarTime) % this.otherCarFreq == 0;
}

GameModel.prototype.getSinOtherCarX = function GameModel_getSinOtherCarX(elementId, value)
{
	return (Math.sin((value + this.absoluteTime) * 0.1234534) * 50 - 10);
}

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