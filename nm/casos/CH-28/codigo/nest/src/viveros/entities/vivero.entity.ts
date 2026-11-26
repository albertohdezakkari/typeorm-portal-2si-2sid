import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Planta } from '../../plantas/entities/planta.entity';

@Entity({ name: 'VIVERO' })
export class Vivero {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Planta, planta => planta.vivero)
  plantas!: Planta[];
}
