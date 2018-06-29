import {AppState} from "../appState";

export function setNavTree(state: AppState, payload): AppState {
    return {
        ...state,
        navTree: payload.navTree
    }
}

export function setAdminNavTree(state: AppState, payload): AppState {
    return {
        ...state,
        adminNavTree: payload.adminNavTree
    }
}