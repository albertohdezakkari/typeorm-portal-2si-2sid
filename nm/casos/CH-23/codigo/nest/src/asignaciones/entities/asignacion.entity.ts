import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Comanda } from '../../comandas/entities/comanda.entity';
import { Cocinero } from '../../cocineros/entities/cocinero.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_COMANDA', type: 'integer' })
  comandaId!: number;

  @PrimaryColumn({ name: 'ID_COCINERO', type: 'integer' })
  cocineroId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Comanda, comanda => comanda.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_COMANDA' })
  comanda!: Comanda;

  @ManyToOne(() => Cocinero, cocinero => cocinero.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_COCINERO' })
  cocinero!: Cocinero;
}
