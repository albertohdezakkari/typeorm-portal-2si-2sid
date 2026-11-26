import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Comanda } from '../../comandas/entities/comanda.entity';

@Entity({ name: 'CAFETERIA' })
export class Cafeteria {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Comanda, comanda => comanda.cafeteria)
  comandas!: Comanda[];
}
