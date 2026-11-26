import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Cooperativa } from '../../cooperativas/entities/cooperativa.entity';

@Entity({ name: 'LOTE' })
export class Lote {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'KILOS', type: 'integer' })
  kilos!: number;

  @ManyToOne(() => Cooperativa, cooperativa => cooperativa.lotes, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_COOPERATIVA' })
  cooperativa!: Cooperativa;
  @OneToMany(() => Asignacion, asignacion => asignacion.lote)
  asignaciones!: Asignacion[];
}
