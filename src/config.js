import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'

import fileManager from "./modules/fileManager/reducers"
import rootSaga from "./modules/fileEditor/sagas";
import fileEditor from "./modules/fileEditor/reducers";


const rootReducer = combineReducers({fileManager: fileManager, fileEditor: fileEditor});

const sagaMiddleware = createSagaMiddleware(rootSaga);

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
