import {combineReducers, createStore} from 'redux';
import fileManager from "./modules/fileManager/reducers"

const rootReducer = combineReducers({fileManager: fileManager});

const store = createStore(rootReducer);

export default store;
