import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';

@Entity({ name: 'AYUNTAMIENTO' })
export class Ayuntamiento {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Obra, obra => obra.ayuntamiento)
  obras!: Obra[];
}
