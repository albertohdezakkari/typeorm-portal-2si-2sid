import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Trayecto } from '../../trayectos/entities/trayecto.entity';
import { Conductor } from '../../conductores/entities/conductor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_TRAYECTO', type: 'integer' })
  trayectoId!: number;

  @PrimaryColumn({ name: 'ID_CONDUCTOR', type: 'integer' })
  conductorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Trayecto, trayecto => trayecto.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_TRAYECTO' })
  trayecto!: Trayecto;

  @ManyToOne(() => Conductor, conductor => conductor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_CONDUCTOR' })
  conductor!: Conductor;
}
