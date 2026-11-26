import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Gimnasio } from '../../gimnasios/entities/gimnasio.entity';

@Entity({ name: 'SESION' })
export class Sesion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'PLAZAS', type: 'integer' })
  plazas!: number;

  @ManyToOne(() => Gimnasio, gimnasio => gimnasio.sesiones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_GIMNASIO' })
  gimnasio!: Gimnasio;
  @OneToMany(() => Asignacion, asignacion => asignacion.sesion)
  asignaciones!: Asignacion[];
}
