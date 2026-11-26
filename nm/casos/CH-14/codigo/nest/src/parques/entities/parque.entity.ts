import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Zona } from '../../zonas/entities/zona.entity';

@Entity({ name: 'PARQUE' })
export class Parque {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Zona, zona => zona.parque)
  zonas!: Zona[];
}
