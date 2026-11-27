import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cultivador } from './entities/cultivador.entity';

@Injectable()
export class CultivadoresService {
  constructor(
    @InjectRepository(Cultivador) private readonly cultivadores: Repository<Cultivador>
  ) {}

  crearCultivador(nombre: string, apellidos: string, email: string) {
    const cultivador = this.cultivadores.create({ nombre, apellidos, email });
    return this.cultivadores.save(cultivador);
  }

  listarCultivadores() {
    return this.cultivadores.find({ order: { id: 'ASC' } });
  }
}
