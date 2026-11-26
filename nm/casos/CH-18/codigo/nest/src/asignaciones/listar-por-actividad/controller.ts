import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorActividadService } from './service';

@Controller('actividades/:actividadId/asignaciones')
export class ListarPorActividadController {
  constructor(private readonly service: ListarPorActividadService) {}

  @Get()
  listar(@Param('actividadId') actividadId: string) {
    return this.service.listarAsignacionesPorActividadService(Number(actividadId));
  }
}
