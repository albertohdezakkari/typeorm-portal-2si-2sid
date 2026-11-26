import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Laboratorio } from '../../laboratorios/entities/laboratorio.entity';

@Entity({ name: 'MUESTRA' })
export class Muestra {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'CANTIDAD_ML', type: 'integer' })
  cantidadMl!: number;

  @ManyToOne(() => Laboratorio, laboratorio => laboratorio.muestras, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_LABORATORIO' })
  laboratorio!: Laboratorio;
  @OneToMany(() => Asignacion, asignacion => asignacion.muestra)
  asignaciones!: Asignacion[];
}
