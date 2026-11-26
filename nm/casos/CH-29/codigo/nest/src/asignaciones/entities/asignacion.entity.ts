import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cosecha } from '../../cosechas/entities/cosecha.entity';
import { Agricultor } from '../../agricultores/entities/agricultor.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_COSECHA', type: 'integer' })
  cosechaId!: number;

  @PrimaryColumn({ name: 'ID_AGRICULTOR', type: 'integer' })
  agricultorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Cosecha, cosecha => cosecha.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_COSECHA' })
  cosecha!: Cosecha;

  @ManyToOne(() => Agricultor, agricultor => agricultor.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_AGRICULTOR' })
  agricultor!: Agricultor;
}
