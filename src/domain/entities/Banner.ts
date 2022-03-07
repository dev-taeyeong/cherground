import { Content } from './Content';

export type BannerExposePlace = 'dashboardTop' | 'dashboardBottom';
export type BannerState = 'live' | 'end' | 'reservation';

export interface Banner extends Content {
  bannerExposePlace: BannerExposePlace; // 배너 노출 위치 (dashboardTop, dashboardBottom)
  isLink: boolean; // 링크가 있는지
  connectionLink: string | null; // 링크 url
  imageUrl: string; // 콘텐츠에 표시될 이미지 url
  state?: BannerState; // 배너의 현재 상태 (live, end, reservation)
}

//
//
//
//
//
//
//
//
//
//
//
//

// export interface BannerCreationFormRequestModel {
//   title: string;
//   subLocationId: number;
//   imageUrl: string;
//   linkUrl: string;
//   exposureTime: number;
//   startTime: Date;
//   endTime: Date;
// }
