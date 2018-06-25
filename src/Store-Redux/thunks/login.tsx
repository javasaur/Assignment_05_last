import {nullLoginError, raiseLoginError, setLoggedUser} from "../actions/login";
import {getNavTree} from "./tree";
import {openSocket} from "./socket";

export function checkMatch(username, password) {
    return async function(dispatch) {
        try {
            dispatch(nullLoginError());
            const httpResponse = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})});
            const res = await httpResponse.json();
            if(res.foundMatch) {
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

