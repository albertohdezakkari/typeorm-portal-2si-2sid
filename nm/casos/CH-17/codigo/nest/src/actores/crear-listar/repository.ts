import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';

@Injectable()
export class ActoresRepository {
  constructor(
    @InjectRepository(Actor) private readonly actores: Repository<Actor>
  ) {}

  crearActorRepository(nombre: string, apellidos: string, email: string) {
    const actor = this.actores.create({ nombre, apellidos, email });
    return this.actores.save(actor);
  }

  listarActoresRepository() {
    return this.actores.find({ order: { id: 'ASC' } });
  }
}
