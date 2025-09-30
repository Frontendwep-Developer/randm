# RandM - Rick and Morty Portal Gun Game

A complete implementation of the Monty Hall problem with Rick and Morty theme.

## Features
- Provably fair random generation using HMAC-SHA3-256
- ClassicMorty and LazyMorty implementations  
- Game statistics with probability calculations
- Command-line interface

## Installation
\`\`\`bash
git clone https://github.com/Frontendwep-Developer/randm.git
cd randm
npm install
\`\`\`

## Usage
\`\`\`bash
# Classic Morty with 3 boxes
node main.js 3 classic classic

# Lazy Morty with 4 boxes
node main.js 4 lazy lazy
\`\`\`

## Game Rules
1. Morty hides portal gun in one of N boxes
2. Rick selects one box
3. Morty opens N-2 empty boxes
4. Rick chooses to switch or stay
5. Result revealed with full transparency
