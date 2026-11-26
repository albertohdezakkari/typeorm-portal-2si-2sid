import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorCultivadorService } from './service';

@Controller('cultivadores/:cultivadorId/asignaciones')
export class ListarPorCultivadorController {
  constructor(private readonly service: ListarPorCultivadorService) {}

  @Get()
  listar(@Param('cultivadorId') cultivadorId: string) {
    return this.service.listarAsignacionesPorCultivadorService(Number(cultivadorId));
  }
}
