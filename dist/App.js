"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.PORT = process.env.PORT;
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`server started on PORT ${this.PORT}`);
        });
    }
}
exports.default = App;
