import {all, put, takeEvery, select as selectState} from "redux-saga/effects";
//import {RENAME_REQUEST} from "./actions";
//import {clearSelection, rename, select} from "./actions";

/*const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* rename_request(action){

    const { parentId, newName } = action;

    const state = yield selectState();

    let active = state.project.active;

    const originalPath = active.getActivePath();

    if(active.isAffectedByRename(parentId)){
        yield put(clearSelection());
        yield delay(100);
        yield put(rename(parentId, newName));
        yield delay(100);
        yield put(select(active.generateRenamedPath(originalPath, parentId, newName)))
    }else{
        yield put(clearSelection());
        yield delay(100);
        yield put(rename(parentId, newName));
        yield delay(100);
        yield put(select(originalPath))
    }

}

function* watchRename() {
    yield takeEvery(RENAME_REQUEST, rename_request)
}*/

export default function* rootSaga() {
    yield all([
        //watchRename()
    ])
}
