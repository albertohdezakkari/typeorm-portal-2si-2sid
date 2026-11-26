import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('reservas/:reservaId')
  @HttpCode(204)
  async ejecutar(@Param('reservaId', ParseIntPipe) reservaId: number) {
    return this.service.eliminarReservaService(reservaId);
  }
}
