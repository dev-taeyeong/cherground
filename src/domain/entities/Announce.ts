import { AnnounceExposePlace } from './AnnounceExposePlace';
import { AnnounceOption } from './AnnounceOption';
import { Content } from './Content';

export interface Announce extends Content {
  content: string; // 공지의 내용
  announceOption: AnnounceOption; // 공지의 카테고리 id (information, error, warning, success)
  announceExposePlace: AnnounceExposePlace; // 공지 노출 위치 (dashboard, order, both)
  announceExpose: 'entry' | 'click'; // 공지가 노출되는 방법 (0: 진입시 노출, 1: 클릭시 노출)
  isPopupImg: boolean; // 팝업 이미지가 있는지
  popupImgUrl?: string; // 콘텐츠에 표시될 이미지 url
}
