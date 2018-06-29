"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbmanager_1 = require("./dbmanager");
const usersgroups_1 = require("../services/usersgroups");
// import {Group} from "../../src/Store/Group";
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbmanager_1.default.getInstance();
        yield db.initStores();
        // const res = await GroupsService.addGroupUnderParent('testing', "6");
        // console.log(res);
        yield usersgroups_1.default.addUserToGroup("2", "1530294489230");
        // const publicGroups = await GroupsService.getPublicGroups();
        // const privateGroups = await UsersGroupsService.getPrivateGroups(1);
        // const g1 = await GroupsService.getGroupsByIDs(['5']);
        // g1['items'] = ['blabla'];
        // const g2 = await GroupsService.getGroupsByIDs(['5']);
        // console.log(g1);
        // console.log(g2);
        // console.log(g1===g2);
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
    });
})();
//# sourceMappingURL=test.js.map