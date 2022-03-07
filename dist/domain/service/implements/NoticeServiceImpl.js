"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeServiceImpl = void 0;
class NoticeServiceImpl {
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    validateNoticeOverlap(notice) {
        return this.noticeRepository.getNoticeByTypeAndTime(notice.type, notice.startTime, notice.endTime);
    }
}
exports.NoticeServiceImpl = NoticeServiceImpl;
