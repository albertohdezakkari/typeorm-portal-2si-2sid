import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorCosechaService } from './service';

@Controller('cosechas/:cosechaId/asignaciones')
export class ListarPorCosechaController {
  constructor(private readonly service: ListarPorCosechaService) {}

  @Get()
  listar(@Param('cosechaId') cosechaId: string) {
    return this.service.listarAsignacionesPorCosechaService(Number(cosechaId));
  }
}
