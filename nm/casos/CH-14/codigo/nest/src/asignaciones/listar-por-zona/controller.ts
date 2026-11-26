import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorZonaService } from './service';

@Controller('zonas/:zonaId/asignaciones')
export class ListarPorZonaController {
  constructor(private readonly service: ListarPorZonaService) {}

  @Get()
  listar(@Param('zonaId') zonaId: string) {
    return this.service.listarAsignacionesPorZonaService(Number(zonaId));
  }
}
