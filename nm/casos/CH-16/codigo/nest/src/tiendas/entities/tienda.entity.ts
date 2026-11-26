import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Articulo } from '../../articulos/entities/articulo.entity';

@Entity({ name: 'TIENDA' })
export class Tienda {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Articulo, articulo => articulo.tienda)
  articulos!: Articulo[];
}
