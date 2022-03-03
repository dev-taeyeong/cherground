import { Banner } from './Banner';
import { MediaLocation } from './MediaLocation';

export interface OverlapBannerSchedule {
  overlapBanners: {
    banner: Banner; // 배너
    exposureOrdinal: number; // 배너 캐러셀에서 배너가 노출되는 순서 (1, 2, 3, 4, 5)
  }[];
  mediaLocation: MediaLocation; // 매체 위치 (대시보드01, 대시보드02, 주문01, 알림톡01)
  exposurePeriod: number; // 배너 캐러셀에서 배너가 노출되는 시간 (4, 5, 6), Nullable (중복되는 배너가 없을 경우)
  scheduleStartTime: Date; // 겹치는 배너 일정 묶음의 시작 시간
  scheduleEndTime: Date; // 겹치는 배너 일정 묶음의 종료 시간
}
