import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarProgramaService(programaId: number) {
    return this.repository.eliminarProgramaRepository(programaId);
  }
}
