import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Embarcacion } from '../../embarcaciones/entities/embarcacion.entity';
import { Tripulante } from '../../tripulantes/entities/tripulante.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_EMBARCACION', type: 'integer' })
  embarcacionId!: number;

  @PrimaryColumn({ name: 'ID_TRIPULANTE', type: 'integer' })
  tripulanteId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Embarcacion, embarcacion => embarcacion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_EMBARCACION' })
  embarcacion!: Embarcacion;

  @ManyToOne(() => Tripulante, tripulante => tripulante.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_TRIPULANTE' })
  tripulante!: Tripulante;
}
