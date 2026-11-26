import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('comandas/:comandaId/cafeteria')
  async ejecutar(@Param('comandaId', ParseIntPipe) comandaId: number,
    @Body() datos: { cafeteriaId: number }) {
    return this.service.trasladarComandaService(comandaId, datos.cafeteriaId);
  }
}
