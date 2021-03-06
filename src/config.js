import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootSaga from "./modules/projectIDE/sagas";
import projectIDEReducer from "./modules/projectIDE/reducers";


const rootReducer = combineReducers({project: projectIDEReducer});

const sagaMiddleware = createSagaMiddleware(rootSaga);

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
