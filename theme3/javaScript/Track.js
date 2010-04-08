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