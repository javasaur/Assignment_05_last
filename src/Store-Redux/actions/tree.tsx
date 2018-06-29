import {SET_ADMIN_NAV_TREE, SET_NAV_TREE} from "./actionTypes";

export function setTree(navTree) {
    return {
        type: SET_NAV_TREE,
        payload: {
            navTree
        }
    }
}

export function setAdminTree(adminNavTree) {
    return {
        type: SET_ADMIN_NAV_TREE,
        payload: {
            adminNavTree
        }
    }
}