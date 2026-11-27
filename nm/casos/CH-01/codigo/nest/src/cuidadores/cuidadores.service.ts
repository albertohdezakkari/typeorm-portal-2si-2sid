import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuidador } from './entities/cuidador.entity';

@Injectable()
export class CuidadoresService {
  constructor(
    @InjectRepository(Cuidador) private readonly cuidadores: Repository<Cuidador>
  ) {}

  crearCuidador(nombre: string, apellidos: string, email: string) {
    const cuidador = this.cuidadores.create({ nombre, apellidos, email });
    return this.cuidadores.save(cuidador);
  }

  listarCuidadores() {
    return this.cuidadores.find({ order: { id: 'ASC' } });
  }
}
