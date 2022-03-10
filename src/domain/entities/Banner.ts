import { BannerExposePlace } from './BannerExposePlace';
import { Content } from './Content';

export interface Banner extends Content {
  bannerExposePlace: BannerExposePlace; // 배너 노출 위치 (dashboardTop, dashboardBottom)
  isLink: boolean; // 링크가 있는지
  connectionLink: string; // 링크 url
  bannerImgUrl: string; // 콘텐츠에 표시될 이미지 url
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
