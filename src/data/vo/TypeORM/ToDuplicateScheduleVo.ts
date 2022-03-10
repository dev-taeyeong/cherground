import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToBannerAndDuplicateScheduleVo } from './ToBannerAndDuplicateScheduleVo';
import { ToBannerExposePlaceVo } from './ToBannerExposePlaceVo';

@Entity('duplicate_schedule')
export class ToDuplicateScheduleVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'expose_interval', nullable: true })
  exposeInterval: string;

  @Column({ name: 'schedule_start_time' })
  scheduleStartTime: string;

  @Column({ name: 'schedule_end_time' })
  scheduleEndTime: string;

  @ManyToOne(
    () => ToBannerExposePlaceVo,
    (bannerExposePlace) => bannerExposePlace.banners,
    { nullable: false }
  )
  @JoinColumn({ name: 'banner_expose_place_id' })
  bannerExposePlace: ToBannerExposePlaceVo;

  @OneToMany(
    () => ToBannerAndDuplicateScheduleVo,
    (bannerAndDuplicateSchedule) => bannerAndDuplicateSchedule.duplicateSchedule
  )
  bannerAndDuplicateSchedules: ToBannerAndDuplicateScheduleVo[];
}
