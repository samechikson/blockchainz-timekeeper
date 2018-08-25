import { TIMEKEEPER_LOAD, TIMEKEEPER_UNLOAD, TIMEKEEPER_ADD_TIME_OPEN, TIMEKEEPER_ADD_TIME_CLOSE } from '../actions';
import { createReducer } from './utils';

const initialState = {
  days: [],
  showAddModal: false
};

const handlers = {
  [TIMEKEEPER_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload, showAddModal: false };
  },
  [TIMEKEEPER_UNLOAD]: () => initialState,
  [TIMEKEEPER_ADD_TIME_OPEN]: () => ({ showAddModal: true }),
  [TIMEKEEPER_ADD_TIME_CLOSE]: (state, action) => ({ showAddModal: false, newData: action.payload }),
};

export default createReducer(initialState, handlers);
