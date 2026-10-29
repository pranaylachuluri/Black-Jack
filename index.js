const STARTING_CHIPS = 200
const SUITS = ["♠", "♥", "♦", "♣"]
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

let player = {
    name: "Player",
    chips: STARTING_CHIPS
}
let deck = []
let cards = []
let dealerCards = []
let bet = 0
let isAlive = false

let playerEl = document.getElementById("player-el")
let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let betEl = document.getElementById("bet-el")
let dealBtn = document.getElementById("deal-btn")
let hitBtn = document.getElementById("hit-btn")
let standBtn = document.getElementById("stand-btn")
let doubleBtn = document.getElementById("double-btn")

// A fresh, shuffled 52-card deck (Fisher-Yates)
function buildDeck() {
    let newDeck = []
    for (let suit of SUITS) {
        for (let rank of RANKS) {
            newDeck.push({ rank: rank, suit: suit })
        }
    }
    for (let i = newDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = newDeck[i]
        newDeck[i] = newDeck[j]
        newDeck[j] = temp
    }
    return newDeck
}

function drawCard() {
    if (deck.length < 15) {
        deck = buildDeck()
    }
    return deck.pop()
}

// Aces count as 11 unless that would bust the hand, then as 1
function handValue(hand) {
    let total = 0
    let aces = 0
    for (let card of hand) {
        if (card.rank === "A") {
            total += 11
            aces += 1
        } else if (["J", "Q", "K"].includes(card.rank)) {
            total += 10
        } else {
            total += Number(card.rank)
        }
    }
    while (total > 21 && aces > 0) {
        total -= 10
        aces -= 1
    }
    return total
}

function isBlackjack(hand) {
    return hand.length === 2 && handValue(hand) === 21
}

function cardHtml(card) {
    let red = card.suit === "♥" || card.suit === "♦"
    return `<span class="card${red ? " red" : ""}">${card.rank}${card.suit}</span>`
}

function startGame() {
    let wanted = Math.floor(Number(betEl.value))
    if (!wanted || wanted <= 0) {
        messageEl.textContent = "Enter a bet greater than 0."
        return
    }
    if (wanted > player.chips) {
        messageEl.textContent = `You only have $${player.chips} in chips.`
        return
    }

    bet = wanted
    player.chips -= bet
    cards = [drawCard(), drawCard()]
    dealerCards = [drawCard(), drawCard()]
    isAlive = true

    if (isBlackjack(cards) || isBlackjack(dealerCards)) {
        endRound()
    } else {
        messageEl.textContent = "Do you want to draw a new card?"
        renderGame()
    }
}

function newCard() {
    if (!isAlive) {
        return
    }
    cards.push(drawCard())
    let sum = handValue(cards)
    if (sum > 21) {
        endRound()
    } else if (sum === 21) {
        stand()
    } else {
        messageEl.textContent = "Do you want to draw a new card?"
        renderGame()
    }
}

// Double the bet, take exactly one more card, then stand
function doubleDown() {
    if (!isAlive || cards.length !== 2 || player.chips < bet) {
        return
    }
    player.chips -= bet
    bet *= 2
    cards.push(drawCard())
    if (handValue(cards) > 21) {
        endRound()
    } else {
        stand()
    }
}

// Dealer draws until reaching 17 or more
function stand() {
    if (!isAlive) {
        return
    }
    while (handValue(dealerCards) < 17) {
        dealerCards.push(drawCard())
    }
    endRound()
}

function endRound() {
    isAlive = false
    let sum = handValue(cards)
    let dealerSum = handValue(dealerCards)
    let message = ""

    if (isBlackjack(cards) && isBlackjack(dealerCards)) {
        player.chips += bet
        message = "Both have Blackjack. Push, your bet is returned."
    } else if (isBlackjack(cards)) {
        player.chips += Math.floor(bet * 2.5)
        message = "Wohoo! You've got a Blackjack! 🥳 Pays 3 to 2."
    } else if (isBlackjack(dealerCards)) {
        message = "Dealer has Blackjack. You lose."
    } else if (sum > 21) {
        message = "Bust! You're out of this round."
    } else if (dealerSum > 21) {
        player.chips += bet * 2
        message = "Dealer busts. You win! 🎉"
    } else if (sum > dealerSum) {
        player.chips += bet * 2
        message = `You win ${sum} to ${dealerSum}! 🎉`
    } else if (sum < dealerSum) {
        message = `Dealer wins ${dealerSum} to ${sum}.`
    } else {
        player.chips += bet
        message = `Push at ${sum}. Your bet is returned.`
    }

    if (player.chips <= 0) {
        message += " You're out of chips. Press RESET CHIPS to play again."
    }
    messageEl.textContent = message
    renderGame()
}

function renderGame() {
    cardsEl.innerHTML = cards.map(cardHtml).join("")
    sumEl.textContent = cards.length ? `(${handValue(cards)})` : ""

    // Hide the dealer's hole card until the round is over
    if (isAlive) {
        dealerCardsEl.innerHTML = cardHtml(dealerCards[0]) + `<span class="card hidden">?</span>`
        dealerSumEl.textContent = ""
    } else {
        dealerCardsEl.innerHTML = dealerCards.map(cardHtml).join("")
        dealerSumEl.textContent = dealerCards.length ? `(${handValue(dealerCards)})` : ""
    }

    playerEl.textContent = `${player.name}: $${player.chips}` + (isAlive ? ` · Bet: $${bet}` : "")
    dealBtn.disabled = isAlive || player.chips <= 0
    betEl.disabled = isAlive
    hitBtn.disabled = !isAlive
    standBtn.disabled = !isAlive
    doubleBtn.disabled = !isAlive || cards.length !== 2 || player.chips < bet
}

function resetChips() {
    if (isAlive) {
        return
    }
    player.chips = STARTING_CHIPS
    cards = []
    dealerCards = []
    messageEl.textContent = "Chips reset. Place a bet to start a round."
    renderGame()
}

deck = buildDeck()
renderGame()
