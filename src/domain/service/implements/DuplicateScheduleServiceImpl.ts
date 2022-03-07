import { inject, injectable } from 'inversify';
import lodash from 'lodash';
import { DuplicateScheduleService } from '..';
import { TYPES } from '../../../TYPES';
import { BannerExposePlace } from '../../entities/Banner';
import { ContentType, Service } from '../../entities/Content';
import { DuplicateSchedule } from '../../entities/DuplicateSchedule';
import { DuplicateScheduleRepository } from '../../interactor/repositories';

@injectable()
export class DuplicateScheduleServiceImpl implements DuplicateScheduleService {
  private duplicateScheduleRepository: DuplicateScheduleRepository;

  constructor(
    @inject(TYPES.DuplicateScheduleRepository)
    duplicateScheduleRepository: DuplicateScheduleRepository
  ) {
    this.duplicateScheduleRepository = duplicateScheduleRepository;
  }

  adjustDuplicateSchedules(
    contentType: ContentType,
    title: string,
    service: Service,
    bannerExposePlace: BannerExposePlace,
    isLink: boolean,
    connectionLink: string,
    imageUrl: string,
    startTime: string,
    endTime: string
  ): Promise<void | DuplicateSchedule[]> {
    return this.duplicateScheduleRepository
      .getDuplicateSchedule(
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
      .then((duplicateSchedules) => {
        let cutPointStart: null | number = null;
        let cutPointEnd: null | number = null;
        let createCount = 0;

        // 배너 중복 스케줄에서 잘라야 하는 스케줄 찾기

        duplicateSchedules.forEach(
          (duplicateSchedule: DuplicateSchedule, index: number) => {
            if (
              new Date(duplicateSchedule.scheduleStartTime).getTime() <
                new Date(startTime).getTime() &&
              new Date(duplicateSchedule.scheduleEndTime).getTime() >
                new Date(startTime).getTime()
            ) {
              cutPointStart = index;
            }

            if (
              new Date(duplicateSchedule.scheduleStartTime).getTime() <
                new Date(endTime).getTime() &&
              new Date(duplicateSchedule.scheduleEndTime).getTime() >
                new Date(endTime).getTime()
            ) {
              cutPointEnd = index;
            }
          }
        );

        // 잘라야할 부분이 있다면 자르기(시작 시간)
        if (cutPointStart !== null) {
          duplicateSchedules.push(
            lodash.cloneDeep(duplicateSchedules[cutPointStart])
          );

          duplicateSchedules[duplicateSchedules.length - 1].id = null;
          duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime =
            new Date(startTime);

          duplicateSchedules[cutPointStart].scheduleEndTime = new Date(
            startTime
          );

          createCount++;
        }

        // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
        else if (
          new Date(duplicateSchedules[0].scheduleStartTime).getTime() !==
          new Date(startTime).getTime()
        ) {
          duplicateSchedules.push(lodash.cloneDeep(duplicateSchedules[0]));

          duplicateSchedules[duplicateSchedules.length - 1].id = null;
          duplicateSchedules[
            duplicateSchedules.length - 1
          ].overlapBanners.pop();

          duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime =
            duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime;

          duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime =
            new Date(startTime);

          createCount++;
        }

        // 잘라야할 부분이 있다면 자르기(종료 시간)
        if (cutPointEnd !== null) {
          duplicateSchedules.push(
            lodash.cloneDeep(duplicateSchedules[cutPointEnd])
          );

          duplicateSchedules[duplicateSchedules.length - 1].id = null;
          duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime =
            new Date(endTime);

          duplicateSchedules[cutPointEnd].scheduleStartTime = new Date(endTime);

          createCount++;
        }

        // 기존 스케줄을 잘라야할 필요가 없을 때(시간이 겹치는 겹치는 경우 제외)
        else if (
          new Date(
            duplicateSchedules[
              duplicateSchedules.length - 1 - createCount
            ].scheduleEndTime
          ).getTime() !== new Date(endTime).getTime()
        ) {
          duplicateSchedules.push(
            lodash.cloneDeep(
              duplicateSchedules[duplicateSchedules.length - 1 - createCount]
            )
          );

          duplicateSchedules[duplicateSchedules.length - 1].id = null;
          duplicateSchedules[
            duplicateSchedules.length - 1
          ].overlapBanners.pop();

          duplicateSchedules[duplicateSchedules.length - 1].scheduleStartTime =
            duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime;

          duplicateSchedules[duplicateSchedules.length - 1].scheduleEndTime =
            new Date(endTime);
        }

        // 중복되는 배너 스케줄에 새로 들어온 배너 추가해주기
        duplicateSchedules.forEach(
          (overlapBannerSchedule: DuplicateSchedule, index: number) => {
            overlapBannerSchedule.overlapBanners.forEach((overlapBanner) => {
              switch (overlapBanner.ordinal) {
                case 'first':
                  overlapBanner.ordinal = 'second';
                  break;
                case 'second':
                  overlapBanner.ordinal = 'third';
                  break;
                case 'third':
                  overlapBanner.ordinal = 'fourth';
                  break;
                case 'fourth':
                  overlapBanner.ordinal = 'fifth';
                default:
                  throw new Error('There are already 5 banners');
              }
            });

            if (index !== cutPointStart && index !== cutPointEnd) {
              overlapBannerSchedule.overlapBanners.push({
                banner: {
                  id: null,
                  contentType,
                  title,
                  service,
                  bannerExposePlace,
                  isLink,
                  connectionLink,
                  imageUrl,
                  startTime,
                  endTime,
                },
                ordinal: 'first',
              });
            }
          }
        );

        // scheduleStartTime 오름차순으로 정렬
        duplicateSchedules.sort(
          (a: DuplicateSchedule, b: DuplicateSchedule) => {
            return (
              new Date(a.scheduleStartTime).getTime() -
              new Date(b.scheduleStartTime).getTime()
            );
          }
        );

        return duplicateSchedules;
      });
  }

  makeDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[],
    createdBannerId: string
  ): Promise<void> {
    duplicateSchedules.forEach((duplicateSchedule) => {
      duplicateSchedule.overlapBanners.forEach((overlapBanner) => {
        if (!overlapBanner.banner.id) overlapBanner.banner.id = createdBannerId;
      });
    });
    return this.duplicateScheduleRepository.createDuplicateSchedule(
      duplicateSchedules
    );
  }
}
