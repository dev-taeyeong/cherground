import fs from 'fs';
import { injectable } from 'inversify';
import { Banner } from '../domain/entities/Banner';
import { BannerRepository } from '../domain/interactor/repositories';

@injectable()
export class BannerRepositoryImpl implements BannerRepository {
  createBanner(banner: Banner): Promise<string> {
    const getBannerData: Promise<Banner[]> = new Promise((resolve, reject) => {
      fs.readFile('./src/mock-data/data.json', 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data).banner);
        }
      });
    });

    return getBannerData.then((bannerData: Banner[]) => {
      banner.id = (bannerData.length + 1).toString();
      bannerData.push(banner);
      fs.writeFile(
        './src/mock-data/test.json',
        JSON.stringify(bannerData),
        (err) => {
          if (err) console.log(err);
        }
      );

      return bannerData.length + '';
    });
  }

  getWeeklyBannersByWeekStart(weekStart: string): Promise<Banner[]> {
    const getBannerData: Promise<Banner[]> = new Promise((resolve, reject) => {
      fs.readFile('./src/mock-data/data.json', 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data).banner);
        }
      });
    });

    return getBannerData.then((banners) => {
      return banners.filter((banner) => {
        if (
          new Date(banner.startTime).getTime() <
            new Date(weekStart).getTime() + 1000 * 60 * 60 * 24 * 7 &&
          new Date(banner.endTime).getTime() > new Date(weekStart).getTime()
        ) {
          return banner;
        }
      });
    });
  }
}
