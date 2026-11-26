import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';
import { Monitor } from '../../monitores/entities/monitor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_ACTIVIDAD', type: 'integer' })
  actividadId!: number;

  @PrimaryColumn({ name: 'ID_MONITOR', type: 'integer' })
  monitorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Actividad, actividad => actividad.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ACTIVIDAD' })
  actividad!: Actividad;

  @ManyToOne(() => Monitor, monitor => monitor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_MONITOR' })
  monitor!: Monitor;
}
