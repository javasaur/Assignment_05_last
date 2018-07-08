import {SET_USERS, SET_USERS_BY_SELECTOR} from "./actionTypes";

export function setUsers(users) {
    return {
        type: SET_USERS,
        payload: {
            users
        }
    }
}

export function setUsersBySelector(usersBySelector) {
    return {
        type: SET_USERS_BY_SELECTOR,
        payload: {
            usersBySelector
        }
    }
}


