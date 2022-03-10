import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { ToAnnounceExposePlaceVo } from './data/vo/TypeORM/ToAnnounceExposePlaceVo';
import { ToAnnounceOptionVo } from './data/vo/TypeORM/ToAnnounceOptionVo';
import { ToAnnounceVo } from './data/vo/TypeORM/ToAnnounceVo';
import { ToBannerExposePlaceVo } from './data/vo/TypeORM/ToBannerExposePlaceVo';
import { ToBannerVo } from './data/vo/TypeORM/ToBannerVo';
import { ToContentVo } from './data/vo/TypeORM/ToContentVo';
import { ToDuplicateScheduleVo } from './data/vo/TypeORM/ToDuplicateScheduleVo';
import { ToServiceVo } from './data/vo/TypeORM/ToServiceVo';
import { ToBannerAndDuplicateScheduleVo } from './data/vo/TypeORM/ToBannerAndDuplicateScheduleVo';

export interface OrmConfig {}

@injectable()
export class OrmConfigImpl implements OrmConfig {
  constructor() {
    dotenv.config();

    createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASENAME,
      entities: [
        ToAnnounceExposePlaceVo,
        ToAnnounceOptionVo,
        ToAnnounceVo,
        ToBannerAndDuplicateScheduleVo,
        ToBannerExposePlaceVo,
        ToBannerVo,
        ToContentVo,
        ToDuplicateScheduleVo,
        ToServiceVo,
      ],
      synchronize: true,
      logging: false,
    });
  }
}
