import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Pista } from '../../pistas/entities/pista.entity';
import { Entrenador } from '../../entrenadores/entities/entrenador.entity';

@Injectable()
export class AsignarEntrenadorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>,
    @InjectRepository(Entrenador) private readonly entrenadores: Repository<Entrenador>
  ) {}

  buscarPistaRepository(pistaId: number) {
    return this.pistas.findOneBy({ id: pistaId });
  }

  buscarEntrenadorRepository(entrenadorId: number) {
    return this.entrenadores.findOneBy({ id: entrenadorId });
  }

  async asignarEntrenadorRepository(pistaId: number, entrenadorId: number, rol: string) {
    const asignacion = { pistaId, entrenadorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
