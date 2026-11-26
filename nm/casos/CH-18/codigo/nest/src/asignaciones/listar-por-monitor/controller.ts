import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorMonitorService } from './service';

@Controller('monitores/:monitorId/asignaciones')
export class ListarPorMonitorController {
  constructor(private readonly service: ListarPorMonitorService) {}

  @Get()
  listar(@Param('monitorId') monitorId: string) {
    return this.service.listarAsignacionesPorMonitorService(Number(monitorId));
  }
}
