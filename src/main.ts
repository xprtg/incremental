class IdleGame {
    points: number;

    constructor() {
        this.points = 0;
    }

    incrementPoints(): void {
        setInterval(() => {
            this.points++;
        }, 1000);
    }
}

const game = new IdleGame();

game.incrementPoints();

setTimeout(() => {
    console.log(game.points);
}, 5000);