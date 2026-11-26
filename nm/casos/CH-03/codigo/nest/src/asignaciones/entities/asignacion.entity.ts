import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Pieza } from '../../piezas/entities/pieza.entity';
import { Restaurador } from '../../restauradores/entities/restaurador.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PIEZA', type: 'integer' })
  piezaId!: number;

  @PrimaryColumn({ name: 'ID_RESTAURADOR', type: 'integer' })
  restauradorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Pieza, pieza => pieza.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PIEZA' })
  pieza!: Pieza;

  @ManyToOne(() => Restaurador, restaurador => restaurador.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_RESTAURADOR' })
  restaurador!: Restaurador;
}
