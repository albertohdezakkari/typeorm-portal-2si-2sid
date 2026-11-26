import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Parcela } from '../../parcelas/entities/parcela.entity';

@Entity({ name: 'HUERTO' })
export class Huerto {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @OneToMany(() => Parcela, parcela => parcela.huerto)
  parcelas!: Parcela[];
}
