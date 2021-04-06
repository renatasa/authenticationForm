import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { combineReducers } from 'redux';
import authReducer from '../../store/reducers/auth';
import todoReducer from '../../../Todos/store/reducers/reducer';

const rootReducer= combineReducers({
  authReducer,
  todoReducer
});

export const middlewares = [ReduxThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(rootReducer);