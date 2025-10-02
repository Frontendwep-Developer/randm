import { BaseMorty } from './BaseMorty.js';

export class LazyMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Lazy Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator, rickValue2) {
        const remainingBoxes = [selectedBox];

        const allBoxes = Array.from({length: this.numBoxes}, (_, i) => i);

        const otherBoxes = allBoxes.filter(box => box !== selectedBox);

        if (otherBoxes.includes(portalGunBox)) {
            remainingBoxes.push(portalGunBox);
        } else {
            remainingBoxes.push(otherBoxes[0]);
        }

        console.log(`Morty: I'm too lazy to think... I'll just keep boxes ${remainingBoxes.join(' and ')}`);

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
            "Uhh, Rick, I'm tired... let's finish this quickly.",
            "Geez, how long is this gonna take? I wanna sleep...",
            "Rick, can we do this tomorrow?",
            "I'm just keeping the obvious boxes... too much work otherwise."
        ];
        return remarks[Math.floor(Math.random() * remarks.length)];
    }
}