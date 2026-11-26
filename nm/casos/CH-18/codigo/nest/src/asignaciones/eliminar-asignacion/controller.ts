import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('actividades/:actividadId/asignaciones/:monitorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('actividadId') actividadId: string, @Param('monitorId') monitorId: string) {
    return this.service.eliminarAsignacionService(Number(actividadId), Number(monitorId));
  }
}
