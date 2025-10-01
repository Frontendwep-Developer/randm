import { BaseMorty } from './BaseMorty.js';

export class ClassicMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Classic Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator, rickValue2) {
        const remainingBoxes = [selectedBox];

        const otherBoxes = Array.from({length: this.numBoxes}, (_, i) => i)
            .filter(box => box !== selectedBox);

        if (!otherBoxes.includes(portalGunBox)) {
            otherBoxes.push(portalGunBox);
        }

        const keptBoxIndex = randomGenerator.getFinalValue(rickValue2, otherBoxes.length);
        const keptBox = otherBoxes[keptBoxIndex];

        if (!remainingBoxes.includes(keptBox)) {
            remainingBoxes.push(keptBox);
        }

        console.log(`Morty: I'll keep box ${keptBox} based on fair random generation`);

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