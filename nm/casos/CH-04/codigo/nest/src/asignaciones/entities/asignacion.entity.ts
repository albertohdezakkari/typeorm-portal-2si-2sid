import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Publicacion } from '../../publicaciones/entities/publicacion.entity';
import { Autor } from '../../autores/entities/autor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PUBLICACION', type: 'integer' })
  publicacionId!: number;

  @PrimaryColumn({ name: 'ID_AUTOR', type: 'integer' })
  autorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Publicacion, publicacion => publicacion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PUBLICACION' })
  publicacion!: Publicacion;

  @ManyToOne(() => Autor, autor => autor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_AUTOR' })
  autor!: Autor;
}
