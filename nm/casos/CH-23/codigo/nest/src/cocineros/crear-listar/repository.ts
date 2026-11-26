import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cocinero } from '../entities/cocinero.entity';

@Injectable()
export class CocinerosRepository {
  constructor(
    @InjectRepository(Cocinero) private readonly cocineros: Repository<Cocinero>
  ) {}

  crearCocineroRepository(nombre: string, apellidos: string, email: string) {
    const cocinero = this.cocineros.create({ nombre, apellidos, email });
    return this.cocineros.save(cocinero);
  }

  listarCocinerosRepository() {
    return this.cocineros.find({ order: { id: 'ASC' } });
  }
}
