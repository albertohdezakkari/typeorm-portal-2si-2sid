import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorConductorService } from './service';

@Controller('conductores/:conductorId/asignaciones')
export class ListarPorConductorController {
  constructor(private readonly service: ListarPorConductorService) {}

  @Get()
  listar(@Param('conductorId') conductorId: string) {
    return this.service.listarAsignacionesPorConductorService(Number(conductorId));
  }
}
