import { combineReducers } from 'redux';
import videos from './videos';
import selected from './selected';

export default combineReducers({
  selected,
  videos,
});
