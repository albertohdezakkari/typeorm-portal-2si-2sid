import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Trayecto } from '../../trayectos/entities/trayecto.entity';

@Entity({ name: 'ESTACION' })
export class Estacion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Trayecto, trayecto => trayecto.estacion)
  trayectos!: Trayecto[];
}
