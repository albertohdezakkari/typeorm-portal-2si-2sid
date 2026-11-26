import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Pieza } from '../../piezas/entities/pieza.entity';
import { Restaurador } from '../../restauradores/entities/restaurador.entity';

@Injectable()
export class AsignarRestauradorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>,
    @InjectRepository(Restaurador) private readonly restauradores: Repository<Restaurador>
  ) {}

  buscarPiezaRepository(piezaId: number) {
    return this.piezas.findOneBy({ id: piezaId });
  }

  buscarRestauradorRepository(restauradorId: number) {
    return this.restauradores.findOneBy({ id: restauradorId });
  }

  async asignarRestauradorRepository(piezaId: number, restauradorId: number, rol: string) {
    const asignacion = { piezaId, restauradorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
