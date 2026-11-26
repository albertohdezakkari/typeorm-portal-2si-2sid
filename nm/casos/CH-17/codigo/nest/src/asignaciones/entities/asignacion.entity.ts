import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Escena } from '../../escenas/entities/escena.entity';
import { Actor } from '../../actores/entities/actor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_ESCENA', type: 'integer' })
  escenaId!: number;

  @PrimaryColumn({ name: 'ID_ACTOR', type: 'integer' })
  actorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Escena, escena => escena.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ESCENA' })
  escena!: Escena;

  @ManyToOne(() => Actor, actor => actor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ACTOR' })
  actor!: Actor;
}
