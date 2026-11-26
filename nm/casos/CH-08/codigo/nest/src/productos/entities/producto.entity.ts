import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Panaderia } from '../../panaderias/entities/panaderia.entity';

@Entity({ name: 'PRODUCTO' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'PRECIO_CENTIMOS', type: 'integer' })
  precioCentimos!: number;

  @ManyToOne(() => Panaderia, panaderia => panaderia.productos, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_PANADERIA' })
  panaderia!: Panaderia;
  @OneToMany(() => Asignacion, asignacion => asignacion.producto)
  asignaciones!: Asignacion[];
}
