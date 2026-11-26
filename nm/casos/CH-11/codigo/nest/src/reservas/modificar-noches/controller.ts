import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarNochesService } from './service';

@Controller()
export class ModificarNochesController {
  constructor(private readonly service: ModificarNochesService) {}

  @Patch('reservas/:reservaId')
  async ejecutar(@Param('reservaId', ParseIntPipe) reservaId: number,
    @Body() datos: { noches: number }) {
    return this.service.modificarNochesService(reservaId, datos.noches);
  }
}
