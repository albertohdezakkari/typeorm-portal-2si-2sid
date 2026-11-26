import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarHabitacionService(habitacionId: number, hospitalId: number) {
    return this.repository.trasladarHabitacionRepository(habitacionId, hospitalId);
  }
}
