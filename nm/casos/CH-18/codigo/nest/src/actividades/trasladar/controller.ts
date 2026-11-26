import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('actividades/:actividadId/club')
  async ejecutar(@Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() datos: { clubId: number }) {
    return this.service.trasladarActividadService(actividadId, datos.clubId);
  }
}
