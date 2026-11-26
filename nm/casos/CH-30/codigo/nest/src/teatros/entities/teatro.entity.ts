import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity';

@Entity({ name: 'TEATRO' })
export class Teatro {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Funcion, funcion => funcion.teatro)
  funciones!: Funcion[];
}
