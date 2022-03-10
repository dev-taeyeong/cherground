import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToBannerVo } from './ToBannerVo';
import { ToDuplicateScheduleVo } from './ToDuplicateScheduleVo';

@Entity('banner_and_duplicate_schedule')
export class ToBannerAndDuplicateScheduleVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ordinal: 'first' | 'second' | 'third' | 'fourth' | 'fifth';

  @ManyToOne(() => ToBannerVo, (banner) => banner.bannerAndDuplicateSchedules, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'banner_id' })
  banner: ToBannerVo;

  @ManyToOne(
    () => ToDuplicateScheduleVo,
    (duplicateSchedule) => duplicateSchedule.bannerAndDuplicateSchedules
  )
  @JoinColumn({ name: 'duplicate_schedule_id' })
  duplicateSchedule: ToDuplicateScheduleVo;
}
