import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Embarcacion } from '../embarcaciones/entities/embarcacion.entity';
import { Tripulante } from '../tripulantes/entities/tripulante.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>,
    @InjectRepository(Tripulante) private readonly tripulantes: Repository<Tripulante>
  ) {}

  async asignarTripulante(embarcacionId: number, tripulanteId: number, rol: string) {
    const embarcacion = await this.embarcaciones.findOneBy({ id: embarcacionId });
    const tripulante = await this.tripulantes.findOneBy({ id: tripulanteId });
    if (!embarcacion || !tripulante) {
      throw new NotFoundException('No existe la embarcacion o el tripulante');
    }
    const asignacion = { embarcacionId, tripulanteId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El tripulante ya está asignado a esa embarcacion');
      }
      throw error;
    }
  }

  listarPorEmbarcacion(embarcacionId: number) {
    return this.asignaciones.find({ where: { embarcacionId }, order: { tripulanteId: 'ASC' } });
  }

  listarPorTripulante(tripulanteId: number) {
    return this.asignaciones.find({ where: { tripulanteId }, order: { embarcacionId: 'ASC' } });
  }

  async modificarRol(embarcacionId: number, tripulanteId: number, rol: string) {
    const resultado = await this.asignaciones.update({ embarcacionId, tripulanteId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { embarcacionId, tripulanteId, rol };
  }

  async eliminarAsignacion(embarcacionId: number, tripulanteId: number) {
    await this.asignaciones.delete({ embarcacionId, tripulanteId });
  }
}
