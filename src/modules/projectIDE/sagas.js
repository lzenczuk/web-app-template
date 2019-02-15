import {all, put, takeEvery, select as selectState} from "redux-saga/effects";
import {SEND_PROJECT} from "./actions";
import {sendProjectToServer} from "./api";
import {logoutEosAccount} from "../user/api";
import {eosLogedOut} from "../user/actions";
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

function* send_project_to_server(action){
    console.log("---------> send project saga")

    const state = yield selectState();
    const project = state.project;
    const user = state.user;

    if (user.loggedIn) {
        sendProjectToServer(project, user.publicKey)
    }
}

function* watchSendProject() {
    yield takeEvery(SEND_PROJECT, send_project_to_server)
}

export default function* rootSaga() {
    yield all([
        watchSendProject()
    ])
}
