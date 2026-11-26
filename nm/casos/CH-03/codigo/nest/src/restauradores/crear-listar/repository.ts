import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurador } from '../entities/restaurador.entity';

@Injectable()
export class RestauradoresRepository {
  constructor(
    @InjectRepository(Restaurador) private readonly restauradores: Repository<Restaurador>
  ) {}

  crearRestauradorRepository(nombre: string, apellidos: string, email: string) {
    const restaurador = this.restauradores.create({ nombre, apellidos, email });
    return this.restauradores.save(restaurador);
  }

  listarRestauradoresRepository() {
    return this.restauradores.find({ order: { id: 'ASC' } });
  }
}
