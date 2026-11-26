import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('reservas/:reservaId/hotel')
  async ejecutar(@Param('reservaId', ParseIntPipe) reservaId: number,
    @Body() datos: { hotelId: number }) {
    return this.service.trasladarReservaService(reservaId, datos.hotelId);
  }
}
