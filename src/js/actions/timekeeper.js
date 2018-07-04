import { TIMEKEEPER_LOAD, TIMEKEEPER_UNLOAD } from '../actions';
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
