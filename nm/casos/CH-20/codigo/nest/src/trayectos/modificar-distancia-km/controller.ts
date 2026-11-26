import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarDistanciaKmService } from './service';

@Controller()
export class ModificarDistanciaKmController {
  constructor(private readonly service: ModificarDistanciaKmService) {}

  @Patch('trayectos/:trayectoId')
  async ejecutar(@Param('trayectoId', ParseIntPipe) trayectoId: number,
    @Body() datos: { distanciaKm: number }) {
    return this.service.modificarDistanciaKmService(trayectoId, datos.distanciaKm);
  }
}
