import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarReparacionService(reparacionId: number, tallerId: number) {
    return this.repository.trasladarReparacionRepository(reparacionId, tallerId);
  }
}
