import { combineReducers } from 'redux';

import nav from './nav';
import session from './session';
import tasks from './tasks';
import timekeeper from './timekeeper';

export default combineReducers({
  nav,
  session,
  tasks,
  timekeeper
});
