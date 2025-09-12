class Currency {
  private _amount: number;
  private _rate: number;
  constructor(rate: number) {
    this._amount = 0;
    this._rate = rate;
  }
  earn(): void {
    this._amount += this._rate;
  }
  spend(amount: number): boolean {
    if(this._amount >= amount) {
      this._amount -= amount;
      return true;
    } else {
      return false;
    }
  }
  get amount(): number {
    return this._amount;
  }
}