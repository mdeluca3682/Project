let honey = document.getElementById("honey-button")
let displayHoney = document.getElementById("displayHoney")
let upgradeClicker = document.getElementById("upgradeClicker")
let displayUpgradeCost = document.getElementById("displayUpgradeCost")
let autoClicker = document.getElementById("autoClicker")
let displayAutoClickerCost = document.getElementById("displayAutoClickerCost")

honey.addEventListener("click", honeyClicked)
upgradeClicker.addEventListener("click", upgradeClickerClicked)
autoClicker.addEventListener("click", autoClickerClicked)

let honeys = 0
let multiplier = 1
let multiplierCost = 25
let autoClickers = 0
let autoClickerCost = 50

function honeyClicked() {
    honeys = honeys + multiplier
    displayHoneyAmount()
}

function displayHoneyAmount() {
    displayHoney.innerHTML = (`<p>You have ${Math.floor(honeys)} honey!</p>`)
}

function upgradeClickerClicked() {
    if(honeys >= multiplierCost){
        honeys = honeys - multiplierCost
        multiplier = multiplier + 1
        multiplierCost = multiplierCost * 1.5
        displayUpgradeCost.innerHTML = (`<p>Upgrade costs ${Math.floor(multiplierCost)} honey!</p>`)
        displayHoneyAmount()
    }
    else{
        alert("Not enough honey!")
    }
}

function autoClickerClicked() {
    if(honeys >= autoClickerCost){
        honeys = honeys - autoClickerCost
        displayHoneyAmount()
        autoClickers = autoClickers + 1
        autoClickerCost = autoClickerCost * 1.5
        displayAutoClickerCost.innerHTML = (`<p>Auto Clicker costs ${Math.floor(autoClickerCost)} honey!</p>`)
    }
    else{
        alert("Not enough honey!")
    }
}

setInterval(function(){
    honeys = honeys + autoClickers * .1
    displayHoneyAmount()
}, 100)