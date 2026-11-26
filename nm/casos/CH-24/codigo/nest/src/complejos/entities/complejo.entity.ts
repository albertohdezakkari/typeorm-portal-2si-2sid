import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Pista } from '../../pistas/entities/pista.entity';

@Entity({ name: 'COMPLEJO' })
export class Complejo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Pista, pista => pista.complejo)
  pistas!: Pista[];
}
