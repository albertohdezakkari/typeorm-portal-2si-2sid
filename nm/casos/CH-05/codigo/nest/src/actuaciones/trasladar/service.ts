import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarActuacionService(actuacionId: number, festivalId: number) {
    return this.repository.trasladarActuacionRepository(actuacionId, festivalId);
  }
}
