import DBManager from "./dbmanager";
import UsersService from "../services/users";
import GroupsService from "../services/groups";
import UsersGroupsService from "../services/usersgroups";
import UsersDB from "./usersdb"
import MessagesService from "../services/messages";
// import {Group} from "../../src/Store/Group";

(async function() {
    const db = DBManager.getInstance();
    await db.initStores();

    // const publicGroups = await GroupsService.getPublicGroups();
    // const privateGroups = await UsersGroupsService.getPrivateGroups(1);
    const g1 = await GroupsService.getGroupsByIDs(['5']);
    g1['items'] = ['blabla'];
    const g2 = await GroupsService.getGroupsByIDs(['5']);
    console.log(g1);
    console.log(g2);
    console.log(g1===g2);
    // console.log(privateGroups);
    // if(publicGroups) {
    //     console.log(publicGroups.concat(privateGroups));
    // }



    // console.log(await MessagesService.getAllDialogueMessages('1_5'));

    // console.log(await GroupsService.getSecondCompanionID('1_5', '1'));

    // const tree = await UsersGroupsService.buildJSONTree(1);
    // console.log(JSON.stringify(tree));

    // console.log(await UsersService.getUserByID('1'));

    // console.log(await GroupsService.getGroupsByIDs(['1', '1_5']));
    // console.log(await GroupsService.getGroupsByIDs(['1', '1_5']));
    // console.log(await GroupsService.getGroupsByIDs(['1', '1_5']));
    // console.log(await GroupsService.getGroupsByIDs(['1', '1_5']));
    // console.log(await GroupsService.getGroupsByIDs(['1', '1_5']));

})();



