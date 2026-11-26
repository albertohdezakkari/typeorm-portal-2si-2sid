import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorRestauradorService } from './service';

@Controller('restauradores/:restauradorId/asignaciones')
export class ListarPorRestauradorController {
  constructor(private readonly service: ListarPorRestauradorService) {}

  @Get()
  listar(@Param('restauradorId') restauradorId: string) {
    return this.service.listarAsignacionesPorRestauradorService(Number(restauradorId));
  }
}
