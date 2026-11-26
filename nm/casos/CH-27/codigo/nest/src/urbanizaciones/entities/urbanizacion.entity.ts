import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Plaza } from '../../plazas/entities/plaza.entity';

@Entity({ name: 'URBANIZACION' })
export class Urbanizacion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Plaza, plaza => plaza.urbanizacion)
  plazas!: Plaza[];
}
