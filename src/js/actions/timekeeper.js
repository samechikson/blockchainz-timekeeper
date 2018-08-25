import { TIMEKEEPER_LOAD, TIMEKEEPER_UNLOAD, TIMEKEEPER_ADD_TIME_OPEN, TIMEKEEPER_ADD_TIME_CLOSE } from '../actions';
import { getTime } from '../api/timekeeper';

export function loadTimekeeper() {
  return dispatch => (
    getTime().then(response => (
      response.json().then(data =>
        dispatch({ type: TIMEKEEPER_LOAD, payload: { error: undefined, days: data } })
      )
    ))
  );
}

export function unloadTimekeeper() {
  return { type: TIMEKEEPER_UNLOAD };
}

export function openAddTime() {
  return { type: TIMEKEEPER_ADD_TIME_OPEN };
}

export function closeAddTime(newData) {
  return { type: TIMEKEEPER_ADD_TIME_CLOSE, payload: newData };
}
