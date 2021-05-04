import { combineReducers } from 'redux';
import ApplicationReducer from './ApplicationReducer';
import UserReducer from './UserReducer';
import { USER_LOGGED_OUT } from '../actions/UserActions';

const AppReducer = combineReducers({
  application: ApplicationReducer,
  user: UserReducer,
});

const RootReducer = (state, action) => {
  // Clear all data
  if (action.type === USER_LOGGED_OUT) {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default RootReducer;
