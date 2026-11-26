import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('trayectos/:trayectoId/asignaciones/:conductorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('trayectoId') trayectoId: string, @Param('conductorId') conductorId: string) {
    return this.service.eliminarAsignacionService(Number(trayectoId), Number(conductorId));
  }
}
