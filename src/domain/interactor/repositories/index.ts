import { Banner } from '../../entities/Banner';
import { MediaLocation } from '../../entities/MediaLocation';
import { OverlapBannerSchedule } from '../../entities/OverlapBannerSchedule';
import { ProductType } from '../../entities/ProductType';

export interface NoticeRepository {
  getNoticeByTypeAndTime(
    type: string,
    startTime: Date,
    endTime: Date
  ): Promise<boolean>;
}

export interface BannerRepository {
  getOverlapBannerSchedules(
    productType: ProductType,
    mediaLocation: MediaLocation,
    startTime: Date,
    endTime: Date
  ): any;

  getBannerById(id: number): Promise<Banner>;
}
