import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorColaboradorService } from './service';

@Controller('colaboradores/:colaboradorId/asignaciones')
export class ListarPorColaboradorController {
  constructor(private readonly service: ListarPorColaboradorService) {}

  @Get()
  listar(@Param('colaboradorId') colaboradorId: string) {
    return this.service.listarAsignacionesPorColaboradorService(Number(colaboradorId));
  }
}
