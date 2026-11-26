import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Habitacion } from '../../habitaciones/entities/habitacion.entity';

@Entity({ name: 'HOSPITAL' })
export class Hospital {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Habitacion, habitacion => habitacion.hospital)
  habitaciones!: Habitacion[];
}
