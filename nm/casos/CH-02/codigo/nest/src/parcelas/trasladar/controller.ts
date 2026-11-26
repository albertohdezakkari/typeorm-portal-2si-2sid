import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('parcelas/:parcelaId/huerto')
  async ejecutar(@Param('parcelaId', ParseIntPipe) parcelaId: number,
    @Body() datos: { huertoId: number }) {
    return this.service.trasladarParcelaService(parcelaId, datos.huertoId);
  }
}
