import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarMonitorService } from './service';

@Controller('actividades/:actividadId/asignaciones')
export class AsignarMonitorController {
  constructor(private readonly service: AsignarMonitorService) {}

  @Post()
  asignar(@Param('actividadId') actividadId: string, @Body() datos: { monitorId: number; rol: string }) {
    return this.service.asignarMonitorService(Number(actividadId), datos.monitorId, datos.rol);
  }
}
