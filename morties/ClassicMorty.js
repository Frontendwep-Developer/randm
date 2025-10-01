import { BaseMorty } from './BaseMorty.js';

export class ClassicMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Classic Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator, rickValue2) {
        // Har doim 2 ta quti qaytarish kerak
        const remainingBoxes = [selectedBox];

        // Boshqa barcha qutilarni olish
        const allBoxes = Array.from({length: this.numBoxes}, (_, i) => i);
        const otherBoxes = allBoxes.filter(box => box !== selectedBox);

        // HMAC2 dan foydalanib qutini tanlash
        const keptBoxIndex = randomGenerator.getFinalValue(rickValue2, otherBoxes.length);
        const keptBox = otherBoxes[keptBoxIndex];

        // Ikkinchi qutini qo'shish (agar takrorlanmas bo'lsa)
        if (keptBox !== selectedBox) {
            remainingBoxes.push(keptBox);
        } else {
            // Agar tanlangan quti bo'lsa, boshqa qutini tanlash
            const availableBoxes = otherBoxes.filter(box => box !== keptBox);
            if (availableBoxes.length > 0) {
                const alternativeBox = availableBoxes[0];
                remainingBoxes.push(alternativeBox);
            }
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