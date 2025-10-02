import { BaseMorty } from './morties/BaseMorty.js';

export class CustomMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Custom Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator, rickValue2) {
        const remainingBoxes = [selectedBox];

        if (selectedBox !== portalGunBox) {
            remainingBoxes.push(portalGunBox);
        } else {
            const otherBoxes = Array.from({length: this.numBoxes}, (_, i) => i)
                .filter(box => box !== selectedBox);
            const randomIndex = Math.floor(Math.random() * otherBoxes.length);
            remainingBoxes.push(otherBoxes[randomIndex]);
        }

        console.log("Custom Morty: Using my special algorithm!");
        return remainingBoxes;
    }

    calculateProbability(didSwitch) {
        return didSwitch ? 0.8 : 0.2;
    }

    getRemarks() {
        return "I'm a custom Morty with my own behavior!";
    }
}
