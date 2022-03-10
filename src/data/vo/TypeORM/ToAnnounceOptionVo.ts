import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ToAnnounceVo } from './ToAnnounceVo';

@Entity('announce_option')
export class ToAnnounceOptionVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: 'information' | 'error' | 'warning' | 'success';

  @OneToMany(() => ToAnnounceVo, (announce) => announce.announceOption)
  announces: ToAnnounceVo[];
}
