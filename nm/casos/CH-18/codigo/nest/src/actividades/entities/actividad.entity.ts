import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Club } from '../../clubes/entities/club.entity';

@Entity({ name: 'ACTIVIDAD' })
export class Actividad {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'PLAZAS', type: 'integer' })
  plazas!: number;

  @ManyToOne(() => Club, club => club.actividades, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_CLUB' })
  club!: Club;
  @OneToMany(() => Asignacion, asignacion => asignacion.actividad)
  asignaciones!: Asignacion[];
}
