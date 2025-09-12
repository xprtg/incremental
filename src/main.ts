class Upgrade {
  constructor(public name: string, public cost: number, public multiplier: number) {}

  applyUpgrade(resourceGenerator: ResourceGenerator) {
    if (resourceGenerator.resource >= this.cost) {
      resourceGenerator.resource -= this.cost;
      resourceGenerator.multiplier *= this.multiplier;
    }
  }
}