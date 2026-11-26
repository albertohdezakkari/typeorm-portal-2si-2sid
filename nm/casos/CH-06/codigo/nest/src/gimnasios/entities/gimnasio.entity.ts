import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Sesion } from '../../sesiones/entities/sesion.entity';

@Entity({ name: 'GIMNASIO' })
export class Gimnasio {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Sesion, sesion => sesion.gimnasio)
  sesiones!: Sesion[];
}
