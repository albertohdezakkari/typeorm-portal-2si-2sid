import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Puerto } from '../../puertos/entities/puerto.entity';

@Entity({ name: 'EMBARCACION' })
export class Embarcacion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'ESLORA_METROS', type: 'integer' })
  esloraMetros!: number;

  @ManyToOne(() => Puerto, puerto => puerto.embarcaciones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_PUERTO' })
  puerto!: Puerto;
  @OneToMany(() => Asignacion, asignacion => asignacion.embarcacion)
  asignaciones!: Asignacion[];
}
