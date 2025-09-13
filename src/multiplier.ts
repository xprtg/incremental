export class Multiplier {
 private multiplier: number;
 constructor() { this.multiplier = 1; }
 getMultiplier(): number { return this.multiplier; }
 updateMultiplier(value: number): void { this.multiplier *= value; }}