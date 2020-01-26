updateScreen()

function updateScreen(){
    if(localStorage.winCount){
        document.getElementById("winCount").innerHTML = localStorage.winCount;
    }
    var rankImg = getRank(localStorage.winCount)
    if(rankImg){
        document.getElementById("rankImg").src = rankImg
    }
}

function goalScored(){
    console.log('goal scored by ney')
}

function addGame(){
    let yourScore = document.getElementById("yourScore").value
    let opponentScore = document.getElementById("opponentScore").value

    //draw new changes
    updateScreen()
    //get the score from the input field
    var t = document.createTextNode(yourScore+'-'+opponentScore)
    var checkedResult = checkResult(yourScore, opponentScore)
    //if result was entered correctly
    if(checkedResult){
        var li = document.createElement("li")
        li.appendChild(t)
        li.classList.add(checkedResult)
        document.getElementById("list").appendChild(li)
    }
    //reset fields
    document.getElementById("yourScore").value = 0
    document.getElementById("opponentScore").value = 0
    document.getElementById("penalties").classList.remove("hide")
    document.querySelector('#penaltiesWon').checked = false
}

function checkResult(yourScore, opponentScore) { 
    let pensWon = document.querySelector('#penaltiesWon').checked

    //win
    if (yourScore>opponentScore){
        if(localStorage.winCount){
            localStorage.winCount++
        }
        else{
            localStorage.winCount=1
        }
        //set wincount
        document.getElementById("winCount").innerHTML = localStorage.winCount
        return "winStyle"
    }
    //loss
    else if (yourScore<opponentScore) {
        return "lossStyle";
    }
    //penalty win
    else if(yourScore===opponentScore&&pensWon){
        if(localStorage.winCount){
            localStorage.winCount++
        }
        else{
            localStorage.winCount=1
        }
        //set wincount
        document.getElementById("winCount").innerHTML = localStorage.winCount
        return "winStyle"
    }
    //penalty loss
    else if(yourScore===opponentScore&&!pensWon){
        return "lossStyle"
    }
    return null
} 

function resetWins(){
    //reset localStorage
    localStorage.winCount = 0
    document.getElementById("winCount").innerHTML = localStorage.winCount
    let list = document.getElementById("list")
    //removes all the games from the list
    while( list.firstChild ){
        list.removeChild( list.firstChild )
      }
}

function changeNumber(btn, val){
    let currentVal = document.getElementById(btn).value;
    if(val===1&&currentVal<20){
        document.getElementById(btn).value++
    }
    else if(val===-1&&currentVal>0){
        document.getElementById(btn).value--
    }
    checkForPenalties()
}

function checkForPenalties(){
    if (document.getElementById("yourScore").value !== document.getElementById("opponentScore").value){
        document.getElementById("penalties").classList.add("hide")
    }
    else{
        document.getElementById("penalties").classList.remove("hide")
    }
}

//for the rank image depending on number of wins
function getRank(count){
    var num = parseInt(count)
    switch (true){
        case num<2:
            return "img/rank/bronze-3.png"
        case num<4:
            return "img/rank/bronze-2.png"
        case num<6:
            return "img/rank/bronze-1.png"
        case num<8:
            return "img/rank/silver-3.png"
        case num<11:
            return "img/rank/silver-2.png"
        case num<14:
            return "img/rank/silver-1.png"
        case num<17:
            return "img/rank/gold-3.png"
        case num<20:
            return "img/rank/gold-2.png"
        case num<23:
            return "img/rank/gold-1.png"
        case num<25:
            return "img/rank/elite-3.png"
        case num<27:
            return "img/rank/elite-2.png"
        case num<30:
            return "img/rank/elite-1.png"
        }
}