import { inject, injectable } from 'inversify';
import { DuplicateScheduleDao } from '../dao';
import { BannerExposePlace } from '../../domain/entities/BannerExposePlace';
import { DuplicateSchedule } from '../../domain/entities/DuplicateSchedule';
import { DuplicateScheduleRepository } from '../../domain/interactor/repositories';
import { TYPES } from '../../TYPES';

@injectable()
export class DuplicateScheduleRepositoryImpl
  implements DuplicateScheduleRepository
{
  duplicateScheduleDao: DuplicateScheduleDao;

  constructor(
    @inject(TYPES.DuplicateScheduleDao)
    duplicateScheduleDao: DuplicateScheduleDao
  ) {
    this.duplicateScheduleDao = duplicateScheduleDao;
  }

  async getDuplicateSchedule(
    bannerExposePlace: BannerExposePlace,
    startTime: string,
    endTime: string
  ): Promise<{}> {
    // return this.duplicateScheduleDao
    //   .getDuplicateSchedule(bannerExposePlace, startTime, endTime)
    //   .then((datas) => {
    //     datas.forEach((data) => {
    //       this.duplicateScheduleDao
    //         .getBannerAndDuplicateSchedule(data.id)
    //         .then((duplicate) => {
    //           data.duplicate = duplicate;
    //         });
    //     });

    //     return datas;
    //   });

    const a = await this.duplicateScheduleDao.getDuplicateSchedule(
      bannerExposePlace,
      startTime,
      endTime
    );

    for (let i = 0; i < a.length; i++) {
      const c = await this.duplicateScheduleDao.getBannerAndDuplicateSchedule(
        a[i].id
      );

      a[i].overlapBanners = c;
    }

    return a;
  }

  createDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[]
  ): Promise<void> {
    return this.duplicateScheduleDao.createDuplicateSchedule(
      duplicateSchedules
    );
  }

  createBannerAndDuplicateSchedule(ordinal, bannerId, duplicateScheduleId) {
    return this.duplicateScheduleDao.createBannerAndDuplicateSchedule(
      ordinal,
      bannerId,
      duplicateScheduleId
    );
  }

  updateDuplicateSchedule(duplicateSchedule: DuplicateSchedule) {
    return this.duplicateScheduleDao.updateDuplicateSchedule(duplicateSchedule);
  }
}
