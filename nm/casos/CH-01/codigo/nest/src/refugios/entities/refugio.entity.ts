import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Animal } from '../../animales/entities/animal.entity';

@Entity({ name: 'REFUGIO' })
export class Refugio {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Animal, animal => animal.refugio)
  animales!: Animal[];
}
