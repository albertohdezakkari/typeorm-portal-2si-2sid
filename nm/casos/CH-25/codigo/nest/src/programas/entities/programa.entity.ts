import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Emisora } from '../../emisoras/entities/emisora.entity';

@Entity({ name: 'PROGRAMA' })
export class Programa {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'DURACION_MINUTOS', type: 'integer' })
  duracionMinutos!: number;

  @ManyToOne(() => Emisora, emisora => emisora.programas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_EMISORA' })
  emisora!: Emisora;
  @OneToMany(() => Asignacion, asignacion => asignacion.programa)
  asignaciones!: Asignacion[];
}
