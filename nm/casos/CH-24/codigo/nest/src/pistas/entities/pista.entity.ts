import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Complejo } from '../../complejos/entities/complejo.entity';

@Entity({ name: 'PISTA' })
export class Pista {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'SUPERFICIE_M2', type: 'integer' })
  superficieM2!: number;

  @ManyToOne(() => Complejo, complejo => complejo.pistas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_COMPLEJO' })
  complejo!: Complejo;
  @OneToMany(() => Asignacion, asignacion => asignacion.pista)
  asignaciones!: Asignacion[];
}
