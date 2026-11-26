import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarProgramaService(programaId: number, emisoraId: number) {
    return this.repository.trasladarProgramaRepository(programaId, emisoraId);
  }
}
