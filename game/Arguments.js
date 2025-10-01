export class Arguments {
    static parseArguments() {
        const args = process.argv.slice(2);

        if (args.length < 2) {
            throw new Error("Not enough arguments provided.");
        }

        const numBoxes = parseInt(args[0]);
        if (isNaN(numBoxes) || numBoxes <= 2) {
            throw new Error("Number of boxes must be an integer greater than 2.");
        }

        const mortyPath = args[1];
        const mortyClassName = args[2] || 'default';

        return {
            numBoxes,
            mortyPath,
            mortyClassName
        };
    }
}