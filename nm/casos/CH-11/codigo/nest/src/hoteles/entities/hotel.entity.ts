import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity({ name: 'HOTEL' })
export class Hotel {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Reserva, reserva => reserva.hotel)
  reservas!: Reserva[];
}
