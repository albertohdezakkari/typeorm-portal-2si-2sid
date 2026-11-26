import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Muestra } from '../../muestras/entities/muestra.entity';

@Entity({ name: 'LABORATORIO' })
export class Laboratorio {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Muestra, muestra => muestra.laboratorio)
  muestras!: Muestra[];
}
