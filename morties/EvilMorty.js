import { BaseMorty } from './BaseMorty.js';

export class EvilMorty extends BaseMorty {
    constructor(numBoxes) {
        super(numBoxes);
        this.name = "Evil Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator) {
        // Evil Morty - Rickni aldashga harakat qiladi
        const remainingBoxes = [selectedBox];

        // Agar Rick to'g'ri tanlagan bo'lsa, portal qurolini olib tashlashga harakat qiladi
        if (selectedBox === portalGunBox) {
            // Rick to'g'ri tanlagan - uni aldash uchun portal qurolini olib tashlaydi
            const otherBoxes = Array.from({length: this.numBoxes}, (_, i) => i)
                .filter(box => box !== selectedBox);

            // Tasodifiy boshqa qutini saqlab qoladi
            const hmac = randomGenerator.generateMortyValue(otherBoxes.length);
            console.log(`Morty: HMAC = ${hmac}`);
            console.log(`Morty: Rick, which box should I keep? [0,${otherBoxes.length - 1}]`);

            const rickValue = 0; // Test uchun
            const keptBoxIndex = randomGenerator.getFinalValue(rickValue, otherBoxes.length);
            const keptBox = otherBoxes[keptBoxIndex];

            remainingBoxes.push(keptBox);
        } else {
            // Rick noto'g'ri tanlagan - portal quroli bo'lgan qutini saqlab qoladi
            remainingBoxes.push(portalGunBox);
        }

        return remainingBoxes;
    }

    calculateProbability(didSwitch) {
        // Evil Morty uchun ehtimollar murakkab
        // U Rickni aldashga harakat qiladi
        if (didSwitch) {
            return 0.5; // Aldash urinishlari tufayli ehtimollar o'zgaradi
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
