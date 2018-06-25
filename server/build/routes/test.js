"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Test route is working with nodemon and tsc -watch');
});
exports.default = router;
//# sourceMappingURL=test.js.map