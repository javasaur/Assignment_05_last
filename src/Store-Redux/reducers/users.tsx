import {AppState} from "../appState";

export function setUsers(state: AppState, payload): AppState {
    return {
        ...state,
        users: payload.users
    }
}