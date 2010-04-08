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