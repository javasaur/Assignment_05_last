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
const services = require("../services");
class Tree {
    static buildJSONTree(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.UsersGroups.buildJSONTree(req.body.userID)
                .then((tree) => res.status(200).json(tree))
                .catch((error) => {
                console.log(error);
                res.status(400).send(error.message);
            });
        });
    }
    static buildAdminJSONTree(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.UsersGroups.buildAdminJSONTree()
                .then((tree) => res.status(200).json(tree))
                .catch((error) => res.status(400).send(error.message));
        });
    }
}
exports.default = Tree;
//# sourceMappingURL=tree.js.map