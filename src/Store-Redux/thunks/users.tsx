import axios from 'axios';
import {setUsers, setUsersBySelector} from "../actions/users";
import {store} from "../store";

export function loadAllUsers() {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:4000/users');
            const users = response.data;
            dispatch(setUsers(users))
            return users;
        } catch (err) {
            throw new Error(`Failed to fetch all users`);
        }
    }
}

export function loadUsersForCurrentGroup() {
    return async function(dispatch) {
        try {
            const groupID = store.getState().adminCurrentGroupID;
            const response = await axios.get('http://localhost:4000/users', {params: {group: groupID}});
            const users = response.data;
            console.log(users);
            dispatch(setUsersBySelector(users))
            return users;
        } catch (err) {
            throw new Error(`Failed to fetch all users`);
        }
    }
}



