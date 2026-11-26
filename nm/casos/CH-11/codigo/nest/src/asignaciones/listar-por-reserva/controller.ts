import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorReservaService } from './service';

@Controller('reservas/:reservaId/asignaciones')
export class ListarPorReservaController {
  constructor(private readonly service: ListarPorReservaService) {}

  @Get()
  listar(@Param('reservaId') reservaId: string) {
    return this.service.listarAsignacionesPorReservaService(Number(reservaId));
  }
}
