import {all, put, takeEvery} from "redux-saga/effects";
import {NEW_FILE, SELECT} from "./actions";
import {createFile,selectFile} from "./actions";

function* select(action){
    //const { parentId } = action;

    //yield put(selectFile(parentId))
}

function* newFile(action){
    //const { parentId, newName } = action;

    //yield put(createFile(parentId+"/"+newName, "Test content of file "+newName))
}

function* watchSelect() {
    yield takeEvery(SELECT, select)
}

function* watchNewFile() {
    yield takeEvery(NEW_FILE, newFile)
}

export default function* rootSaga() {
    yield all([
        watchSelect(),
        watchNewFile()
    ])
}
