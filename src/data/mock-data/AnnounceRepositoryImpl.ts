import fs from 'fs';
import { injectable } from 'inversify';
import { Announce } from '../../domain/entities/Announce';
import { AnnounceRepository } from '../../domain/interactor/repositories';

@injectable()
export class AnnounceRepositoryImpl implements AnnounceRepository {
  createAnnounce(announce: Announce): Promise<void> {}

  getWeeklyAnnouncesByWeekStart(weekStart: string): Promise<Announce[]> {
    const getAnnounceData: Promise<Announce[]> = new Promise(
      (resolve, reject) => {
        fs.readFile('./src/data/mock-data/data.json', 'utf-8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data).announce);
          }
        });
      }
    );

    return getAnnounceData.then((announces) => {
      return announces.filter((announce) => {
        if (
          new Date(announce.startTime).getTime() <
            new Date(weekStart).getTime() + 1000 * 60 * 60 * 24 * 7 &&
          new Date(announce.endTime).getTime() > new Date(weekStart).getTime()
        ) {
          return announce;
        }
      });
    });
  }
}
