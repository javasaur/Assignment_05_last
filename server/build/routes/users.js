"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require("../controllers/");
const router = express.Router();
router.get('/', express.json(), controllers.Users.getAllUsers);
router.get('/:id', controllers.Users.getUser);
router.post('/', express.json(), controllers.Users.addUser);
router.put('/', express.json(), controllers.Users.updateUser);
router.delete('/', controllers.Users.removeUser);
exports.default = router;
//# sourceMappingURL=users.js.map