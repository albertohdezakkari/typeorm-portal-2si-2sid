import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Pieza } from '../../piezas/entities/pieza.entity';

@Entity({ name: 'MUSEO' })
export class Museo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Pieza, pieza => pieza.museo)
  piezas!: Pieza[];
}
