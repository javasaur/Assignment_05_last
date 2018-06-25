import {LOG_OUT, NULL_LOGIN_ERROR, RAISE_LOGIN_ERROR, SET_LOGGED_USER} from "./actionTypes";

export function nullLoginError() {
    return {
        type: NULL_LOGIN_ERROR,
    }
}

export function logout() {
    return {
        type: LOG_OUT,
    }
}

export function raiseLoginError() {
    return {
        type: RAISE_LOGIN_ERROR,
    }
}

export function setLoggedUser(username, userID) {
    return {
        type: SET_LOGGED_USER,
        payload: {id: userID, name: username}
    }
}