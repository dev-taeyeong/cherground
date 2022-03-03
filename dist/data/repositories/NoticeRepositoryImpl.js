"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRepoitoryImpl = void 0;
class NoticeRepoitoryImpl {
    constructor(noticeDao) {
        this.noticeDao = noticeDao;
    }
    createNotice(noticeData) {
        this.noticeDao.createNotice(noticeData);
    }
}
exports.NoticeRepoitoryImpl = NoticeRepoitoryImpl;
