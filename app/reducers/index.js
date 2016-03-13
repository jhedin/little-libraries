import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import geo from 'reducers/geo';
import message from 'reducers/message';
import library from 'reducers/library';
import book from 'reducers/book';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  topic,
  message,
  library,
  book,
  geo,
  routing
});
  
export default rootReducer;
