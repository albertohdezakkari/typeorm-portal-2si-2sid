import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Excursion } from '../../excursiones/entities/excursion.entity';

@Entity({ name: 'AGENCIA' })
export class Agencia {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Excursion, excursion => excursion.agencia)
  excursiones!: Excursion[];
}
