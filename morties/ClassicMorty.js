import { BaseMorty } from './BaseMorty.js';

export class ClassicMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Classic Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator) {
        const remainingBoxes = [selectedBox];

        const otherBoxes = Array.from({length: this.numBoxes}, (_, i) => i)
            .filter(box => box !== selectedBox);

        if (!otherBoxes.includes(portalGunBox)) {
            otherBoxes.push(portalGunBox);
        }

        const hmac = randomGenerator.generateMortyValue(otherBoxes.length);
        console.log(`Morty: HMAC = ${hmac}`);
        console.log(`Morty: Rick, which box should I keep? [0,${otherBoxes.length - 1}]`);

        const rickValue = 0;
        const keptBoxIndex = randomGenerator.getFinalValue(rickValue, otherBoxes.length);
        const keptBox = otherBoxes[keptBoxIndex];

        remainingBoxes.push(keptBox);
        return remainingBoxes;
    }

    calculateProbability(didSwitch) {
        if (didSwitch) {
            return (this.numBoxes - 1) / this.numBoxes;
        } else {
            return 1 / this.numBoxes;
        }
    }

    getRemarks() {
        const remarks = [
            "Oh geez, Rick, I'm gonna hide your portal gun...",
            "Aww man, this is gonna be a tough choice, Rick!",
            "Geez, Rick, I told you this would happen!",
            "I-I don't know, Rick, this looks risky..."
        ];
        return remarks[Math.floor(Math.random() * remarks.length)];
    }
}