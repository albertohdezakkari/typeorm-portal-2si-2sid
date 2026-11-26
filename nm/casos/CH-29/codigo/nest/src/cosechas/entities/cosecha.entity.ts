import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Granja } from '../../granjas/entities/granja.entity';

@Entity({ name: 'COSECHA' })
export class Cosecha {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'KILOS', type: 'integer' })
  kilos!: number;

  @ManyToOne(() => Granja, granja => granja.cosechas, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_GRANJA' })
  granja!: Granja;
  @OneToMany(() => Asignacion, asignacion => asignacion.cosecha)
  asignaciones!: Asignacion[];
}
