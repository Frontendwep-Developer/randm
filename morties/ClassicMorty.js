import { BaseMorty } from './BaseMorty.js';

export class ClassicMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Classic Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator) {
        // Classic Morty portal quroli bo'lgan qutini hech qachon olib tashlamaydi
        const remainingBoxes = [selectedBox];

        // Qolgan qutilardan tasodifiy tanlash
        const otherBoxes = Array.from({length: this.numBoxes}, (_, i) => i)
            .filter(box => box !== selectedBox);

        // Agar portal quroli tanlanmagan bo'lsa, uni saqlab qolish
        if (!otherBoxes.includes(portalGunBox)) {
            otherBoxes.push(portalGunBox);
        }

        // ⚠️ YANGI: Rickdan so'ramaymiz, o'zimiz tasodifiy yaratamiz
        // Ikkinchi HMAC ni yaratish
        const hmac2 = randomGenerator.generateMortyValue(otherBoxes.length);
        console.log(`Morty: HMAC2 = ${hmac2}`);
        console.log(`Morty: I'm generating a fair random number to decide which box to keep...`);

        // Morty o'zi tasodifiy raqam yaratadi (Rick kiritishi shart emas)
        const mortyRandomValue = Math.floor(Math.random() * otherBoxes.length);
        const keptBoxIndex = randomGenerator.getFinalValue(mortyRandomValue, otherBoxes.length);
        const keptBox = otherBoxes[keptBoxIndex];

        console.log(`Morty: I'll keep box ${keptBox} based on the fair random generation`);

        remainingBoxes.push(keptBox);
        return remainingBoxes;
    }

    calculateProbability(didSwitch) {
        // Classic Monty Hall ehtimoli
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