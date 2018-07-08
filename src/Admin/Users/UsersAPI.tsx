import axios from 'axios';
import {loadAllUsers} from "../../Store-Redux/thunks/users";
import {store} from "../../Store-Redux/store";

export class UsersAPI {
    static async createUser(name, password, age) {
        return axios.post('http://localhost:4000/users/', {name, password, age})
    }

    static async fetchAllUsers() {
        store.dispatch(loadAllUsers());
    }
    
    static async removeUser(id) {
        return axios.delete('http://localhost:4000/users/', {params: {id}});
    }

    static async updateUser(id, user) {
        return axios.put('http://localhost:4000/users/', user, {params: {id}});
    }
}