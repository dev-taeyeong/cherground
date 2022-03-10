import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Banner } from '../../../domain/entities/Banner';
import { ToBannerVo } from './ToBannerVo';
import { ToDuplicateScheduleVo } from './ToDuplicateScheduleVo';

@Entity('banner_expose_place')
export class ToBannerExposePlaceVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: 'dashboardTop' | 'dashboardBottom';

  @OneToMany(() => ToBannerVo, (banner) => banner.bannerExposePlace)
  banners: Banner[];

  @OneToMany(
    () => ToDuplicateScheduleVo,
    (duplicate_schedule) => duplicate_schedule.bannerExposePlace
  )
  duplicateSchedules: ToDuplicateScheduleVo[];
}
