import { BaseMorty } from './BaseMorty.js';

export class LazyMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Lazy Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator) {
        const remainingBoxes = [selectedBox];

        const otherBoxes = Array.from({length: this.numBoxes}, (_, i) => i)
            .filter(box => box !== selectedBox)
            .sort((a, b) => a - b);

        if (!otherBoxes.includes(portalGunBox)) {
            otherBoxes.push(portalGunBox);
            otherBoxes.sort((a, b) => a - b);
        }

        const keptBox = otherBoxes[0];
        remainingBoxes.push(keptBox);

        console.log(`Morty: I kept box ${keptBox} because... ah, I'm too tired.`);

        return remainingBoxes;
    }

    calculateProbability(didSwitch) {
        return 0.5;
    }

    getRemarks() {
        const remarks = [
            "Uhh, Rick, I'm tired... let's finish this quickly.",
            "Geez, how long is this gonna take? I wanna sleep...",
            "Rick, can we do this tomorrow?",
            "I'm just opening the closest box because... you know, I'm really tired."
        ];
        return remarks[Math.floor(Math.random() * remarks.length)];
    }
}