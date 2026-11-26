import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Proyeccion } from '../../proyecciones/entities/proyeccion.entity';
import { Tecnico } from '../../tecnicos/entities/tecnico.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PROYECCION', type: 'integer' })
  proyeccionId!: number;

  @PrimaryColumn({ name: 'ID_TECNICO', type: 'integer' })
  tecnicoId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Proyeccion, proyeccion => proyeccion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PROYECCION' })
  proyeccion!: Proyeccion;

  @ManyToOne(() => Tecnico, tecnico => tecnico.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_TECNICO' })
  tecnico!: Tecnico;
}
