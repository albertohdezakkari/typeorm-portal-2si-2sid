import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Publicacion } from '../../publicaciones/entities/publicacion.entity';

@Entity({ name: 'EDITORIAL' })
export class Editorial {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Publicacion, publicacion => publicacion.editorial)
  publicaciones!: Publicacion[];
}
