import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Ayuntamiento } from '../../ayuntamientos/entities/ayuntamiento.entity';

@Entity({ name: 'OBRA' })
export class Obra {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'PRESUPUESTO_EUROS', type: 'integer' })
  presupuestoEuros!: number;

  @ManyToOne(() => Ayuntamiento, ayuntamiento => ayuntamiento.obras, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_AYUNTAMIENTO' })
  ayuntamiento!: Ayuntamiento;
  @OneToMany(() => Asignacion, asignacion => asignacion.obra)
  asignaciones!: Asignacion[];
}
