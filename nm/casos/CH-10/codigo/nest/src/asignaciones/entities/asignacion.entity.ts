import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Habitacion } from '../../habitaciones/entities/habitacion.entity';
import { Enfermero } from '../../enfermeros/entities/enfermero.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_HABITACION', type: 'integer' })
  habitacionId!: number;

  @PrimaryColumn({ name: 'ID_ENFERMERO', type: 'integer' })
  enfermeroId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Habitacion, habitacion => habitacion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_HABITACION' })
  habitacion!: Habitacion;

  @ManyToOne(() => Enfermero, enfermero => enfermero.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ENFERMERO' })
  enfermero!: Enfermero;
}
