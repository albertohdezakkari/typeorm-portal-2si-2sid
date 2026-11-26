import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('pistas/:pistaId/complejo')
  async ejecutar(@Param('pistaId', ParseIntPipe) pistaId: number,
    @Body() datos: { complejoId: number }) {
    return this.service.trasladarPistaService(pistaId, datos.complejoId);
  }
}
