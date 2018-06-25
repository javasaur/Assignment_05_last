import {initialState} from "../store";
import {AppState} from "../appState";

export function nullLoginError(state: AppState): AppState {
    return {
        ...state,
        loginError: false
    }
}

export function logout(state: AppState): AppState {
    return initialState;
}

export function raiseLoginError(state: AppState): AppState {
    return {
        ...state,
        loginError: true
    }
}

export function setLoggedUser(state: AppState, payload): AppState {
    return {
        ...state,
        loggedUserID: payload.id,
        loggedUserName: payload.name
    }
}