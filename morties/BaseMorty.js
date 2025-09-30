export class BaseMorty {
    constructor(numBoxes) {
        this.numBoxes = numBoxes;
        this.name = "Base Morty";
    }

    async removeBoxes(selectedBox, portalGunBox, randomGenerator) {
        throw new Error("removeBoxes method must be implemented");
    }

    calculateProbability(didSwitch) {
        throw new Error("calculateProbability method must be implemented");
    }

    getRemarks() {
        return "Oh, geez Rick...";
    }
}