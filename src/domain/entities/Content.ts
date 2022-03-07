export type Service = 'retail' | 'wholesale';

export type ContentType = 'Announce' | 'Banner';

export interface Content {
  id: string | null; // 게시물의 고유 번호
  title: string; // 게시물의 이름 (제목)
  contentType: ContentType; // 게시물 타입 (Announce, Banner)
  service: Service; // 프로덕트 종류 (retail, wholesale)
  startTime: Date; // 게시물이 등록될 시간 (밀리초)
  endTime: Date; // 게시물이 종료될 시간 (밀리초)
}
