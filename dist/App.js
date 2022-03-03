"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const inversify_config_1 = require("./inversify.config");
const TYPES_1 = require("./TYPES");
class App {
    constructor() {
        dotenv_1.default.config();
        this.routes = inversify_config_1.container.get(TYPES_1.TYPES.Routes);
        this.PORT = process.env.PORT;
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(this.routes.router);
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`server started on PORT ${this.PORT}`);
        });
    }
}
exports.default = App;
