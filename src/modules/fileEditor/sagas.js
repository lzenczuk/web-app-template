import {all, takeEvery} from "redux-saga/effects";
import {RENAME} from "../fileManager/actions";

function* rename(action){
    console.log("-------------> rename: "+JSON.stringify(action))
    yield put({type: 'SELECTED', somePayload: 123})
}

function* watchRename() {
    yield takeEvery(RENAME, rename)
}

export default function* rootSaga() {
    yield all([
        watchRename()
    ])
}
