import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Actuacion } from '../../actuaciones/entities/actuacion.entity';

@Entity({ name: 'FESTIVAL' })
export class Festival {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Actuacion, actuacion => actuacion.festival)
  actuaciones!: Actuacion[];
}
