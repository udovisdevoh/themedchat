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