import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Aula } from '../../aulas/entities/aula.entity';

@Entity({ name: 'ESCUELA' })
export class Escuela {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Aula, aula => aula.escuela)
  aulas!: Aula[];
}
