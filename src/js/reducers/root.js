import { combineReducers } from 'redux';

import dashboard from './dashboard';
import nav from './nav';
import session from './session';
import tasks from './tasks';
import timekeeper from './timekeeper';

export default combineReducers({
  dashboard,
  nav,
  session,
  tasks,
  timekeeper
});
