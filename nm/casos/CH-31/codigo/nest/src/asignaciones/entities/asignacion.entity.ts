import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Documento } from '../../documentos/entities/documento.entity';
import { Revisor } from '../../revisores/entities/revisor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_DOCUMENTO', type: 'integer' })
  documentoId!: number;

  @PrimaryColumn({ name: 'ID_REVISOR', type: 'integer' })
  revisorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Documento, documento => documento.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_DOCUMENTO' })
  documento!: Documento;

  @ManyToOne(() => Revisor, revisor => revisor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_REVISOR' })
  revisor!: Revisor;
}
