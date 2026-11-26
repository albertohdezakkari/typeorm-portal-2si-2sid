import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarPublicacionService(publicacionId: number) {
    return this.repository.eliminarPublicacionRepository(publicacionId);
  }
}
