import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarActividadService(actividadId: number, clubId: number) {
    return this.repository.trasladarActividadRepository(actividadId, clubId);
  }
}
