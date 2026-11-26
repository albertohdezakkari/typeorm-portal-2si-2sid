import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Urbanizacion } from '../../urbanizaciones/entities/urbanizacion.entity';

@Entity({ name: 'PLAZA' })
export class Plaza {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'SUPERFICIE_M2', type: 'integer' })
  superficieM2!: number;

  @ManyToOne(() => Urbanizacion, urbanizacion => urbanizacion.plazas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_URBANIZACION' })
  urbanizacion!: Urbanizacion;
  @OneToMany(() => Asignacion, asignacion => asignacion.plaza)
  asignaciones!: Asignacion[];
}
