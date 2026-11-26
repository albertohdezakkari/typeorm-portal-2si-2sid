import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarConductorService } from './service';

@Controller('trayectos/:trayectoId/asignaciones')
export class AsignarConductorController {
  constructor(private readonly service: AsignarConductorService) {}

  @Post()
  asignar(@Param('trayectoId') trayectoId: string, @Body() datos: { conductorId: number; rol: string }) {
    return this.service.asignarConductorService(Number(trayectoId), datos.conductorId, datos.rol);
  }
}
