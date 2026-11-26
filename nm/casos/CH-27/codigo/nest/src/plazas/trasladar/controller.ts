import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('plazas/:plazaId/urbanizacion')
  async ejecutar(@Param('plazaId', ParseIntPipe) plazaId: number,
    @Body() datos: { urbanizacionId: number }) {
    return this.service.trasladarPlazaService(plazaId, datos.urbanizacionId);
  }
}
