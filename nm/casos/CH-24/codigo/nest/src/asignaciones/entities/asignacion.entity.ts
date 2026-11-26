import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Pista } from '../../pistas/entities/pista.entity';
import { Entrenador } from '../../entrenadores/entities/entrenador.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PISTA', type: 'integer' })
  pistaId!: number;

  @PrimaryColumn({ name: 'ID_ENTRENADOR', type: 'integer' })
  entrenadorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Pista, pista => pista.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PISTA' })
  pista!: Pista;

  @ManyToOne(() => Entrenador, entrenador => entrenador.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ENTRENADOR' })
  entrenador!: Entrenador;
}
