import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Proyeccion } from '../../proyecciones/entities/proyeccion.entity';

@Entity({ name: 'CINE' })
export class Cine {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Proyeccion, proyeccion => proyeccion.cine)
  proyecciones!: Proyeccion[];
}
