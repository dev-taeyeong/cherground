import { inject, injectable } from 'inversify';
import { DuplicateScheduleController } from '..';
import { Banner } from '../../../domain/entities/Banner';
import { DuplicateSchedule } from '../../../domain/entities/DuplicateSchedule';
import { DuplicateScheduleService } from '../../../domain/service';
import { TYPES } from '../../../TYPES';

@injectable()
export class DuplicateScheduleControllerImpl
  implements DuplicateScheduleController
{
  private duplicateScheduleService: DuplicateScheduleService;

  constructor(
    @inject(TYPES.DuplicateScheduleService)
    duplicateScheduleService: DuplicateScheduleService
  ) {
    this.duplicateScheduleService = duplicateScheduleService;
  }

  adjustDuplicateSchedule(
    bannerData: Banner
  ): Promise<DuplicateSchedule[] | void> {
    const {
      title,
      service,
      bannerExposePlace,
      isLink,
      connectionLink,
      bannerImgUrl,
      startTime,
      endTime,
    }: Banner = bannerData;

    return this.duplicateScheduleService
      .adjustDuplicateSchedules(
        title,
        service,
        bannerExposePlace,
        isLink,
        connectionLink,
        bannerImgUrl,
        startTime,
        endTime
      )
      .then((duplicateSchedules) => duplicateSchedules);
  }

  makeDuplicateSchedule(
    duplicateScedules: DuplicateSchedule[],
    createdBannerId: string
  ): Promise<void> {
    return this.duplicateScheduleService.makeDuplicateSchedule(
      duplicateScedules,
      createdBannerId
    );
  }
}
