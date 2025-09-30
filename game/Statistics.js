import Table from 'cli-table3';

export class GameStatistics {
    constructor() {
        this.rounds = {
            switched: 0,
            stayed: 0
        };
        this.wins = {
            switched: 0,
            stayed: 0
        };
        this.totalGames = 0;
    }

    recordGame(didSwitch, didWin) {
        this.totalGames++;

        if (didSwitch) {
            this.rounds.switched++;
            if (didWin) this.wins.switched++;
        } else {
            this.rounds.stayed++;
            if (didWin) this.wins.stayed++;
        }
    }

    getWinProbability(didSwitch) {
        const rounds = didSwitch ? this.rounds.switched : this.rounds.stayed;
        const wins = didSwitch ? this.wins.switched : this.wins.stayed;

        if (rounds === 0) return 0;
        return wins / rounds;
    }

    displayStatistics(theoreticalProbabilities) {
        const table = new Table({
            head: ['Game Results', 'Rick Switched', 'Rick Stayed'],
            style: { head: ['cyan'] }
        });

        table.push(
            ['Rounds', this.rounds.switched, this.rounds.stayed],
            ['Wins', this.wins.switched, this.wins.stayed],
            [
                'P (experimental)',
                this.rounds.switched > 0 ? this.getWinProbability(true).toFixed(3) : '?',
                this.rounds.stayed > 0 ? this.getWinProbability(false).toFixed(3) : '?'
            ],
            [
                'P (theoretical)',
                theoreticalProbabilities.switched.toFixed(3),
                theoreticalProbabilities.stayed.toFixed(3)
            ]
        );

        console.log('\nGAME STATISTICS');
        console.log(table.toString());
    }
}