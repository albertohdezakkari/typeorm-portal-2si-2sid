import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';
import { Profesional } from '../../profesionales/entities/profesional.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_OBRA', type: 'integer' })
  obraId!: number;

  @PrimaryColumn({ name: 'ID_PROFESIONAL', type: 'integer' })
  profesionalId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Obra, obra => obra.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_OBRA' })
  obra!: Obra;

  @ManyToOne(() => Profesional, profesional => profesional.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PROFESIONAL' })
  profesional!: Profesional;
}
