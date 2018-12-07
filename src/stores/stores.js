import { createStore } from 'redux';
import fileManager from "../reducers/reducers"

const store = createStore(fileManager);

export default store;
