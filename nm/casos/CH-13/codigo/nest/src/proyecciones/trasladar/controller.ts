import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('proyecciones/:proyeccionId/cine')
  async ejecutar(@Param('proyeccionId', ParseIntPipe) proyeccionId: number,
    @Body() datos: { cineId: number }) {
    return this.service.trasladarProyeccionService(proyeccionId, datos.cineId);
  }
}
