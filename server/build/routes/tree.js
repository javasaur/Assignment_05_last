"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require("../controllers/");
const router = express.Router();
router.post('/', express.json(), controllers.Tree.buildJSONTree);
exports.default = router;
//# sourceMappingURL=tree.js.map