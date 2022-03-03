"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRouterImpl = void 0;
const express_1 = __importDefault(require("express"));
class NoticeRouterImpl {
    constructor(noticeController) {
        this.noticeController = noticeController;
        this.router = express_1.default.Router();
        this.router.post('/', (req, res) => {
            const noticeData = req.body;
            this.noticeController.makeNotice(noticeData);
            return res.status(201).json({ message: 'CREATE_SUCCESS' });
        });
        this.router.get('/', (req, res) => {
            const allNotices = this.noticeController.readAllNotices();
            return res.status(200).json(allNotices);
        });
        this.router.get('/:id', (req, res) => {
            const { id } = req.params;
            const noticeDetail = this.noticeController.readNoticeDetail(id);
            return res.status(200).json(noticeDetail);
        });
        this.router.put('/:id', (req, res) => {
            const { id } = req.params;
            const noticeData = req.body;
            this.noticeController.updateNotice(id, noticeData);
            return res.status(200).json({ message: 'UPDATE_SUCCESS' });
        });
        this.router.delete('/:id', (req, res) => {
            const { id } = req.params;
            this.noticeController.deleteNotice(id);
            return res.status(200).json({ message: 'DELETE_SUCCESS' });
        });
    }
}
exports.NoticeRouterImpl = NoticeRouterImpl;
