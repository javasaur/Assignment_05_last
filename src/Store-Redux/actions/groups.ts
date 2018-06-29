import {SET_ADMIN_CURRENT_GROUP_ID} from "./actionTypes";

export function setAdminCurrentGroupID(adminCurrentGroupID) {
    return {
        type: SET_ADMIN_CURRENT_GROUP_ID,
        payload: {adminCurrentGroupID}
    }
}