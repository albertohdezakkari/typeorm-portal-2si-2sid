import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Planta } from '../../plantas/entities/planta.entity';
import { Jardinero } from '../../jardineros/entities/jardinero.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PLANTA', type: 'integer' })
  plantaId!: number;

  @PrimaryColumn({ name: 'ID_JARDINERO', type: 'integer' })
  jardineroId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Planta, planta => planta.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PLANTA' })
  planta!: Planta;

  @ManyToOne(() => Jardinero, jardinero => jardinero.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_JARDINERO' })
  jardinero!: Jardinero;
}
