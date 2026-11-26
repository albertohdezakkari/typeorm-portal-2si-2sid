import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Excursion } from '../../excursiones/entities/excursion.entity';
import { Guia } from '../../guias/entities/guia.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_EXCURSION', type: 'integer' })
  excursionId!: number;

  @PrimaryColumn({ name: 'ID_GUIA', type: 'integer' })
  guiaId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Excursion, excursion => excursion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_EXCURSION' })
  excursion!: Excursion;

  @ManyToOne(() => Guia, guia => guia.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_GUIA' })
  guia!: Guia;
}
