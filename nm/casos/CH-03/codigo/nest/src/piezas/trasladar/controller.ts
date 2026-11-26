import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('piezas/:piezaId/museo')
  async ejecutar(@Param('piezaId', ParseIntPipe) piezaId: number,
    @Body() datos: { museoId: number }) {
    return this.service.trasladarPiezaService(piezaId, datos.museoId);
  }
}
