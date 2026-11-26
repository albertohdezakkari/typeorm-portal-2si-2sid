import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorInspectorService } from './service';

@Controller('inspectores/:inspectorId/asignaciones')
export class ListarPorInspectorController {
  constructor(private readonly service: ListarPorInspectorService) {}

  @Get()
  listar(@Param('inspectorId') inspectorId: string) {
    return this.service.listarAsignacionesPorInspectorService(Number(inspectorId));
  }
}
