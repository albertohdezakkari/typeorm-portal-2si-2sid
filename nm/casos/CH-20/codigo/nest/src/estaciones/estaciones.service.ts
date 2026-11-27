import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estacion } from './entities/estacion.entity';

@Injectable()
export class EstacionesService {
  constructor(
    @InjectRepository(Estacion) private readonly estaciones: Repository<Estacion>
  ) {}

  crearEstacion(nombre: string) {
    const estacion = this.estaciones.create({ nombre });
    return this.estaciones.save(estacion);
  }

  listarEstaciones() {
    return this.estaciones.find({ order: { id: 'ASC' } });
  }
}