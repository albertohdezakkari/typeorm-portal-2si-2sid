import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Panadero } from '../../panaderos/entities/panadero.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PRODUCTO', type: 'integer' })
  productoId!: number;

  @PrimaryColumn({ name: 'ID_PANADERO', type: 'integer' })
  panaderoId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Producto, producto => producto.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PRODUCTO' })
  producto!: Producto;

  @ManyToOne(() => Panadero, panadero => panadero.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PANADERO' })
  panadero!: Panadero;
}
