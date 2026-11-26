import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';

@Entity({ name: 'CLUB' })
export class Club {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Actividad, actividad => actividad.club)
  actividades!: Actividad[];
}
