import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tripulante } from './entities/tripulante.entity';

@Injectable()
export class TripulantesService {
  constructor(
    @InjectRepository(Tripulante) private readonly tripulantes: Repository<Tripulante>
  ) {}

  crearTripulante(nombre: string, apellidos: string, email: string) {
    const tripulante = this.tripulantes.create({ nombre, apellidos, email });
    return this.tripulantes.save(tripulante);
  }

  listarTripulantes() {
    return this.tripulantes.find({ order: { id: 'ASC' } });
  }
}
