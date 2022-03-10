import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToServiceVo } from './ToServiceVo';

@Entity('content')
export class ToContentVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @ManyToOne(
    () => ToServiceVo,
    (service_id) => {
      service_id.contents;
    }
  )
  @JoinColumn({ name: 'service_id' })
  service: ToServiceVo;
}
