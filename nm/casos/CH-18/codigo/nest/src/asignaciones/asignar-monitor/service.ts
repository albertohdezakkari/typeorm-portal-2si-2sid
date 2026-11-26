import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarMonitorRepository } from './repository';

@Injectable()
export class AsignarMonitorService {
  constructor(private readonly repository: AsignarMonitorRepository) {}

  async asignarMonitorService(actividadId: number, monitorId: number, rol: string) {
    const actividad = await this.repository.buscarActividadRepository(actividadId);
    const monitor = await this.repository.buscarMonitorRepository(monitorId);
    if (!actividad || !monitor) {
      throw new NotFoundException('No existe la actividad o el monitor');
    }

    try {
      return await this.repository.asignarMonitorRepository(actividadId, monitorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El monitor ya está asignado a esa actividad');
      }
      throw error;
    }
  }
}
