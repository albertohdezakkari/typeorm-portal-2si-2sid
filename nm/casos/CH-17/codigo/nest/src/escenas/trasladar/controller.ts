import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('escenas/:escenaId/estudio')
  async ejecutar(@Param('escenaId', ParseIntPipe) escenaId: number,
    @Body() datos: { estudioId: number }) {
    return this.service.trasladarEscenaService(escenaId, datos.estudioId);
  }
}
