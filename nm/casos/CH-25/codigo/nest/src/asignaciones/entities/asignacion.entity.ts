import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Programa } from '../../programas/entities/programa.entity';
import { Locutor } from '../../locutores/entities/locutor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PROGRAMA', type: 'integer' })
  programaId!: number;

  @PrimaryColumn({ name: 'ID_LOCUTOR', type: 'integer' })
  locutorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Programa, programa => programa.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PROGRAMA' })
  programa!: Programa;

  @ManyToOne(() => Locutor, locutor => locutor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_LOCUTOR' })
  locutor!: Locutor;
}
