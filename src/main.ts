class Upgrade {
  constructor(public cost: number, public effect: number) {}
}

class Game {
  money = 0;
  upgrades: Upgrade[] = [];
  applyUpgrade(upgrade: Upgrade) {
    if (this.money >= upgrade.cost) {
      this.money -= upgrade.cost;
      this.upgrades.push(upgrade);
    }
  }
}

// Usage
const game = new Game();
const upgrade = new Upgrade(100, 1.2);
game.applyUpgrade(upgrade);