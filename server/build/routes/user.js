"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const usercontroller_1 = require("../controllers/usercontroller");
const router = express.Router();
const userController = new usercontroller_1.default();
// GET user
router.get('/', (req, res) => {
    return userController.getAllUsers(req, res);
});
// GET user
router.get('/:id', (req, res) => {
    return userController.getUser(req, res);
});
// POST user
router.post('/', (req, res) => {
    return userController.addUser(req, res);
});
// PUT user
router.put('/', (req, res) => {
    return userController.updateUser(req, res);
});
// DELETE user
router.delete('/', (req, res) => {
    return userController.removeUser(req, res);
});
exports.default = router;
//# sourceMappingURL=user.js.map