import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Hotel } from '../../hoteles/entities/hotel.entity';

@Entity({ name: 'RESERVA' })
export class Reserva {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'NOCHES', type: 'integer' })
  noches!: number;

  @ManyToOne(() => Hotel, hotel => hotel.reservas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_HOTEL' })
  hotel!: Hotel;
  @OneToMany(() => Asignacion, asignacion => asignacion.reserva)
  asignaciones!: Asignacion[];
}
