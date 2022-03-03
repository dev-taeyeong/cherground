import { MediaLocation } from './MediaLocation';
import { ProductType } from './ProductType';

export interface Post {
  id: number; // 게시물의 고유 번호
  title: string; // 게물의 이름(제목)
  type: 'Banner' | 'Notice';
  productType: ProductType; // 프로덕트 종류 (소매, 도매)
  mediaLocation: MediaLocation; // 매체 위치 (대시보드01, 대시보드02, 주문01, 알림톡01)

  // 소매 (대시보드01, 대시보드02, 주문01)
  // 도매 (대시보드01, 알림톡01)

  startTime: Date; // 게시물이 등록될 시간 (년 월 일 시 분)
  endTime: Date; // 게시물이 종료될 시간 (년 월 일 시 분)
}
