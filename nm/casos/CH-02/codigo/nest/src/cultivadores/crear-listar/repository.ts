import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cultivador } from '../entities/cultivador.entity';

@Injectable()
export class CultivadoresRepository {
  constructor(
    @InjectRepository(Cultivador) private readonly cultivadores: Repository<Cultivador>
  ) {}

  crearCultivadorRepository(nombre: string, apellidos: string, email: string) {
    const cultivador = this.cultivadores.create({ nombre, apellidos, email });
    return this.cultivadores.save(cultivador);
  }

  listarCultivadoresRepository() {
    return this.cultivadores.find({ order: { id: 'ASC' } });
  }
}
