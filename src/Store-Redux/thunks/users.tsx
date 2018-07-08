import axios from 'axios';
import {setUsers} from "../actions/users";

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



