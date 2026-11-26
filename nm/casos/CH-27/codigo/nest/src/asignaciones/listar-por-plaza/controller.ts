import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorPlazaService } from './service';

@Controller('plazas/:plazaId/asignaciones')
export class ListarPorPlazaController {
  constructor(private readonly service: ListarPorPlazaService) {}

  @Get()
  listar(@Param('plazaId') plazaId: string) {
    return this.service.listarAsignacionesPorPlazaService(Number(plazaId));
  }
}
