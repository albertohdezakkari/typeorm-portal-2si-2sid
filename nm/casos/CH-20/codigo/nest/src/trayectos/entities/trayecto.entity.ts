import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Estacion } from '../../estaciones/entities/estacion.entity';

@Entity({ name: 'TRAYECTO' })
export class Trayecto {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'DISTANCIA_KM', type: 'integer' })
  distanciaKm!: number;

  @ManyToOne(() => Estacion, estacion => estacion.trayectos, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_ESTACION' })
  estacion!: Estacion;
  @OneToMany(() => Asignacion, asignacion => asignacion.trayecto)
  asignaciones!: Asignacion[];
}
