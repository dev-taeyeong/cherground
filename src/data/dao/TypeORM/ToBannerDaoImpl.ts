import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { BannerDao } from '..';
import { Banner } from '../../../domain/entities/Banner';
import { ToBannerVo } from '../../vo/TypeORM/ToBannerVo';
import { ToContentVo } from '../../vo/TypeORM/ToContentVo';

@injectable()
export class ToBannerDaoImpl implements BannerDao {
  createBanner(banner: Banner): Promise<string> {
    const contentRepo = getRepository(ToContentVo);
    const bannerRepo = getRepository(ToBannerVo);

    return contentRepo
      .save({
        title: banner.title,
        startTime: banner.startTime,
        endTime: banner.endTime,
        service: banner.service,
      })
      .then((data) =>
        bannerRepo.save({
          isLink: banner.isLink,
          connectionLink: banner.connectionLink,
          bannerImgUrl: banner.bannerImgUrl,
          content: {
            id: data.id,
          },
          bannerExposePlace: banner.bannerExposePlace,
        })
      )
      .then((data) => data.id);
  }

  getWeeklyBannersByWeekStart(weekStart: string): Promise<Banner[]> {}
}
