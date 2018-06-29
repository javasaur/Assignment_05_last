import axios from 'axios';

export class UsersAPI {
    static async createUser(name, password, age) {
        return axios.post('http://localhost:4000/users/', {name, password, age})
    }

    static async fetchAllUsers() {
        return axios.get('http://localhost:4000/users/');
    }

    static async removeUser(id) {
        return axios.delete('http://localhost:4000/users/', {params: {id}});
    }

    static async updateUser(id, user) {
        return axios.put('http://localhost:4000/users/', user, {params: {id}});
    }
}