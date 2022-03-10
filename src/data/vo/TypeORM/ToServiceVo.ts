import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ToContentVo } from './ToContentVo';

@Entity('service')
export class ToServiceVo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: 'retailer' | 'wholesale';

  @OneToMany(() => ToContentVo, (content) => content.service)
  contents: ToContentVo[];
}
