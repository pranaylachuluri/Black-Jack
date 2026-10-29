# Blackjack

A browser Blackjack game against a dealer, written in plain HTML, CSS and JavaScript with no libraries.

**Play it:** https://pranaylachuluri.github.io/Black-Jack/

![Screenshot](https://github.com/pranaylachuluri/Black-Jack/assets/103355762/3228eeed-8361-4829-a160-2b111b34c343)

## How to play

1. Enter a bet and press **DEAL**. You start with $200 in chips.
2. Press **HIT** to draw a card or **STAND** to keep your hand. **DOUBLE** doubles your bet, draws exactly one more card and stands.
3. The dealer reveals the hidden card and draws until reaching 17 or more.
4. Get closer to 21 than the dealer without going over. A win pays 1:1, a natural Blackjack pays 3:2, and a tie (push) returns your bet.

## Features

- A real 52-card deck, shuffled with Fisher–Yates and reshuffled when it runs low
- Aces count as 11 or 1, whichever keeps the hand at 21 or below
- Dealer hole card stays hidden until the round ends
- Betting with a chip balance, double down, and a reset when you run out of chips

## Run locally

Open `index.html` in any browser.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page layout and buttons |
| `index.js` | Deck, hand scoring, dealer logic and betting |
| `index.css` | Table styling and card faces |
