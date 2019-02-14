import {all, put, takeEvery, select as selectState} from "redux-saga/effects";
import {
    EOS_LOGIN_REQUEST,
    EOS_LOGOUT_REQUEST,
    eosLogedIn,
    eosLogedOut,
    eosNetworkConnected,
} from "./actions";
import {connectToMainEosNetwork, logoutEosAccount} from "./api";
import {loginEosAccount} from "./api";

function* eosLogIn() {

    const state = yield selectState();
    const user = state.user;

    if (!user.loggedIn) {

        if (!user.connected) {

            const connected = yield connectToMainEosNetwork();

            if (connected === true) {
                yield put(eosNetworkConnected())
            } else {
                // TODO - error message?
                return
            }
        }

        const identity = yield loginEosAccount();

        if (identity !== undefined && identity.accounts !== undefined && identity.accounts.length !== 0) {
            yield put(eosLogedIn(identity.accounts[0].name, identity.accounts[0].publicKey))
        }
    }
}

function* eosLogOut() {
    const state = yield selectState();
    const user = state.user;

    if (user.loggedIn) {
        yield logoutEosAccount();
        yield put(eosLogedOut())
    }
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
