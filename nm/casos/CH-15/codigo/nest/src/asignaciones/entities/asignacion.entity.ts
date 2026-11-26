import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Colaborador } from '../../colaboradores/entities/colaborador.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PROYECTO', type: 'integer' })
  proyectoId!: number;

  @PrimaryColumn({ name: 'ID_COLABORADOR', type: 'integer' })
  colaboradorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Proyecto, proyecto => proyecto.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PROYECTO' })
  proyecto!: Proyecto;

  @ManyToOne(() => Colaborador, colaborador => colaborador.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_COLABORADOR' })
  colaborador!: Colaborador;
}
