import {nullLoginError, raiseLoginError, setLoggedUser} from "../actions/login";
import {getNavTree} from "./tree";
import {openSocket} from "./socket";
import axios from 'axios';

export function checkMatch(username, password) {
    return async function(dispatch) {
        try {
            dispatch(nullLoginError());
            const response = await axios.post('http://localhost:4000/login', {username, password});
            const res = response.data;
            if(res.accessAllowed) {
                dispatch(setLoggedUser(username, res.id));
                dispatch(openSocket());
                dispatch(getNavTree(res.id));
                return;
            }
            dispatch(raiseLoginError());
        } catch (err) {
            dispatch(raiseLoginError());
        }
    }
}

