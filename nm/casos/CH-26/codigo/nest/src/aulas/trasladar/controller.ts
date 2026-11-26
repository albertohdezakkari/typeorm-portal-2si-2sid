import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('aulas/:aulaId/escuela')
  async ejecutar(@Param('aulaId', ParseIntPipe) aulaId: number,
    @Body() datos: { escuelaId: number }) {
    return this.service.trasladarAulaService(aulaId, datos.escuelaId);
  }
}
