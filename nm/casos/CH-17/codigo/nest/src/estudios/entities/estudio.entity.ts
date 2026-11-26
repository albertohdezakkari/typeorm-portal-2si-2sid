import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Escena } from '../../escenas/entities/escena.entity';

@Entity({ name: 'ESTUDIO' })
export class Estudio {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Escena, escena => escena.estudio)
  escenas!: Escena[];
}
