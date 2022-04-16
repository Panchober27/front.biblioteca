import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import * as reducers from '@/redux/reducers/index';
import * as reducers from '../../redux/reducers/index';

const reducer = combineReducers({ ...reducers });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
