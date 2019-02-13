import {all, put, takeEvery, select as selectState} from "redux-saga/effects";
import {EOS_LOGIN_REQUEST, EOS_LOGOUT_REQUEST, eosLogedIn, eosNetworkConnected, SEND_PROJECT} from "./actions";
import {} from "./api";
import ScatterJS from "scatterjs-core";
import {connectToMainEosNetwork} from "./api";
import {loginEosAccount} from "./api";
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

/*function* send_project_to_server(action){
    console.log("---------> send project saga")

    const state = yield selectState();

    sendProjectToServer(state.project)
}*/

function* eosLogIn() {

    console.log("-----------> function* eosLogIn()");

    const state = yield selectState();

    console.log("-----------> function* eosLogIn() state: " + JSON.stringify(state.user.toJS()));

    const user = state.user;

    if (!user.loggedIn) {

        console.log("-----------> function* eosLogIn() not logged in");

        if (!user.connected) {

            console.log("-----------> function* eosLogIn() not connected");

            const connected = yield connectToMainEosNetwork();

            console.log("-------> Saga connected: " + connected);

            if (connected === true) {
                console.log("-------> Saga connected. Send message to reducer ");
                yield put(eosNetworkConnected())
            } else {
                console.log("-------> Saga not connected? Return.");
                // TODO - error message?
                return
            }
        }

        console.log("-------> Saga identity request");

        const identity = yield loginEosAccount();

        console.log("-------> Saga identity: " + JSON.stringify(identity));

        if (identity !== undefined && identity.accounts !== undefined && identity.accounts.length !== 0) {

            yield put(eosLogedIn(identity.accounts[0].name, identity.accounts[0].publicKey))

        } else {
            console.log("-------> Saga identity missing account! ");
        }

    } else {
        console.log("----> User already logged in")
    }
}

function* eosLogOut() {

}

function* watchForEOSLoginRequests() {
    yield takeEvery(EOS_LOGIN_REQUEST, eosLogIn)
}

function* watchForEOSLogoutRequests() {
    yield takeEvery(EOS_LOGOUT_REQUEST, eosLogOut)
}

export default function* userSaga() {
    yield all([
        watchForEOSLoginRequests(),
        watchForEOSLogoutRequests()
    ])
}
