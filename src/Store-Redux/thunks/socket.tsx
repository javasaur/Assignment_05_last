import {SocketAPI} from "../../Socket/Api";
import {setSocket} from "../actions/socket";
import {store} from "../store";
// import {store} from "../store";

export function openSocket() {
    return async function(dispatch) {
        try {
            const socket = SocketAPI.initSocket();
            dispatch(setSocket(socket));
        } catch (err) {

        }
    }
}

export function subscribeToGroups() {
    return function(dispatch) {
        try {
            const uniqueGroupIDs = getUniqueGroupIDs(flatten(store.getState().navTree));
            SocketAPI.subscribeToDialogues(uniqueGroupIDs);
        } catch (err) {

        }
    }
}

function flatten(obj) {
    const array = Array.isArray(obj) ? obj : [obj];
    return array.reduce(function(acc, value) {
        if(!!value) {
            acc.push(value.id);
            if(value.items) {
                acc = acc.concat(flatten(value.items));
            }
        }
        return acc;
    }, []);
}

function getUniqueGroupIDs(arr) {
    return Array.from(new Set(arr));
}


