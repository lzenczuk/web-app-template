export const EOS_NETWORK_CONECTED = 'EOS_NETWORK_CONECTED';
export const EOS_LOGIN_REQUEST = 'EOS_LOGIN_REQUEST';
export const EOS_LOGGED_IN = 'EOS_LOGGED_IN';
export const EOS_LOGOUT_REQUEST = 'EOS_LOGOUT_REQUEST';
export const EOS_LOGGED_OUT = 'EOS_LOGGED_OUT';

export const eosNetworkConnected = () => {
    return { type: EOS_NETWORK_CONECTED }
};

export const eosLoginRequest = () => {
    return { type: EOS_LOGIN_REQUEST }
};

export const eosLogedIn = (userName, publicKey) => {
    return { type: EOS_LOGGED_IN, userName: userName, publicKey: publicKey }
};

export const eosLogoutRequest = () => {
    return { type: EOS_LOGOUT_REQUEST }
};
