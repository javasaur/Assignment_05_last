"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
app.use(cors()).use(helmet());
exports.default = app;
//# sourceMappingURL=defaults.js.map