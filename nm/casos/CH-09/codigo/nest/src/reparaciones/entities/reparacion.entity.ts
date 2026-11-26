import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Taller } from '../../talleres/entities/taller.entity';

@Entity({ name: 'REPARACION' })
export class Reparacion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'COSTE_CENTIMOS', type: 'integer' })
  costeCentimos!: number;

  @ManyToOne(() => Taller, taller => taller.reparaciones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_TALLER' })
  taller!: Taller;
  @OneToMany(() => Asignacion, asignacion => asignacion.reparacion)
  asignaciones!: Asignacion[];
}
