import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarPublicacionService(publicacionId: number, editorialId: number) {
    return this.repository.trasladarPublicacionRepository(publicacionId, editorialId);
  }
}
