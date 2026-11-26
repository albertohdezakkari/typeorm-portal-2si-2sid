import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Escena } from '../../escenas/entities/escena.entity';
import { Actor } from '../../actores/entities/actor.entity';

@Injectable()
export class AsignarActorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>,
    @InjectRepository(Actor) private readonly actores: Repository<Actor>
  ) {}

  buscarEscenaRepository(escenaId: number) {
    return this.escenas.findOneBy({ id: escenaId });
  }

  buscarActorRepository(actorId: number) {
    return this.actores.findOneBy({ id: actorId });
  }

  async asignarActorRepository(escenaId: number, actorId: number, rol: string) {
    const asignacion = { escenaId, actorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
