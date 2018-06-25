import {SET_NAV_TREE} from "./actionTypes";

export function setTree(navTree) {
    return {
        type: SET_NAV_TREE,
        payload: {
            navTree
        }
    }
}