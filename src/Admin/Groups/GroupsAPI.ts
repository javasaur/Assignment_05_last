import axios from 'axios';
import {store} from "../../Store-Redux/store";
import {loadUsersForCurrentGroup} from "../../Store-Redux/thunks/users";

export class GroupsAPI {
    static async addRootGroup(name) {
        return axios.post('http://localhost:4000/groups', {name, parent: 'root'});
    }

    static async addUserToGroup(userID) {
        const groupID = store.getState().adminCurrentGroupID;
        return axios.post('http://localhost:4000/groups/adduser', {userID, groupID})
    }

    static async addSubgroup(name, parentID) {
        return axios.post('http://localhost:4000/groups', {name, parent: parentID});
    }

    static async fetchUsersByAdminGroup() {
        store.dispatch(loadUsersForCurrentGroup());
    }

    static async removeUserFromAdminGroup(userID) {
        const groupID = store.getState().adminCurrentGroupID;
        return axios.delete('http://localhost:4000/users', {params: {id: userID, group: groupID}})
    }
}