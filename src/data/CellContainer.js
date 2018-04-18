import Cell from './Cell';
import Coordinate from './Coordinate';

class CellContainer {

  constructor() {
    this._rows = 0;
    this._columns = 0;
    this._cells = {};
  }

  _alphabeticIndexes = new Array(26).fill(null).map((el, key) => {
    return String.fromCharCode('A'.charCodeAt(0) + key);
  });

  get columns() {
    return this._columns;
  }

  set columns(value) {
    if (value !== this._columns) {
      this._updateCellsByColumn(value);
    }
    this._columns = value;
  }

  get rows() {
    return this._rows;
  }

  set rows(value) {
    if (value !== this._rows) {
      this._updateCellsByRow(value);
    }
    this._rows = value;
  }

  get cells() {
    return this._cells;
  }

  _updateCellsByColumn(newColumn) {
    if (this.rows === 0) {
      return;
    }
    let workColumn = newColumn;
    while (workColumn < this.columns) {
      Object.keys(this._cells).filter((el) => {
        return el[0] === this._alphabeticIndexes[workColumn];
      }).forEach((el) => {
        delete this._cells[el];
      });
      workColumn += 1;
    }
    workColumn = newColumn;
    while (workColumn > this.columns) {
      workColumn -= 1;
      new Array(this.rows).fill(null).map((_, key) => {
        return new Cell(new Coordinate(key, workColumn));
      }).forEach((el) => {
        this._cells[this._buildCellId(el.coordinate.row, el.coordinate.column)] = el;
      });
    }
  }

  _updateCellsByRow(newRow) {
    if (this.columns === 0) {
      return;
    }
    let workRow = newRow;
    while (workRow < this.rows) {
      Object.keys(this._cells).filter((el) => {
        return parseInt(el.substr(1), 10) === workRow;
      }).forEach((el) => {
        delete this._cells[el];
      });
      workRow += 1;
    }
    workRow = newRow;
    while (workRow > this.rows) {
      workRow -= 1;
      new Array(this.columns).fill(null).map((_, key) => {
        return new Cell(new Coordinate(workRow, key));
      }).forEach((el) => {
        this._cells[this._buildCellId(el.coordinate.row, el.coordinate.column)] = el;
      });
    }
  }

  _buildCellId(row, column) {
    return `${this._alphabeticIndexes[column]}${row}`;
  }

  setValue(cell, value) {
    this._cells[cell].value = value;
  }

  getRows() {
    if (this.rows === 0 || this.columns === 0) {
      return [];
    }
    return new Array(this._rows).fill(null).map((_, key) => {
      return Object.keys(this._cells).filter((el) => {
        return parseInt(el.substr(1), 10) === key;
      }).sort((a, b) => {
        if (a[0] > b[0] ||
          (a[0] === b[0] && parseInt(a.substr(1), 10) > parseInt(b.substr(1), 10))) {
          return -1;
        }
        if (a[0] < b[0] ||
          (a[0] === b[0] && parseInt(a.substr(1), 10) < parseInt(b.substr(1), 10))) {
          return 1;
        }
        return 0;
      }).reverse().map((el) => {
        return this._cells[el];
      });
    });
  }

  getValue(cell) {
    if (!cell) {
      return null;
    }
    return this._cells[cell].value;
  }
}

export default CellContainer;
