import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Reparacion } from '../../reparaciones/entities/reparacion.entity';
import { Mecanico } from '../../mecanicos/entities/mecanico.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_REPARACION', type: 'integer' })
  reparacionId!: number;

  @PrimaryColumn({ name: 'ID_MECANICO', type: 'integer' })
  mecanicoId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Reparacion, reparacion => reparacion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_REPARACION' })
  reparacion!: Reparacion;

  @ManyToOne(() => Mecanico, mecanico => mecanico.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_MECANICO' })
  mecanico!: Mecanico;
}
