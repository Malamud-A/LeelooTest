import * as formulaTypes from '../utils/formulaType';

class Formula {
  constructor(formula, value) {
    if (Object.values(formulaTypes).includes(formula)) {
      this.formula = formula;
      this.value = value;
    } else {
      throw new Error("Entered formula is incorrect");
    }
    this._formula = formula;
    this._value = value;
  }


  get formula() {
    return this._formula;
  }

  set formula(value) {
    this._formula = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}
