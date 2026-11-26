import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Tienda } from '../../tiendas/entities/tienda.entity';

@Entity({ name: 'ARTICULO' })
export class Articulo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'STOCK', type: 'integer' })
  stock!: number;

  @ManyToOne(() => Tienda, tienda => tienda.articulos, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_TIENDA' })
  tienda!: Tienda;
  @OneToMany(() => Asignacion, asignacion => asignacion.articulo)
  asignaciones!: Asignacion[];
}
