import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorEntrenadorService } from './service';

@Controller('entrenadores/:entrenadorId/asignaciones')
export class ListarPorEntrenadorController {
  constructor(private readonly service: ListarPorEntrenadorService) {}

  @Get()
  listar(@Param('entrenadorId') entrenadorId: string) {
    return this.service.listarAsignacionesPorEntrenadorService(Number(entrenadorId));
  }
}
