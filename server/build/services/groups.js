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
const talks_1 = require("../lib/dal/talks");
const CustomError_1 = require("../helpers/CustomError");
class Groups {
    static addRootGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield talks_1.default.isNameDuplicateUnderRoot(name)) {
                throw new CustomError_1.default(`A group with such name already exists`);
            }
            return DAL.Talks.addPublicRootTalk(name).execute();
        });
    }
    static addGroupUnderParent(name, parentID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield talks_1.default.isNameDuplicateUnderTalk(name, parentID)) {
                throw new CustomError_1.default(`A group with such name already exists`);
            }
            return DAL.Talks.addPublicSubtalk(name, parentID).execute();
        });
    }
}
exports.default = Groups;
//# sourceMappingURL=groups.js.map