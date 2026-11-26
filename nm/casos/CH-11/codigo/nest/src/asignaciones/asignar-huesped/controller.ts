import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarHuespedService } from './service';

@Controller('reservas/:reservaId/asignaciones')
export class AsignarHuespedController {
  constructor(private readonly service: AsignarHuespedService) {}

  @Post()
  asignar(@Param('reservaId') reservaId: string, @Body() datos: { huespedId: number; rol: string }) {
    return this.service.asignarHuespedService(Number(reservaId), datos.huespedId, datos.rol);
  }
}
