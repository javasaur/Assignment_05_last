import {AppState} from "../appState";

export function setAdminCurrentGroupID(state: AppState, payload): AppState {
    return {
        ...state,
        adminCurrentGroupID: payload.adminCurrentGroupID
    }
}