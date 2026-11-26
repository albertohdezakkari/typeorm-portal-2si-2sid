import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Refugio } from '../../refugios/entities/refugio.entity';

@Entity({ name: 'ANIMAL' })
export class Animal {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'EDAD_MESES', type: 'integer' })
  edadMeses!: number;

  @ManyToOne(() => Refugio, refugio => refugio.animales, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_REFUGIO' })
  refugio!: Refugio;
  @OneToMany(() => Asignacion, asignacion => asignacion.animal)
  asignaciones!: Asignacion[];
}
