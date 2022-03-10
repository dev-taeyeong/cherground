import fs from 'fs';
import { injectable } from 'inversify';
import { BannerExposePlace } from '../domain/entities/BannerExposePlace';
import { DuplicateSchedule } from '../domain/entities/DuplicateSchedule';
import { DuplicateScheduleRepository } from '../domain/interactor/repositories';

@injectable()
export class DuplicateScheduleRepositoryImpl
  implements DuplicateScheduleRepository
{
  getDuplicateSchedule(
    bannerExposePlace: BannerExposePlace,
    startTime: string,
    endTime: string
  ) {
    const getDuplicateScheduleData: Promise<DuplicateSchedule[]> = new Promise(
      (resolve, reject) => {
        fs.readFile('./src/mock-data/data.json', 'utf-8', (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data).duplicateSchedule);
        });
      }
    );

    return getDuplicateScheduleData.then((data: DuplicateSchedule[]) => {
      return data.filter((duplicateSchedule) => {
        if (
          new Date(duplicateSchedule.scheduleStartTime).getTime() <
            new Date(endTime).getTime() &&
          new Date(duplicateSchedule.scheduleEndTime).getTime() >
            new Date(startTime).getTime()
        ) {
          return duplicateSchedule;
        }
      });
    });
  }

  createDuplicateSchedule(
    duplicateSchedules: DuplicateSchedule[]
  ): Promise<void> {
    const getDuplicateSchedules: Promise<DuplicateSchedule[]> = new Promise(
      (resolve, reject) => {
        fs.readFile('./src/mock-data/data.json', 'utf-8', (err, data) => {
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
        './src/mock-data/update-duplicateSchedule.json',
        JSON.stringify(duplicateScheduleDatas),
        (err) => {
          if (err) console.log(err);
        }
      );
    });
  }
}
