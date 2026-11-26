import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorCuidadorService } from './service';

@Controller('cuidadores/:cuidadorId/asignaciones')
export class ListarPorCuidadorController {
  constructor(private readonly service: ListarPorCuidadorService) {}

  @Get()
  listar(@Param('cuidadorId') cuidadorId: string) {
    return this.service.listarAsignacionesPorCuidadorService(Number(cuidadorId));
  }
}
