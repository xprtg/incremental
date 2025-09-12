import { Player } from './player';

export class Game {
  private player: Player;
  private score: number = 0;

  constructor(player: Player) {
    this.player = player;
  }

  public start(): void {
    setInterval(() => {
      this.score += this.player.increment;
      console.log('Score:', this.score);
    }, 1000);
  }
}

export class Player {
  public increment: number;

  constructor(increment: number) {
    this.increment = increment;
  }
}