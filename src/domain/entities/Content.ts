import { Service } from './Service';

export type ContentState = 'live' | 'end' | 'reservation';

export interface Content {
  id: string | null; // 게시물의 고유 번호
  title: string; // 게시물의 이름 (제목)
  service: Service; // 프로덕트 종류 (retail, wholesale)
  startTime: string; // 게시물이 등록될 시간 (밀리초)
  endTime: string; // 게시물이 종료될 시간 (밀리초)
  state?: ContentState; // 배너의 현재 상태 (live, end, reservation)
}
