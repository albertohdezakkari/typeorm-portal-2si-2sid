import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Festival } from '../../festivales/entities/festival.entity';

@Entity({ name: 'ACTUACION' })
export class Actuacion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'DURACION_MINUTOS', type: 'integer' })
  duracionMinutos!: number;

  @ManyToOne(() => Festival, festival => festival.actuaciones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_FESTIVAL' })
  festival!: Festival;
  @OneToMany(() => Asignacion, asignacion => asignacion.actuacion)
  asignaciones!: Asignacion[];
}
