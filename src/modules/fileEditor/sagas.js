import {all, put, takeEvery} from "redux-saga/effects";
import { SELECT } from "../fileManager/actions";

function* select(action){
    console.log("-------------> select: "+JSON.stringify(action))
    yield put({type: 'SELECTED', somePayload: 123})
}

function* watchRename() {
    yield takeEvery(SELECT, select)
}

export default function* rootSaga() {
    yield all([
        watchRename()
    ])
}
