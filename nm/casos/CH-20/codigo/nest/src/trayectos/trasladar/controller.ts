import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('trayectos/:trayectoId/estacion')
  async ejecutar(@Param('trayectoId', ParseIntPipe) trayectoId: number,
    @Body() datos: { estacionId: number }) {
    return this.service.trasladarTrayectoService(trayectoId, datos.estacionId);
  }
}
