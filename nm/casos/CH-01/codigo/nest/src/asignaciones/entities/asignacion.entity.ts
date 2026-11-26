import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Animal } from '../../animales/entities/animal.entity';
import { Cuidador } from '../../cuidadores/entities/cuidador.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_ANIMAL', type: 'integer' })
  animalId!: number;

  @PrimaryColumn({ name: 'ID_CUIDADOR', type: 'integer' })
  cuidadorId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Animal, animal => animal.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_ANIMAL' })
  animal!: Animal;

  @ManyToOne(() => Cuidador, cuidador => cuidador.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_CUIDADOR' })
  cuidador!: Cuidador;
}
