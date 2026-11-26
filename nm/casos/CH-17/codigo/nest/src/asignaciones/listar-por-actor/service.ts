import { Injectable } from '@nestjs/common';
import { ListarPorActorRepository } from './repository';

@Injectable()
export class ListarPorActorService {
  constructor(private readonly repository: ListarPorActorRepository) {}

  listarAsignacionesPorActorService(actorId: number) {
    return this.repository.listarAsignacionesPorActorRepository(actorId);
  }
}
