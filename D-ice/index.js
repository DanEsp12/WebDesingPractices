var randomNumber1 = String(Math.floor(Math.random() * 6 + 1));
var img1 = document.getElementById("img1")
var img1Dir = "images/dice" + randomNumber1 + ".png"

var randomNumber2 = String(Math.floor(Math.random() * 6 + 1));
var img2 = document.getElementById("img2")
var img2Dir = "images/dice" + randomNumber2 + ".png"

img1.src = img1Dir
img2.src = img2Dir

var result = document.getElementById("result")

if(randomNumber1 > randomNumber2){
    result.innerHTML = "Player 1 wins!!"
}
else if(randomNumber2 > randomNumber1){
    result.innerHTML = "Player 2 wins!!"
}
else{
    result.innerHTML = "Draw"
}
