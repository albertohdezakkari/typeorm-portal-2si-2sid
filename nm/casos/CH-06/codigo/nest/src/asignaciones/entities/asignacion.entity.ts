import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Sesion } from '../../sesiones/entities/sesion.entity';
import { Instructor } from '../../instructores/entities/instructor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_SESION', type: 'integer' })
  sesionId!: number;

  @PrimaryColumn({ name: 'ID_INSTRUCTOR', type: 'integer' })
  instructorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Sesion, sesion => sesion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_SESION' })
  sesion!: Sesion;

  @ManyToOne(() => Instructor, instructor => instructor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_INSTRUCTOR' })
  instructor!: Instructor;
}
