import { Banner, BannerExposePlace } from './Banner';

export type Ordinal = 'first' | 'second' | 'third' | 'fourth' | 'fifth';

export type ExposeInterval = '4sec' | '5sec' | '6sec';

export interface DuplicateSchedule {
  id: string | null;
  overlapBanners: {
    banner: Banner; // 배너
    ordinal: Ordinal; // 배너 캐러셀에서 배너가 노출되는 순서
  }[];
  bannerExposePlace: BannerExposePlace; // 배너 노출 위치 (dashboardTop, dashboardBottom)
  exposeInterval: ExposeInterval; // 배너 캐러셀에서 배너가 변경되는 시간 간격 (nullable)
  scheduleStartTime: string; // 겹치는 배너 일정 묶음의 시작 시간 (밀리초)
  scheduleEndTime: string; // 겹치는 배너 일정 묶음의 종료 시간 (밀리초)
}
