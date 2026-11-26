import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Huesped } from '../../huespedes/entities/huesped.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_RESERVA', type: 'integer' })
  reservaId!: number;

  @PrimaryColumn({ name: 'ID_HUESPED', type: 'integer' })
  huespedId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Reserva, reserva => reserva.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_RESERVA' })
  reserva!: Reserva;

  @ManyToOne(() => Huesped, huesped => huesped.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_HUESPED' })
  huesped!: Huesped;
}
