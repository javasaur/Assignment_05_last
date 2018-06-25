import {AppState} from "../appState";

export function setSocket(state: AppState, payload): AppState {
    return {
        ...state,
        socket: payload.socket,
    }
}