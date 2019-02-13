import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootSaga from "./modules/projectIDE/sagas";
import projectIDEReducer from "./modules/projectIDE/reducers";
import userReducer from "./modules/user/reducers";
import userSaga from "./modules/user/sagas";


const rootReducer = combineReducers({project: projectIDEReducer, user: userReducer});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(userSaga);

export default store;
