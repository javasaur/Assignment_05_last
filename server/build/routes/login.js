"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require("../controllers/");
const router = express.Router();
router.post('/', express.json(), controllers.Login.checkMatch);
exports.default = router;
//# sourceMappingURL=login.js.map