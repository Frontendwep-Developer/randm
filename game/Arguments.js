export class Arguments {
    static parseArguments() {
        const args = process.argv.slice(2);

        if (args.length < 2) {
            throw new Error(
                "Not enough arguments provided.\n" +
                "Usage: node main.js <number-of-boxes> <morty-file> [morty-class-name]\n" +
                "Example: node main.js 3 ./morties/ClassicMorty.js ClassicMorty"
            );
        }

        const numBoxes = parseInt(args[0]);
        if (isNaN(numBoxes) || numBoxes <= 2) {
            throw new Error("Number of boxes must be an integer greater than 2.");
        }

        const mortyPath = args[1];
        const mortyClassName = args[2] || 'ClassicMorty';

        return { numBoxes, mortyPath, mortyClassName };
    }
}