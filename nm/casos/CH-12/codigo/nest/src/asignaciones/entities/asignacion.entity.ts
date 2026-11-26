import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';
import { Inspector } from '../../inspectores/entities/inspector.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_LOTE', type: 'integer' })
  loteId!: number;

  @PrimaryColumn({ name: 'ID_INSPECTOR', type: 'integer' })
  inspectorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Lote, lote => lote.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_LOTE' })
  lote!: Lote;

  @ManyToOne(() => Inspector, inspector => inspector.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_INSPECTOR' })
  inspector!: Inspector;
}
