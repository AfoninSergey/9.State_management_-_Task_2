import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { tasksReducer, interactionReducer } from './reducers';

const reducer = combineReducers({
	tasksState: tasksReducer,
	interactionState: interactionReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
