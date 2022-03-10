import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ToAnnounceVo } from './ToAnnounceVo';

@Entity('announce_expose_place')
export class ToAnnounceExposePlaceVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: 'dashboard' | 'order' | 'both';

  @OneToMany(() => ToAnnounceVo, (announce) => announce.announceExposePlace)
  announces: ToAnnounceVo[];
}
