import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Editorial } from '../../editoriales/entities/editorial.entity';

@Entity({ name: 'PUBLICACION' })
export class Publicacion {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'PAGINAS', type: 'integer' })
  paginas!: number;

  @ManyToOne(() => Editorial, editorial => editorial.publicaciones, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_EDITORIAL' })
  editorial!: Editorial;
  @OneToMany(() => Asignacion, asignacion => asignacion.publicacion)
  asignaciones!: Asignacion[];
}
