import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Pista } from '../pistas/entities/pista.entity';
import { Entrenador } from '../entrenadores/entities/entrenador.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>,
    @InjectRepository(Entrenador) private readonly entrenadores: Repository<Entrenador>
  ) {}

  async asignarEntrenador(pistaId: number, entrenadorId: number, rol: string) {
    const pista = await this.pistas.findOneBy({ id: pistaId });
    const entrenador = await this.entrenadores.findOneBy({ id: entrenadorId });
    if (!pista || !entrenador) {
      throw new NotFoundException('No existe la pista o el entrenador');
    }
    const asignacion = { pistaId, entrenadorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El entrenador ya está asignado a esa pista');
      }
      throw error;
    }
  }

  listarPorPista(pistaId: number) {
    return this.asignaciones.find({ where: { pistaId }, order: { entrenadorId: 'ASC' } });
  }

  listarPorEntrenador(entrenadorId: number) {
    return this.asignaciones.find({ where: { entrenadorId }, order: { pistaId: 'ASC' } });
  }

  async modificarRol(pistaId: number, entrenadorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ pistaId, entrenadorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { pistaId, entrenadorId, rol };
  }

  async eliminarAsignacion(pistaId: number, entrenadorId: number) {
    await this.asignaciones.delete({ pistaId, entrenadorId });
  }
}
