import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity({ name: 'PANADERIA' })
export class Panaderia {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Producto, producto => producto.panaderia)
  productos!: Producto[];
}
