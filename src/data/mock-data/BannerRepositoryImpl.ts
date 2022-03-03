import { injectable } from 'inversify';
import lodash from 'lodash';
import { Banner } from '../../domain/entities/Banner';
import { MediaLocation } from '../../domain/entities/MediaLocation';
import { OverlapBannerSchedule } from '../../domain/entities/OverlapBannerSchedule';
import { ProductType } from '../../domain/entities/ProductType';
import { BannerRepository } from '../../domain/interactor/repositories';
import data from './Data';

@injectable()
export class BannerRepositoryImpl implements BannerRepository {
  getOverlapBannerSchedules(
    productType: ProductType,
    mediaLocation: MediaLocation,
    startTime: Date,
    endTime: Date
  ): any {
    const overlapBannerSchedules: OverlapBannerSchedule[] = [];
    data.overlapBannerSchedule.forEach((data) => {
      if (
        data.scheduleStartTime.getTime() < new Date(endTime).getTime() &&
        data.scheduleEndTime.getTime() > new Date(startTime).getTime()
      ) {
        overlapBannerSchedules.push(lodash.cloneDeep(data));
      }
    });

    return overlapBannerSchedules;
  }

  getBannerById(id: number): Promise<Banner> {
    let bannerData;
    data.banner.forEach((data) => {
      if (data.id === id) {
        bannerData = lodash.cloneDeep(data);
      }
    });

    return bannerData;
  }
}
