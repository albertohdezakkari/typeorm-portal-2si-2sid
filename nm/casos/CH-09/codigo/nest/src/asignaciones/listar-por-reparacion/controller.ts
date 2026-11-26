import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorReparacionService } from './service';

@Controller('reparaciones/:reparacionId/asignaciones')
export class ListarPorReparacionController {
  constructor(private readonly service: ListarPorReparacionService) {}

  @Get()
  listar(@Param('reparacionId') reparacionId: string) {
    return this.service.listarAsignacionesPorReparacionService(Number(reparacionId));
  }
}
