class BonusGenerator {
   private bonusPoints: number;
   constructor() {
     this.bonusPoints = Math.floor(Math.random() * 10) + 1;
   }
   generateBonus(): void {
     setInterval(() => {
       player.addPoints(this.bonusPoints);
     }, 10000);
   }
 }

 const bonusGenerator = new BonusGenerator();
 bonusGenerator.generateBonus();