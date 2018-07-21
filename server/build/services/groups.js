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
const DAL = require("../lib/dal");
const CustomError_1 = require("../helpers/CustomError");
const db_1 = require("../helpers/db");
const common_1 = require("../helpers/common");
class Groups {
    static addRootGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield DAL.Talks.isNameDuplicateUnderRoot(name)) {
                    throw new CustomError_1.default(`A group with such name already exists`);
                }
                return yield DAL.Talks.addPublicRootTalk(name).execute();
            }
            catch (err) {
                err instanceof CustomError_1.default ? common_1._throw(err) : common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
    static addGroupUnderParent(name, parentID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield DAL.Talks.isNameDuplicateUnderTalk(name, parentID)) {
                    throw new CustomError_1.default(`A group with such name already exists`);
                }
                if (yield DAL.UsersTalks.hasUsers(parentID)) {
                    throw new CustomError_1.default(`Parent group has users, can't add subgroup`);
                }
                return yield DAL.Talks.addPublicSubtalk(name, parentID).execute();
            }
            catch (err) {
                err instanceof CustomError_1.default ? common_1._throw(err) : common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
}
exports.default = Groups;
//# sourceMappingURL=groups.js.map