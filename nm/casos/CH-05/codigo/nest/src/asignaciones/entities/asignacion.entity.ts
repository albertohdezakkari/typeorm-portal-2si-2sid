import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Actuacion } from '../../actuaciones/entities/actuacion.entity';
import { Artista } from '../../artistas/entities/artista.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_ACTUACION', type: 'integer' })
  actuacionId!: number;

  @PrimaryColumn({ name: 'ID_ARTISTA', type: 'integer' })
  artistaId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Actuacion, actuacion => actuacion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ACTUACION' })
  actuacion!: Actuacion;

  @ManyToOne(() => Artista, artista => artista.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ARTISTA' })
  artista!: Artista;
}
