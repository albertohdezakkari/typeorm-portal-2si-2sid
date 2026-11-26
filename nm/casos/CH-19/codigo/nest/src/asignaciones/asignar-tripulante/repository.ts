import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Embarcacion } from '../../embarcaciones/entities/embarcacion.entity';
import { Tripulante } from '../../tripulantes/entities/tripulante.entity';

@Injectable()
export class AsignarTripulanteRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>,
    @InjectRepository(Tripulante) private readonly tripulantes: Repository<Tripulante>
  ) {}

  buscarEmbarcacionRepository(embarcacionId: number) {
    return this.embarcaciones.findOneBy({ id: embarcacionId });
  }

  buscarTripulanteRepository(tripulanteId: number) {
    return this.tripulantes.findOneBy({ id: tripulanteId });
  }

  async asignarTripulanteRepository(embarcacionId: number, tripulanteId: number, rol: string) {
    const asignacion = { embarcacionId, tripulanteId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
