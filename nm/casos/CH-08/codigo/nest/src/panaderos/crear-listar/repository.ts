import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Panadero } from '../entities/panadero.entity';

@Injectable()
export class PanaderosRepository {
  constructor(
    @InjectRepository(Panadero) private readonly panaderos: Repository<Panadero>
  ) {}

  crearPanaderoRepository(nombre: string, apellidos: string, email: string) {
    const panadero = this.panaderos.create({ nombre, apellidos, email });
    return this.panaderos.save(panadero);
  }

  listarPanaderosRepository() {
    return this.panaderos.find({ order: { id: 'ASC' } });
  }
}
