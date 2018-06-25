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
const messages_1 = require("../services/messages");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbmanager_1.default.getInstance();
        yield db.initStores();
        console.log(yield messages_1.default.getAllDialogueMessages('1_5'));
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