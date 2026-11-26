import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Articulo } from '../../articulos/entities/articulo.entity';
import { Vendedor } from '../../vendedores/entities/vendedor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_ARTICULO', type: 'integer' })
  articuloId!: number;

  @PrimaryColumn({ name: 'ID_VENDEDOR', type: 'integer' })
  vendedorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Articulo, articulo => articulo.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ARTICULO' })
  articulo!: Articulo;

  @ManyToOne(() => Vendedor, vendedor => vendedor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_VENDEDOR' })
  vendedor!: Vendedor;
}
