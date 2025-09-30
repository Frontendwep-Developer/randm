#!/usr/bin/env node

import { GameCore } from './game/GameCore.js';
import { Arguments } from './game/Arguments.js';

async function main() {
    try {
        console.log("=== Rick and Morty Portal Gun Game ===");

        const args = Arguments.parseArguments();
        const game = new GameCore(args.numBoxes, args.mortyPath, args.mortyClassName);
        await game.run();

    } catch (error) {
        console.log(`Error: ${error.message}`);
        console.log("\nUsage: node main.js <num_boxes> <morty_file> [morty_class_name]");
        console.log("Example: node main.js 3 ./morties/ClassicMorty.js ClassicMorty");
        process.exit(1);
    }
}

main();