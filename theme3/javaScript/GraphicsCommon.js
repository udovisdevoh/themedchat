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