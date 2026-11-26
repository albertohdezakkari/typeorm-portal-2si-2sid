import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Programa } from '../../programas/entities/programa.entity';

@Entity({ name: 'EMISORA' })
export class Emisora {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Programa, programa => programa.emisora)
  programas!: Programa[];
}
