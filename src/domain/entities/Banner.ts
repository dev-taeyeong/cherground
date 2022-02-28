import { Post } from './Post';

export interface Banner extends Post {
  linkUrl: string; // 배너를 클릭했을 때 이동할 url, Nullable(링크가 없을 경우 Null)
  imageUrl: string; // 콘텐츠에 표시될 이미지 url
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
