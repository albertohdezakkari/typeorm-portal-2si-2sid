import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Parque } from '../../parques/entities/parque.entity';

@Entity({ name: 'ZONA' })
export class Zona {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'CAPACIDAD', type: 'integer' })
  capacidad!: number;

  @ManyToOne(() => Parque, parque => parque.zonas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_PARQUE' })
  parque!: Parque;
  @OneToMany(() => Asignacion, asignacion => asignacion.zona)
  asignaciones!: Asignacion[];
}
