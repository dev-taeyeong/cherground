import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToBannerAndDuplicateScheduleVo } from './ToBannerAndDuplicateScheduleVo';
import { ToBannerExposePlaceVo } from './ToBannerExposePlaceVo';
import { ToContentVo } from './ToContentVo';

@Entity('banner')
export class ToBannerVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'is_link' })
  isLink: boolean;

  @Column({ name: 'connection_link', nullable: true })
  connectionLink: string;

  @Column({ name: 'banner_img_url' })
  bannerImgUrl: string;

  @OneToOne(() => ToContentVo, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'content_id' })
  content: ToContentVo;

  @ManyToOne(
    () => ToBannerExposePlaceVo,
    (bannerExposePlace) => bannerExposePlace.banners,
    { nullable: false }
  )
  @JoinColumn({ name: 'banner_expose_place_id' })
  bannerExposePlace: ToBannerExposePlaceVo;

  @OneToMany(
    () => ToBannerAndDuplicateScheduleVo,
    (bannerAndDuplicateSchedule) => bannerAndDuplicateSchedule.banner
  )
  bannerAndDuplicateSchedules: ToBannerAndDuplicateScheduleVo[];
}
