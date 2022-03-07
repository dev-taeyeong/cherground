import fs from 'fs';
import { injectable } from 'inversify';
import { BannerExposePlace } from '../../domain/entities/Banner';
import { ContentType, Service } from '../../domain/entities/Content';
import { DuplicateSchedule } from '../../domain/entities/DuplicateSchedule';
import { DuplicateScheduleRepository } from '../../domain/interactor/repositories';

@injectable()
export class DuplicateScheduleRepositoryImpl
  implements DuplicateScheduleRepository
{
  getDuplicateSchedule(
    contentType: ContentType,
    title: string,
    service: Service,
    bannerExposePlace: BannerExposePlace,
    isLink: boolean,
    connectionLink: string,
    imageUrl: string,
    startTime: string,
    endTime: string
  ) {
    const getDuplicateScheduleData: Promise<DuplicateSchedule[]> = new Promise(
      (resolve, reject) => {
        fs.readFile('./src/data/mock-data/data.json', 'utf-8', (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data).duplicateSchedule);
        });
      }
    );

    return getDuplicateScheduleData.then((data: DuplicateSchedule[]) =>
      data.filter((duplicateSchedule) => {
        if (
          new Date(duplicateSchedule.scheduleStartTime).getTime() <
            new Date(endTime).getTime() &&
          new Date(duplicateSchedule.scheduleEndTime).getTime() >
            new Date(startTime).getTime()
        ) {
          return duplicateSchedule;
        }
      })
    );
  }

  createDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[]
  ): Promise<void> {
    const getDuplicateSchedules: Promise<DuplicateSchedule[]> = new Promise(
      (resolve, reject) => {
        fs.readFile('./src/data/mock-data/data.json', 'utf-8', (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data).duplicateSchedule);
        });
      }
    );

    return getDuplicateSchedules.then((duplicateScheduleDatas) => {
      duplicateSchedules.forEach((duplicateSchedule) => {
        if (duplicateSchedule.id === null) {
          duplicateSchedule.id = duplicateScheduleDatas.length + 1 + '';
          duplicateScheduleDatas.push(duplicateSchedule);
        } else {
          duplicateScheduleDatas.forEach((duplicateScheduleData, index) => {
            if (duplicateScheduleData.id === duplicateSchedule.id) {
              duplicateScheduleDatas[index] = duplicateSchedule;
            }
          });
        }
      });

      fs.writeFile(
        './src/data/mock-data/update-duplicateSchedule.json',
        JSON.stringify(duplicateScheduleDatas),
        (err) => {
          if (err) console.log(err);
        }
      );
    });
  }
}
