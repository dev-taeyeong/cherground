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
  duplicateScheduleService: DuplicateScheduleService;
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
      contentType,
      title,
      service,
      bannerExposePlace,
      isLink,
      connectionLink,
      imageUrl,
      startTime,
      endTime,
    }: Banner = bannerData;

    return this.duplicateScheduleService
      .adjustDuplicateSchedules(
        contentType,
        title,
        service,
        bannerExposePlace,
        isLink,
        connectionLink,
        imageUrl,
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
