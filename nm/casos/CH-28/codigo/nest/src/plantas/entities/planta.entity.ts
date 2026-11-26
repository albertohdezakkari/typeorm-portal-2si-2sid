import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Vivero } from '../../viveros/entities/vivero.entity';

@Entity({ name: 'PLANTA' })
export class Planta {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'ALTURA_CM', type: 'integer' })
  alturaCm!: number;

  @ManyToOne(() => Vivero, vivero => vivero.plantas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_VIVERO' })
  vivero!: Vivero;
  @OneToMany(() => Asignacion, asignacion => asignacion.planta)
  asignaciones!: Asignacion[];
}
