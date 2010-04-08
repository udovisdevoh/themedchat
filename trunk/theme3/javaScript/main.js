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