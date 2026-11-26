import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Huerto } from '../../huertos/entities/huerto.entity';

@Entity({ name: 'PARCELA' })
export class Parcela {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'SUPERFICIE_M2', type: 'integer' })
  superficieM2!: number;

  @ManyToOne(() => Huerto, huerto => huerto.parcelas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_HUERTO' })
  huerto!: Huerto;
  @OneToMany(() => Asignacion, asignacion => asignacion.parcela)
  asignaciones!: Asignacion[];
}
