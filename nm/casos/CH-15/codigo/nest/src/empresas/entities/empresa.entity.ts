import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity({ name: 'EMPRESA' })
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Proyecto, proyecto => proyecto.empresa)
  proyectos!: Proyecto[];
}
