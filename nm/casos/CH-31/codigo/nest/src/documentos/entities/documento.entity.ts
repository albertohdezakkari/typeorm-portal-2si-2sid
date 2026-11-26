import {
  Column, Entity, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';
import { Archivo } from '../../archivos/entities/archivo.entity';

@Entity({ name: 'DOCUMENTO' })
export class Documento {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'PAGINAS', type: 'integer' })
  paginas!: number;

  @ManyToOne(() => Archivo, archivo => archivo.documentos, {
    nullable: false
  })
  @JoinColumn({ name: 'ID_ARCHIVO' })
  archivo!: Archivo;
  @OneToMany(() => Asignacion, asignacion => asignacion.documento)
  asignaciones!: Asignacion[];
}
