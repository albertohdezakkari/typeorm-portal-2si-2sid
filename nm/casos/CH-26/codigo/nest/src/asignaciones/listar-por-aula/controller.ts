import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorAulaService } from './service';

@Controller('aulas/:aulaId/asignaciones')
export class ListarPorAulaController {
  constructor(private readonly service: ListarPorAulaService) {}

  @Get()
  listar(@Param('aulaId') aulaId: string) {
    return this.service.listarAsignacionesPorAulaService(Number(aulaId));
  }
}
