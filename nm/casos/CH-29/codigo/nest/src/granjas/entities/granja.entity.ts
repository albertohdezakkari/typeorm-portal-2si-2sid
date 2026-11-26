import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Cosecha } from '../../cosechas/entities/cosecha.entity';

@Entity({ name: 'GRANJA' })
export class Granja {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Cosecha, cosecha => cosecha.granja)
  cosechas!: Cosecha[];
}
