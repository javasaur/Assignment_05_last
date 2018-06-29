import {setAdminTree, setTree} from "../actions/tree";
import {subscribeToGroups} from "./socket";
import axios from 'axios';

export function getNavTree(userID) {
    return async function(dispatch) {
        try {
            const httpResponse = await fetch('http://localhost:4000/tree', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userID})
            })
            const treeJSON = await httpResponse.json();
            dispatch(setTree(treeJSON));
            dispatch(subscribeToGroups());
        } catch (err) {
            console.log(err);
        }
    }
}
export function getAdminNavTree() {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:4000/tree');
            const treeJSON = response.data;
            dispatch(setAdminTree(treeJSON))
        } catch (err) {
            console.log(err);
        }
    }
}



