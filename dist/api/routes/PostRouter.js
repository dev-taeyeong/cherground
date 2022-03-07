"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouterImpl = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const TYPES_1 = require("../../TYPES");
const controller_1 = require("../controller");
let PostRouterImpl = class PostRouterImpl {
    constructor(postController) {
        this.postController = postController;
        this.router = express_1.default.Router();
        this.router.use('/', (req, res) => {
            const { condition, state } = req.body;
            const postDatas = this.postController.getPostList(condition, state);
            res.status(200).json(postDatas);
        });
    }
};
PostRouterImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES_1.TYPES.BannerController)),
    __metadata("design:paramtypes", [typeof (_a = typeof controller_1.PostController !== "undefined" && controller_1.PostController) === "function" ? _a : Object])
], PostRouterImpl);
exports.PostRouterImpl = PostRouterImpl;
