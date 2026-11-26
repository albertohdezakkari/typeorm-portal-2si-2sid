import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('lotes/:loteId/cooperativa')
  async ejecutar(@Param('loteId', ParseIntPipe) loteId: number,
    @Body() datos: { cooperativaId: number }) {
    return this.service.trasladarLoteService(loteId, datos.cooperativaId);
  }
}
