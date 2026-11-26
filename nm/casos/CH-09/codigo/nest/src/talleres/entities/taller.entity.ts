import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Reparacion } from '../../reparaciones/entities/reparacion.entity';

@Entity({ name: 'TALLER' })
export class Taller {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Reparacion, reparacion => reparacion.taller)
  reparaciones!: Reparacion[];
}
