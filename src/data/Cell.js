import Coordinate from './Coordinate';

class Cell {
  constructor(coordinate, value = '') {
    if (coordinate instanceof Coordinate) {
      this._coordinate = coordinate;
      this.id = this._buildCellId(this._coordinate.row, this._coordinate.column);
      this._value = value;
    }
    this._value = value;
  }

  get coordinate() {
    return this._coordinate;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  _alphabeticIndexes = new Array(26).fill(null).map((el, key) => {
    return String.fromCharCode('A'.charCodeAt(0) + key);
  });

  _buildCellId(row, column) {
    return `${this._alphabeticIndexes[column]}${row}`;
  }
}

export default Cell;