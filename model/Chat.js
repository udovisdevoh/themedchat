var messageToSend = null;
var defaultDelay = 2000;

function loadMessageList()
{
	loadChatDataElement("../model/ajax/getMessageList.php","textOutput",true);
	setTimeout(loadMemberList,defaultDelay);
}

function loadMemberList()
{
	loadChatDataElement("../model/ajax/getMemberList.php","formElementUserList",false);
	if (messageToSend == null || messageToSend == "")
		setTimeout(loadMessageList,defaultDelay);
	else
		setTimeout(sendMessage,defaultDelay);
}

function loadChatDataElement(url, targedDomElementId, isAppendDomContent)
{
	var xmlhttp;
	var objectFromJson;
				
	if (window.XMLHttpRequest)
	{
  		// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else
	{
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  		
	xmlhttp.onreadystatechange = function()
	{
	    if (xmlhttp.readyState == 4)
		{
			objectFromJson = json_parse(xmlhttp.responseText);
			
			var innerHTML = "";
			
			if (objectFromJson == "NOT_LOGGED_IN")
				return;

			for (var key in objectFromJson)
			{
				var value = objectFromJson[key];
				
				if (value instanceof String)
					innerHTML += stripHTML(value);
				else if (value['nomUsager'] != undefined)
					innerHTML += stripHTML(value.nomUsager) + " : " + stripHTML(value.message);
				else
					innerHTML += stripHTML(value);
					
				innerHTML  += "<br/>";
			}

			
			if (isAppendDomContent)
				document.getElementById(targedDomElementId).innerHTML += innerHTML;
			else
				document.getElementById(targedDomElementId).innerHTML = innerHTML;
  	    }
	}
				
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

function onSendMessage()
{
	var textField = document.getElementById('inputText');
	var textFieldValue = textField.value;
	messageToSend = textFieldValue;
	showSelfMessage();
}

function showSelfMessage()
{
	var textField = document.getElementById('inputText');
	var textFieldValue = textField.value;
	document.getElementById('textOutput').innerHTML += stripHTML(readCookie("user"));
	document.getElementById('textOutput').innerHTML += " : " + stripHTML(textFieldValue) + "<br/>";
	textField.value = "";
	return false;
}

function sendMessage()
{
	var messageContent = messageToSend;
	messageToSend = null;

	var xmlhttp;
	var objectFromJson;
				
	if (window.XMLHttpRequest)
	{
  		// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}
	else
	{
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	xmlhttp.onreadystatechange = function()
	{
	    if (xmlhttp.readyState == 4)
		{
			//objectFromJson = json_parse(xmlhttp.responseText);
  	    }
	}
	
	xmlhttp.open("GET","../model/ajax/sendMessage.php?inputText=" + escape(messageContent),true);
	xmlhttp.send(null);
	
	setTimeout(loadMessageList,defaultDelay);
}

function readCookie(cookieName)
{
	var theCookie=""+document.cookie;
	var ind=theCookie.indexOf(cookieName);
	if (ind==-1 || cookieName=="") return ""; 
	var ind1=theCookie.indexOf(';',ind);
	if (ind1==-1) ind1=theCookie.length; 
	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

function stripHTML(oldString)
{
   var newString = "";
   var inTag = false;
   for(var i = 0; i < oldString.length; i++) {
   
        if(oldString.charAt(i) == '<') inTag = true;
        if(oldString.charAt(i) == '>') {
              if(oldString.charAt(i+1)=="<")
              {
              		//dont do anything
	}
	else
	{
		inTag = false;
		i++;
	}
        }
   
        if(!inTag) newString += oldString.charAt(i);

   }

   return newString;
}

function print_r(theObj)
{
	if(theObj.constructor == Array || theObj.constructor == Object)
	{
		document.write("<ul>");
		for(var p in theObj)
		{
			if(theObj[p].constructor == Array|| theObj[p].constructor == Object)
			{
				document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
				document.write("<ul>");
				print_r(theObj[p]);
				document.write("</ul>");
			}
			else
			{
				document.write("<li>["+p+"] => "+theObj[p]+"</li>");
			}
		}
		document.write("</ul>");
	}
}

var json_parse = (function () {

// This is a function that can parse a JSON text, producing a JavaScript
// data structure. It is a simple, recursive descent parser. It does not use
// eval or regular expressions, so it can be used as a model for implementing
// a JSON parser in other languages.

// We are defining the function inside of another function to avoid creating
// global variables.

    var at,     // The index of the current character
        ch,     // The current character
        escapee = {
            '"':  '"',
            '\\': '\\',
            '/':  '/',
            b:    '\b',
            f:    '\f',
            n:    '\n',
            r:    '\r',
            t:    '\t'
        },
        text,

        error = function (m) {

// Call error when something is wrong.

            throw {
                name:    'SyntaxError',
                message: m,
                at:      at,
                text:    text
            };
        },

        next = function (c) {

// If a c parameter is provided, verify that it matches the current character.

            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'");
            }

// Get the next character. When there are no more characters,
// return the empty string.

            ch = text.charAt(at);
            at += 1;
            return ch;
        },

        number = function () {

// Parse a number value.

            var number,
                string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (isNaN(number)) {
                error("Bad number");
            } else {
                return number;
            }
        },

        string = function () {

// Parse a string value.

            var hex,
                i,
                string = '',
                uffff;

// When parsing for string values, we must look for " and \ characters.

            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    } else if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error("Bad string");
        },

        white = function () {

// Skip whitespace.

            while (ch && ch <= ' ') {
                next();
            }
        },

        word = function () {

// true, false, or null.

            switch (ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
            }
            error("Unexpected '" + ch + "'");
        },

        value,  // Place holder for the value function.

        array = function () {

// Parse an array value.

            var array = [];

            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    return array;   // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad array");
        },

        object = function () {

// Parse an object value.

            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    return object;   // empty object
                }
                while (ch) {
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad object");
        };

    value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

        white();
        switch (ch) {
        case '{':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
        }
    };

// Return the json_parse function. It will have access to all of the above
// functions and variables.

    return function (source, reviver) {
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

// If there is a reviver function, we recursively walk the new structure,
// passing each name/value pair to the reviver function for possible
// transformation, starting with a temporary root object that holds the result
// in an empty key. If there is not a reviver function, we simply return the
// result.

        return typeof reviver === 'function' ? (function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }({'': result}, '')) : result;
    };
}());