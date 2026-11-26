import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarHabitacionService(habitacionId: number) {
    return this.repository.eliminarHabitacionRepository(habitacionId);
  }
}
