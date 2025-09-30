import { ProvablyFairRandomGenerator } from './RandomGenerator.js';
import { GameStatistics } from './Statistics.js';
import readline from 'readline';

class GameCore {
    constructor(numBoxes, mortyPath, mortyClassName) {
        this.numBoxes = numBoxes;
        this.mortyPath = mortyPath;
        this.mortyClassName = mortyClassName;
        this.statistics = new GameStatistics();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.morty = null;
    }

    async run() {
        try {
            await this.loadMorty();

            console.log(`\n${this.morty.getRemarks()}`);
            console.log(`Morty: I hid your portal gun in one of ${this.numBoxes} boxes!`);

            let playAgain = true;
            while (playAgain) {
                await this.playRound();
                playAgain = await this.askPlayAgain();
            }

            this.displayFinalStatistics();

        } catch (error) {
            console.log(`Error: ${error.message}`);
        } finally {
            this.rl.close();
        }
    }

    async loadMorty() {
        const mortyType = this.mortyPath.toLowerCase();

        if (mortyType.includes('classic')) {
            const { ClassicMorty } = await import('../morties/ClassicMorty.js');
            this.morty = new ClassicMorty(this.numBoxes);
        } else if (mortyType.includes('lazy')) {
            const { LazyMorty } = await import('../morties/LazyMorty.js');
            this.morty = new LazyMorty(this.numBoxes);
        } else {
            const { ClassicMorty } = await import('../morties/ClassicMorty.js');
            this.morty = new ClassicMorty(this.numBoxes);
        }

        console.log(`Morty type: ${this.morty.name}`);
    }

    async playRound() {
        const randomGen1 = new ProvablyFairRandomGenerator();
        const randomGen2 = new ProvablyFairRandomGenerator();

        console.log(`\n=== ROUND STARTED ===`);

        const hmac1 = randomGen1.generateMortyValue(this.numBoxes);
        console.log(`Morty: HMAC1 = ${hmac1}`);
        console.log(`Morty: Rick, enter your number [0,${this.numBoxes - 1}]:`);

        const rickValue1 = await this.getNumberInput(0, this.numBoxes - 1);
        const portalGunBox = randomGen1.getFinalValue(rickValue1, this.numBoxes);

        console.log(`\nMorty: OK, I hid the portal gun. Which box do you think it's in? [0,${this.numBoxes - 1}]`);
        const selectedBox = await this.getNumberInput(0, this.numBoxes - 1);

        const remainingBoxes = await this.morty.removeBoxes(selectedBox, portalGunBox, randomGen2);

        console.log(`\nMorty: Remaining boxes: ${remainingBoxes.join(', ')}`);

        console.log(`\nMorty: Do you want to switch your box?`);
        console.log(`0 - Switch to another box (${remainingBoxes.find(b => b !== selectedBox)})`);
        console.log(`1 - Keep your box (${selectedBox})`);

        const switchChoice = await this.getNumberInput(0, 1);
        const finalChoice = switchChoice === 0 ?
            remainingBoxes.find(b => b !== selectedBox) : selectedBox;

        const didWin = finalChoice === portalGunBox;

        console.log(`\n=== RESULT ===`);
        const secrets1 = randomGen1.revealSecrets();
        console.log(`Morty: My 1st random value: ${secrets1.mortyValue}`);
        console.log(`Morty: Key1: ${secrets1.secretKey}`);
        console.log(`Morty: So the 1st fair number: (${rickValue1} + ${secrets1.mortyValue}) % ${this.numBoxes} = ${portalGunBox}`);

        console.log(`\nMorty: The portal gun was in box ${portalGunBox}!`);
        console.log(`Morty: You selected box ${finalChoice}!`);

        if (didWin) {
            console.log('Morty: Congratulations, Rick, you won!');
        } else {
            console.log('Morty: Aww man, you lost, Rick!');
        }

        this.statistics.recordGame(switchChoice === 0, didWin);
    }

    async getNumberInput(min, max) {
        while (true) {
            const input = await this.question(`Rick: `);
            const number = parseInt(input);

            if (!isNaN(number) && number >= min && number <= max) {
                return number;
            }
            console.log(`Error: Enter a number between ${min} and ${max}.`);
        }
    }

    async askPlayAgain() {
        console.log(`\nPlay again? (yes/no)`);
        const answer = await this.question(`Rick: `);
        return answer.toLowerCase().startsWith('y');
    }

    displayFinalStatistics() {
        const theoretical = {
            switched: this.morty.calculateProbability(true),
            stayed: this.morty.calculateProbability(false)
        };

        this.statistics.displayStatistics(theoretical);
    }

    question(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, resolve);
        });
    }
}

export { GameCore };