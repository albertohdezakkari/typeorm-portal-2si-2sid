import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';

@Entity({ name: 'PROFESIONAL' })
export class Profesional {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'APELLIDOS', type: 'varchar', length: 160 })
  apellidos!: string;

  @Column({ name: 'EMAIL', type: 'varchar', length: 180 })
  email!: string;

  @OneToMany(() => Asignacion, asignacion => asignacion.profesional)
  asignaciones!: Asignacion[];
}
