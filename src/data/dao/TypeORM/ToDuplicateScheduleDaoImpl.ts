import { injectable } from 'inversify';
import { getRepository, Raw } from 'typeorm';
import { DuplicateScheduleDao } from '..';
import { BannerExposePlace } from '../../../domain/entities/BannerExposePlace';
import { DuplicateSchedule } from '../../../domain/entities/DuplicateSchedule';
import { ToBannerAndDuplicateScheduleVo } from '../../vo/TypeORM/ToBannerAndDuplicateScheduleVo';
import { ToDuplicateScheduleVo } from '../../vo/TypeORM/ToDuplicateScheduleVo';

@injectable()
export class ToDuplicateScheduleDaoImpl implements DuplicateScheduleDao {
  getDuplicateSchedule(
    bannerExposePlace: BannerExposePlace,
    startTime: string,
    endTime: string
  ): any {
    const bannerAndDuplicateScheduleRepo = getRepository(
      ToBannerAndDuplicateScheduleVo
    );
    const duplicateScheduleRepo = getRepository(ToDuplicateScheduleVo);

    return duplicateScheduleRepo
      .createQueryBuilder('duplicateSchedule')
      .where(
        'duplicateSchedule.scheduleStartTime < :endTime AND duplicateSchedule.scheduleEndTime > :startTime',
        {
          startTime: startTime,
          endTime: endTime,
        }
      )
      .leftJoinAndSelect(
        'duplicateSchedule.bannerExposePlace',
        'bannerExposePlace'
      )
      .select([
        'duplicateSchedule.id AS id',
        'duplicateSchedule.exposeInterval AS exposeInterval',
        'duplicateSchedule.scheduleStartTime AS scheduleStartTime',
        'duplicateSchedule.scheduleEndTime AS scheduleEndTime',
        'bannerExposePlace.id AS bannerExposePlaceId',
        'bannerExposePlace.name AS bannerExposePlace',
      ])
      .execute();

    return bannerAndDuplicateScheduleRepo
      .createQueryBuilder('bannerAndDuplicateSchedule')
      .leftJoinAndSelect('bannerAndDuplicateSchedule.banner', 'banner')
      .leftJoinAndSelect('banner.content', 'content')
      .leftJoinAndSelect(
        'bannerAndDuplicateSchedule.duplicateSchedule',
        'duplicateSchedule'
      )
      .where(
        'duplicateSchedule.scheduleStartTime < :endTime AND duplicateSchedule.scheduleEndTime > :startTime',
        {
          startTime: startTime,
          endTime: endTime,
        }
      )
      .getMany();

    find({
      join: {
        alias: 'bannerAndDuplicateSchedule',
        leftJoinAndSelect: {
          banner: 'bannerAndDuplicateSchedule.banner',
        },
      },
    });

    const repo = getRepository(ToDuplicateScheduleVo);
    return repo
      .find({
        bannerExposePlace: bannerExposePlace,
        scheduleStartTime: Raw((alias) => `${alias} < :endTime`, {
          endTime: endTime,
        }),
        scheduleEndTime: Raw((alias) => `${alias} > :startTime`, {
          startTime: startTime,
        }),
      })
      .then((data: ToDuplicateScheduleVo[]) => data);
  }

  getBannerAndDuplicateSchedule(
    duplicateScheduleId: string
  ): Promise<ToBannerAndDuplicateScheduleVo> {
    const bannerAndDuplicateScheduleRepo = getRepository(
      ToBannerAndDuplicateScheduleVo
    );

    return bannerAndDuplicateScheduleRepo
      .createQueryBuilder('bannerAndDuplicateSchedule')
      .leftJoinAndSelect('bannerAndDuplicateSchedule.banner', 'banner')
      .leftJoinAndSelect('banner.content', 'content')
      .select([
        'banner.id AS id',
        'content.title AS title',
        'content.startTime AS startTime',
        'content.endTime AS endTime',
        'bannerAndDuplicateSchedule.ordinal AS ordinal',
      ])
      .where('bannerAndDuplicateSchedule.duplicateSchedule = :id', {
        id: duplicateScheduleId,
      })
      .execute();
  }

  createDuplicateSchedule(duplicateSchedule: DuplicateSchedule): any {
    const duplicateScheduleRepo = getRepository(ToDuplicateScheduleVo);
    // const bannerAndDuplicateScheduleRepo = getRepository(
    //   'bannerAndDuplicateScheduleRepo'
    // );

    return duplicateScheduleRepo
      .save({
        exposeInterval: duplicateSchedule.exposeInterval,
        scheduleStartTime: duplicateSchedule.scheduleStartTime,
        scheduleEndTime: duplicateSchedule.scheduleEndTime,
        bannerExposePlace: duplicateSchedule.bannerExposePlaceId,
      })
      .then((data) => data.id);
  }

  createBannerAndDuplicateSchedule(
    ordinal: string,
    bannerId: string,
    duplicateScheduleId: string
  ) {
    const bannerAndDuplicateScheduleRepo = getRepository(
      ToBannerAndDuplicateScheduleVo
    );

    bannerAndDuplicateScheduleRepo.save({
      ordinal: ordinal,
      banner: bannerId,
      duplicateSchedule: duplicateScheduleId,
    });
  }

  updateDuplicateSchedule(duplicateSchedule: DuplicateSchedule) {
    const duplicateScheduleRepo = getRepository(ToDuplicateScheduleVo);

    console.log(duplicateSchedule);

    duplicateScheduleRepo.update(duplicateSchedule.id, {
      exposeInterval: duplicateSchedule.exposeInterval,
      scheduleStartTime: duplicateSchedule.scheduleStartTime,
      scheduleEndTime: duplicateSchedule.scheduleEndTime,
      bannerExposePlace: duplicateSchedule.bannerExposePlaceId,
    });

    return;
  }
}
