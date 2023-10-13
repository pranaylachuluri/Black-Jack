
let player = {
    name:"per",
    chips:200
}
let cards=[]
let sum= 0
let hasBlackjack = false
let isAlive = false
let message = ""

let sumEl=document.getElementById("sum-el")

let messageEl = document.getElementById("message-el")

let cardsEl = document.getElementById("cards-el")

let playerEl =document.getElementById("id-el")
 

function startGame(){
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards=[firstCard,secondCard]
    sum=firstCard+secondCard
    isAlive=true
    renderGame()
}

function renderGame() {
    cardsEl.textContent="Cards: "

    for(let i=0;i<cards.length;i++){
        cardsEl.textContent+=cards[i]+ " "
    }
    sumEl.textContent="Sum: "+ sum
    if(sum<=20){
        message="Do you want to draw a new card?"
    }else if(sum == 21){
        message="Wohoo! You've got a Blackjack! 🥳" 
        hasBlackjack=true   
    }else{
        message="You're out of the game" 
        isAlive=false
    
    }
    
    messageEl.textContent=message

}

function newCard(){
    if(isAlive === true && hasBlackjack === false){
        let card = getRandomCard()
        cards.push(card)
    
        sum+=card
    
        renderGame()

    }



}

function getRandomCard(){
    let random= Math.floor(Math.random()*13) + 1
    if(random > 10){
        return 10
    }else if(random===1){
        return 11
    }else{
        return random
    }

}
