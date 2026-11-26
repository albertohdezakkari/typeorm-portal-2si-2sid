import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity({ name: 'COOPERATIVA' })
export class Cooperativa {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Lote, lote => lote.cooperativa)
  lotes!: Lote[];
}
