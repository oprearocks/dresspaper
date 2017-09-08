import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import login from './../login/reducers';

const logger = createLogger();

const defaultState = {
    login: {},
};

const rootReducer = combineReducers({ login });

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk, logger));

export default store;
