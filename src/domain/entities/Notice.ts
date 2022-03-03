import { NoticeCategory } from './NoticeCategory';
import { Post } from './Post';

export interface Notice extends Post {
  description: string; // 공지의 내용
  noticeCategory: NoticeCategory; // 공지의 카테고리 id (정보, 에러, 경고, 성공)
  exposureMethod?: boolean; // 공지가 노출되는 방법 (0: 진입시 노출, 1: 클릭시 노출)
  imageUrl?: string; // 콘텐츠에 표시될 이미지 url
}
