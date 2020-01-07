//Martin Borovansky 2019
//WEBTE1


var meninyJSON;
var dia = "áäčďéíľĺňóôŕšťúýÁČĎÉÍĽĹŇÓŠŤÚÝŽ";
var nodia = "aacdeillnoorstuyACDEILLNOSTUYZ";

//------HTML Utilities ----------------------------------------------------------------------------------------------------------------------

function writeIntoHTMLElement(elID, message) {
    var element = document.getElementById(elID);
    element.innerHTML = message;
}

function appendToHTMLElement(elID, message) {
    var element = document.getElementById(elID);
    element.innerHTML = element.innerHTML + message;
}

function readFromHTMLElement(elID) {
    var element = document.getElementById(elID);
    return element.value;
}




//------JSON Utilities ----------------------------------------------------------------------------------------------------------------------


//load meniny.json as an object and write it to var meninyJSON
function parseJSON() {
    $.ajax({
        url: 'meniny.json',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json; charset=UTF-8',
        cache: false,
        async: false,
        success: function(data) {
            meninyJSON = data.meniny.zaznam;
        },
        error: function (a, b, c) {
        },
        complete: function(data) {
        },
    })
}

//searches the parsed JSON for the current formatted date and writes the output into "meninyNameResult" div
function getMeniny(){
    var currentFormattedDate = getCurrentFormattedDate();
    
    for (zaznam in meninyJSON) {
        if (meninyJSON[zaznam].den == currentFormattedDate) {
            appendToHTMLElement("meninyNameResult", (" " + meninyJSON[zaznam].SK));
        }
    }
}


//------Date Utilities ----------------------------------------------------------------------------------------------------------------------

//returns current date in "ddmmyyyy" format 
//https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var currentDate = dd + '.' + mm + '.' + yyyy;
    
    writeIntoHTMLElement("currentDate", ("Dnes: " + currentDate) ) ;
}



//returns current date in "mmdd" format 
//https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function getCurrentFormattedDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    
    return mm + '' + dd;
}


function getDateFromFormattedDate(DateString) {
    var mm = DateString.substr(0,2);
    var dd = DateString.substr(2,3);
    
    return (dd + "." + mm);
}

//Parse formatted date in mmdd format from search input String
function parseFormattedDatefromString (input) {
    var splitInput = input.split(".");
    
    var dd = parseInt(splitInput[0], 10);
    var mm = parseInt(splitInput[1], 10);
    
    if (dd<10)
        var dd = "0" + dd;
    if (mm<10)
        var mm = "0" + mm;
    
    
    return (mm + "" + dd);
}


//checks the correct formatting of the search input date
//checks for dates with year and without year separately
//regex is modified from: https://www.regextester.com/97332
function checkSearchInputDateValidity(input) {
    var regExWOYear = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])|([1-9]|[12][0-9]|3[01])[- /.]([1-9]|1[012])/g;
    var regExWYear = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d|([1-9]|[12][0-9]|3[01])[- /.]([1-9]|1[012])[- /.](19|20)\d\d/g;
    
    if (input.match(regExWYear) == input) {
        return true;
    }
    if (input.match(regExWOYear) == input) {
        return true;
    }
    return false;
    
}


//------ Search meniny ----------------------------------------------------------------------------------------------------------------------


function processSearchInput() {
    var rawInput = readFromHTMLElement("searchJSONInput");
    
    //check, if the input is valid (no empty strings, no "-")
    if ((rawInput == "") & (rawInput == "-")) {
        alert("Search Input is invalid. Please only put in dates in dd.mm or d.m format, or full names.");
        return;
    }
        
    
    //check, if the raw input contains numbers
    else if (searchForNumbersInString(rawInput)) {
        searchNameInDatabase(convertToASCIILowerCase(rawInput));
    }
    else if (checkSearchInputDateValidity (rawInput)){
        searchDateInDatabase(rawInput);
    }
    else 
        alert("Search Input is invalid. Please only put in dates in dd.mm format, or full names.");
    
}

//looks for any digits in the input string and checks the validity (no empty strings, no numbers and "-" )
//if it doesn't contain numbers     -> name
//Input: input - UTF8 Name
//Return: input name in lower case and ASCII
function searchForNumbersInString( input ) {
    var regEx = /\d+/;
    

    
    if (input.match(regEx) == null) {
        return true;
    }
    else {
        return false;
    }
}

//------Search input is a name ----------------------------------------------------------------------------------------------------------------------

//converts text to ASCII and lower case
//https://www.pcforum.sk/odstranenie-diakritiky-vt25925.html
function convertToASCIILowerCase( text ) {
    var convertText = "";

    for(i=0; i<text.length; i++) {
        if(dia.indexOf(text.charAt(i))!=-1) {
            convertText += nodia.charAt(dia.indexOf(text.charAt(i)));
        }
        else {
            convertText += text.charAt(i);
        }
    }
    convertText = convertText.toLowerCase();
    return convertText;
}

//Searching every day, splitting SKd by ", " and calling searchNameInSplitString.
//Ends after the first occurance
function searchNameInDatabase( searchString ) {  
    for (zaznam in meninyJSON) {
        var foundName = searchNameInSplitString((meninyJSON[zaznam].SKd).split(", "), searchString);
        if (foundName != null) {
            writeIntoHTMLElement("meninySearchResult", (foundName + " má meniny " + getDateFromFormattedDate(meninyJSON[zaznam].den)));
            return;
        }
    }
    writeIntoHTMLElement("meninySearchResult", ("Meno " + searchString + " nebolo v databáze nájdené "));
}

// converts every substring into ASCII LowerCase and compares to the searchString
// returns the found name in UTF8 or null, if no match is found
function searchNameInSplitString( str, searchString) {
    for (subStr in str) {
        if (convertToASCIILowerCase(str[subStr]).localeCompare(searchString) == 0) {
            return str[subStr];
        }
    }
    return null;
}


//------Search input is a valid date ----------------------------------------------------------------------------------------------------------------------

function searchDateInDatabase( input ) {
    var parsedDate = parseFormattedDatefromString(input);
    for (zaznam in meninyJSON) {
        if (meninyJSON[zaznam].den == parsedDate) {
            if (meninyJSON[zaznam].SKd != "-") {
                writeIntoHTMLElement("meninySearchResult", (input + " má meniny " + meninyJSON[zaznam].SKd));
                return;
            }
            else {
                writeIntoHTMLElement("meninySearchResult", (input + " je " + meninyJSON[zaznam].SKdni));
                return;
            }
        }
    }
}













































