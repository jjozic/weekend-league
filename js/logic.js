
//var winCount = 0;
updateScreen();
var isPens = false;
var result = "0-0";

function updateScreen(){
    if(localStorage.winCount){
        document.getElementById("winCount").innerHTML = localStorage.winCount;
    }
    var rankImg = getRank(localStorage.winCount);
    if(rankImg){
        document.getElementById("rankImg").src = rankImg;
    }
}

function addGame(){
    //draw new changes
    updateScreen();
    //get the score from the input field
    var inputValue = document.getElementById("scoreInput").value;
    var t = document.createTextNode(inputValue);
    var checkedResult = checkResult(inputValue);
    //if pen result was added correctly
    if(checkedResult&&isPens){
        var li = document.createElement("li");
        t = document.createTextNode(result + " ("+inputValue+")");
        li.appendChild(t);
        li.classList.add(checkedResult);
        document.getElementById("list").appendChild(li);
        document.getElementById("scoreInput").placeholder = "Insert Result with your goals first... (eg. 3-1, 1-3)";
        isPens = false;
    }
    //if result was enterd correctly
    else if(checkedResult){
        var li = document.createElement("li");
        li.appendChild(t);
        li.classList.add(checkedResult);
        document.getElementById("list").appendChild(li);
    }
    
    /*
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("list").appendChild(li);
    }*/
    document.getElementById("scoreInput").value = "";
}

function resetWins(){
    localStorage.winCount = 0;
    document.getElementById("winCount").innerHTML = localStorage.winCount;
}

function checkResult(str) { 
    matches = str.match(/\d+/g); 
    var i=0 
  
    //win
    if (matches[0]>matches[1]){
        if(localStorage.winCount){
            localStorage.winCount++;
        }
        else{
            localStorage.winCount=1;
        }
        //set wincount
        document.getElementById("winCount").innerHTML = localStorage.winCount;
        return "winStyle";
    }
    //draw -> add penalties score
    else if (matches[0]==matches[1]) {
        //var element = document.getElementById("penInput");
        //element.classList.remove("hide");
        var input = document.getElementById("scoreInput");
        input.value = "";
        input.placeholder = "Add result of penalties here...";
        result = str;
        isPens = true;
        return;
    } 
    //loss
    else if (matches[0]<matches[1]) {
        //TODO: make fixed formatting for the results
        return "lossStyle";
    } 
    return null;
} 

//for the rank image depending on number of wins
function getRank(count){
    var num = parseInt(count);
    switch (true){
        case num<2:
            return "img/rank/bronze-3.png";
        case num<4:
            return "img/rank/bronze-2.png";
        case num<6:
            return "img/rank/bronze-1.png";
        case num<8:
            return "img/rank/silver-3.png";
        case num<11:
            return "img/rank/silver-2.png";
        case num<14:
            return "img/rank/silver-1.png";
        case num<17:
            return "img/rank/gold-3.png";
        case num<20:
            return "img/rank/gold-2.png";
        case num<23:
            return "img/rank/gold-1.png";
        case num<25:
            return "img/rank/elite-3.png";
        case num<27:
            return "img/rank/elite-2.png";
        case num<30:
            return "img/rank/elite-1.png";
        }
}