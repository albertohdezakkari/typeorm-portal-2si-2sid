import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Aula } from '../../aulas/entities/aula.entity';
import { Docente } from '../../docentes/entities/docente.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_AULA', type: 'integer' })
  aulaId!: number;

  @PrimaryColumn({ name: 'ID_DOCENTE', type: 'integer' })
  docenteId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Aula, aula => aula.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_AULA' })
  aula!: Aula;

  @ManyToOne(() => Docente, docente => docente.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_DOCENTE' })
  docente!: Docente;
}
