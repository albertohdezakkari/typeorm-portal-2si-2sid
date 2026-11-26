import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Zona } from '../../zonas/entities/zona.entity';
import { Jardinero } from '../../jardineros/entities/jardinero.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_ZONA', type: 'integer' })
  zonaId!: number;

  @PrimaryColumn({ name: 'ID_JARDINERO', type: 'integer' })
  jardineroId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Zona, zona => zona.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ZONA' })
  zona!: Zona;

  @ManyToOne(() => Jardinero, jardinero => jardinero.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_JARDINERO' })
  jardinero!: Jardinero;
}
