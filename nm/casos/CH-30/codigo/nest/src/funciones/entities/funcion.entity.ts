import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Teatro } from '../../teatros/entities/teatro.entity';

@Entity({ name: 'FUNCION' })
export class Funcion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'AFORO', type: 'integer' })
  aforo!: number;

  @ManyToOne(() => Teatro, teatro => teatro.funciones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_TEATRO' })
  teatro!: Teatro;
  @OneToMany(() => Asignacion, asignacion => asignacion.funcion)
  asignaciones!: Asignacion[];
}
