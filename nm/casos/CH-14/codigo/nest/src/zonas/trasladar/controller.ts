import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('zonas/:zonaId/parque')
  async ejecutar(@Param('zonaId', ParseIntPipe) zonaId: number,
    @Body() datos: { parqueId: number }) {
    return this.service.trasladarZonaService(zonaId, datos.parqueId);
  }
}
