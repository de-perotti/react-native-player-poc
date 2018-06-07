import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducers from './reducers';

export default createStore(
  reducers,
  __DEV__
    ? applyMiddleware(thunkMiddleware, loggerMiddleware)
    : applyMiddleware(thunkMiddleware),
);
