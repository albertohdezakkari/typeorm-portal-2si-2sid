import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Museo } from '../../museos/entities/museo.entity';

@Entity({ name: 'PIEZA' })
export class Pieza {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'ANTIGUEDAD_ANIOS', type: 'integer' })
  antiguedadAnios!: number;

  @ManyToOne(() => Museo, museo => museo.piezas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_MUSEO' })
  museo!: Museo;
  @OneToMany(() => Asignacion, asignacion => asignacion.pieza)
  asignaciones!: Asignacion[];
}
