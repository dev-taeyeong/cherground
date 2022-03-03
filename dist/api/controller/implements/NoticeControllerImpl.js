"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeControllerImpl = void 0;
class NoticeControllerImpl {
    constructor(noticeService) {
        this.noticeService = noticeService;
    }
    makeNotice(noticeData) {
        this.noticeService.makeNotice(noticeData);
    }
    readAllNotices() {
        this.noticeService.readAllNotices();
    }
    readNoticeDetail(id) {
        this.noticeService.readNoticeDetail(id);
    }
    updateNotice(id, noticeData) {
        this.noticeService.updateNotice(id, noticeData);
    }
    deleteNotice(id) {
        this.noticeService.deleteNotice(id);
    }
}
exports.NoticeControllerImpl = NoticeControllerImpl;
