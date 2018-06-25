import {setTree} from "../actions/tree";

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
        } catch (err) {
            console.log(err);
        }
    }
}
