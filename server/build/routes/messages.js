"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require("../controllers/");
const router = express.Router();
router.post('/', express.json(), controllers.Messages.getAllDialogueMessages);
exports.default = router;
//# sourceMappingURL=messages.js.map