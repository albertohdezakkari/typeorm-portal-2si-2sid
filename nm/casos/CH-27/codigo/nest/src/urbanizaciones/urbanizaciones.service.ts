import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Urbanizacion } from './entities/urbanizacion.entity';

@Injectable()
export class UrbanizacionesService {
  constructor(
    @InjectRepository(Urbanizacion) private readonly urbanizaciones: Repository<Urbanizacion>
  ) {}

  crearUrbanizacion(nombre: string) {
    const urbanizacion = this.urbanizaciones.create({ nombre });
    return this.urbanizaciones.save(urbanizacion);
  }

  listarUrbanizaciones() {
    return this.urbanizaciones.find({ order: { id: 'ASC' } });
  }
}