import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Plaza } from '../../plazas/entities/plaza.entity';
import { Tecnico } from '../../tecnicos/entities/tecnico.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PLAZA', type: 'integer' })
  plazaId!: number;

  @PrimaryColumn({ name: 'ID_TECNICO', type: 'integer' })
  tecnicoId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Plaza, plaza => plaza.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PLAZA' })
  plaza!: Plaza;

  @ManyToOne(() => Tecnico, tecnico => tecnico.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_TECNICO' })
  tecnico!: Tecnico;
}
