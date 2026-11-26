import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('embarcaciones/:embarcacionId/puerto')
  async ejecutar(@Param('embarcacionId', ParseIntPipe) embarcacionId: number,
    @Body() datos: { puertoId: number }) {
    return this.service.trasladarEmbarcacionService(embarcacionId, datos.puertoId);
  }
}
