import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToAnnounceExposePlaceVo } from './ToAnnounceExposePlaceVo';
import { ToAnnounceOptionVo } from './ToAnnounceOptionVo';
import { ToContentVo } from './ToContentVo';

@Entity('announce')
export class ToAnnounceVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'is_popup_img' })
  isPopupImg: boolean;

  @Column({ name: 'popup_img_url', nullable: true })
  popupImgUrl: string;

  @OneToOne(() => ToContentVo, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'content_id' })
  content: ToContentVo;

  @ManyToOne(
    () => ToAnnounceOptionVo,
    (announce_option) => announce_option.announces,
    { nullable: false }
  )
  @JoinColumn({ name: 'announce_opiton_id' })
  announceOption: ToAnnounceOptionVo;

  @ManyToOne(
    () => ToAnnounceExposePlaceVo,
    (announce_expose_place) => announce_expose_place.announces,
    { nullable: false }
  )
  @JoinColumn({ name: 'announce_expose_place_id' })
  announceExposePlace: ToAnnounceExposePlaceVo;
}
