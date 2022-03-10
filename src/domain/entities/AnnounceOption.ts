export interface AnnounceOption {
  id: number; // 공지 카테고리 고유 번호
  name: 'information' | 'error' | 'warning' | 'success'; // 공지의 카테고리 이름(정보, 에러, 경고, 성공)
}
