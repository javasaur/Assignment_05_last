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
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield services.Messages.addMessageToDialogue('1_5', { authorId: '1', content: 'hello there' });
        }
        catch (err) {
            console.log("========USER SEES THIS============");
            console.log(err.message);
            console.log("==================================");
        }
        // console.log(users);
        // console.log("==================================");
    });
})();
//# sourceMappingURL=test.js.map