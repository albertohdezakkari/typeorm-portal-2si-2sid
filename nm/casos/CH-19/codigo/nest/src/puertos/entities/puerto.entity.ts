import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Embarcacion } from '../../embarcaciones/entities/embarcacion.entity';

@Entity({ name: 'PUERTO' })
export class Puerto {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Embarcacion, embarcacion => embarcacion.puerto)
  embarcaciones!: Embarcacion[];
}
