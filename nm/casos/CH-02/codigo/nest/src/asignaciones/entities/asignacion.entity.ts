import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Parcela } from '../../parcelas/entities/parcela.entity';
import { Cultivador } from '../../cultivadores/entities/cultivador.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_PARCELA', type: 'integer' })
  parcelaId!: number;

  @PrimaryColumn({ name: 'ID_CULTIVADOR', type: 'integer' })
  cultivadorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Parcela, parcela => parcela.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PARCELA' })
  parcela!: Parcela;

  @ManyToOne(() => Cultivador, cultivador => cultivador.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_CULTIVADOR' })
  cultivador!: Cultivador;
}
