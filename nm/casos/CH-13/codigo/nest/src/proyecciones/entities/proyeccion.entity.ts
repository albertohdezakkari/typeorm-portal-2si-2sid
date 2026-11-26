import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Cine } from '../../cines/entities/cine.entity';

@Entity({ name: 'PROYECCION' })
export class Proyeccion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'PELICULA', type: 'varchar', length: 120 })
  pelicula!: string;

  @Column({ name: 'DURACION_MINUTOS', type: 'integer' })
  duracionMinutos!: number;

  @ManyToOne(() => Cine, cine => cine.proyecciones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_CINE' })
  cine!: Cine;
  @OneToMany(() => Asignacion, asignacion => asignacion.proyeccion)
  asignaciones!: Asignacion[];
}
