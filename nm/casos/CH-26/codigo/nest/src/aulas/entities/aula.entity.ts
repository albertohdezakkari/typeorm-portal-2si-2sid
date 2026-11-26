import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Escuela } from '../../escuelas/entities/escuela.entity';

@Entity({ name: 'AULA' })
export class Aula {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'CAPACIDAD', type: 'integer' })
  capacidad!: number;

  @ManyToOne(() => Escuela, escuela => escuela.aulas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_ESCUELA' })
  escuela!: Escuela;
  @OneToMany(() => Asignacion, asignacion => asignacion.aula)
  asignaciones!: Asignacion[];
}
