import {EOS_LOGGED_IN, EOS_LOGGED_OUT, EOS_NETWORK_CONECTED} from "./actions";
import {Record} from "immutable";

const UserRecord = Record({
    connected: false,
    loggedIn: false,
    userName: undefined,
    publicKey: undefined
});

const initState = new UserRecord();

const userReducer = (state=initState, action) => {

    switch (action.type) {

        case EOS_NETWORK_CONECTED: {
            return state.set('connected', true);
        }

        case EOS_LOGGED_IN: {

            const { userName, publicKey } = action;

            return state.set('loggedIn', true).set('userName', userName).set("publicKey", publicKey);
        }

        case EOS_LOGGED_OUT: {

            return state.set('loggedIn', false).remove('userName').remove("publicKey");

        }

        default:
            return state
    }
};

export default userReducer
