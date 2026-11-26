import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Muestra } from '../../muestras/entities/muestra.entity';
import { Analista } from '../../analistas/entities/analista.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_MUESTRA', type: 'integer' })
  muestraId!: number;

  @PrimaryColumn({ name: 'ID_ANALISTA', type: 'integer' })
  analistaId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Muestra, muestra => muestra.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_MUESTRA' })
  muestra!: Muestra;

  @ManyToOne(() => Analista, analista => analista.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ANALISTA' })
  analista!: Analista;
}
