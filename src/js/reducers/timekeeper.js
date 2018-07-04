import { TIMEKEEPER_LOAD, TIMEKEEPER_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  days: []
};

const handlers = {
  [TIMEKEEPER_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [TIMEKEEPER_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
