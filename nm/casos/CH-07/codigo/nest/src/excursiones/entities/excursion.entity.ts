import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Agencia } from '../../agencias/entities/agencia.entity';

@Entity({ name: 'EXCURSION' })
export class Excursion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'DURACION_HORAS', type: 'integer' })
  duracionHoras!: number;

  @ManyToOne(() => Agencia, agencia => agencia.excursiones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_AGENCIA' })
  agencia!: Agencia;
  @OneToMany(() => Asignacion, asignacion => asignacion.excursion)
  asignaciones!: Asignacion[];
}
