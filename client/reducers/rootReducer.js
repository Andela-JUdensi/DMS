import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import documents from './documents.reducer';
// import search from './search.reducer';
import user from './user.reducer';
import allUsers from './allUsers.reducer';


export default combineReducers({
  authentication,
  documents,
  // search,
  user,
  allUsers
});
