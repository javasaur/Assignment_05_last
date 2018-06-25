import DBManager from "./dbmanager";
import UsersService from "../services/users";
import GroupsService from "../services/groups";
import UsersGroupsService from "../services/usersgroups";
import UsersDB from "./usersdb"
import MessagesService from "../services/messages";

(async function() {
    const db = DBManager.getInstance();
    await db.initStores();


    console.log(await MessagesService.getAllDialogueMessages('1_5'));

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



