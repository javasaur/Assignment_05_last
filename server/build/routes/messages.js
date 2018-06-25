"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require("../controllers/");
const router = express.Router();
router.post('/', express.json(), controllers.Messages.getAllDialogueMessages);
router.post('/add', express.json(), controllers.Messages.addMessage);
exports.default = router;
//# sourceMappingURL=messages.js.map