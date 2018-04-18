import * as constants from './constants';

export function updateRows(rows) {
  return { type: constants.UPDATE_ROWS, payload: rows };
}

export function updateColumns(columns) {
  return { type: constants.UPDATE_COLUMNS, payload: columns };
}

export function updateValue(value) {
  return { type: constants.UPDATE_VALUE, payload: value };
}

export function selectCell(index) {
  return { type: constants.SELECT_CELL, payload: index };
}
