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