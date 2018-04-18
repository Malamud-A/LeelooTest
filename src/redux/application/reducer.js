import {cloneDeep} from 'lodash';
import initialState from './initialState';
import * as constants from './constants';

export default (state = initialState, {type, payload}) => {
  const newState = cloneDeep(state);
  switch (type) {
    case constants.UPDATE_COLUMNS:
      newState.cells.columns = payload;
      break;
    case constants.UPDATE_ROWS:
      newState.cells.rows = payload;
      break;
    case constants.UPDATE_VALUE: {
      newState.cells.setValue(newState.selectedCell, payload);
      break;
    }
    case constants.SELECT_CELL:
      newState.selectedCell = payload;
      break;
    default:
      return newState;
  }
  return newState;
};
