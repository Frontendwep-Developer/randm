import { BaseMorty } from './BaseMorty.js';

export class EvilMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Evil Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator) {
        const remainingBoxes = [selectedBox];

        if (selectedBox === portalGunBox) {
            const otherBoxes = Array.from({length: this.numBoxes}, (_, i) => i)
                .filter(box => box !== selectedBox);

            const hmac = randomGenerator.generateMortyValue(otherBoxes.length);
            console.log(`Morty: HMAC = ${hmac}`);
            console.log(`Morty: Rick, which box should I keep? [0,${otherBoxes.length - 1}]`);

            const rickValue = 0;
            const keptBoxIndex = randomGenerator.getFinalValue(rickValue, otherBoxes.length);
            const keptBox = otherBoxes[keptBoxIndex];

            remainingBoxes.push(keptBox);
        } else {
            remainingBoxes.push(portalGunBox);
        }

        return remainingBoxes;
    }

    calculateProbability(didSwitch) {
        if (didSwitch) {
            return 0.5;
        } else {
            return 0.5;
        }
    }

    getRemarks() {
        const remarks = [
            "You still don't understand my plan, Rick...",
            "This isn't just a game, Rick. It's personal.",
            "Let's test your intelligence, Rick.",
            "I've been planning this for a long time, Rick...",
            "You're not as smart as you think, Rick."
        ];
        return remarks[Math.floor(Math.random() * remarks.length)];
    }
}
