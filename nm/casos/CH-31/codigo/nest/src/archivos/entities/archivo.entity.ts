import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Documento } from '../../documentos/entities/documento.entity';

@Entity({ name: 'ARCHIVO' })
export class Archivo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Documento, documento => documento.archivo)
  documentos!: Documento[];
}
