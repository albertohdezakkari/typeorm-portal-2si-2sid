import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Estudio } from '../../estudios/entities/estudio.entity';

@Entity({ name: 'ESCENA' })
export class Escena {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'DURACION_SEGUNDOS', type: 'integer' })
  duracionSegundos!: number;

  @ManyToOne(() => Estudio, estudio => estudio.escenas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_ESTUDIO' })
  estudio!: Estudio;
  @OneToMany(() => Asignacion, asignacion => asignacion.escena)
  asignaciones!: Asignacion[];
}
