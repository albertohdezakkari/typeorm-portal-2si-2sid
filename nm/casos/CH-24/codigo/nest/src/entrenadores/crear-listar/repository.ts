import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrenador } from '../entities/entrenador.entity';

@Injectable()
export class EntrenadoresRepository {
  constructor(
    @InjectRepository(Entrenador) private readonly entrenadores: Repository<Entrenador>
  ) {}

  crearEntrenadorRepository(nombre: string, apellidos: string, email: string) {
    const entrenador = this.entrenadores.create({ nombre, apellidos, email });
    return this.entrenadores.save(entrenador);
  }

  listarEntrenadoresRepository() {
    return this.entrenadores.find({ order: { id: 'ASC' } });
  }
}
