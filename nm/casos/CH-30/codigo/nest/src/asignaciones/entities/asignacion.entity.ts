import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity';
import { Interprete } from '../../interpretes/entities/interprete.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_FUNCION', type: 'integer' })
  funcionId!: number;

  @PrimaryColumn({ name: 'ID_INTERPRETE', type: 'integer' })
  interpreteId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Funcion, funcion => funcion.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_FUNCION' })
  funcion!: Funcion;

  @ManyToOne(() => Interprete, interprete => interprete.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_INTERPRETE' })
  interprete!: Interprete;
}
