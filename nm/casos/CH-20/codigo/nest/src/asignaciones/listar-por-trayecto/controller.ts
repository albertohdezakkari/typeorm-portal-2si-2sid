import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorTrayectoService } from './service';

@Controller('trayectos/:trayectoId/asignaciones')
export class ListarPorTrayectoController {
  constructor(private readonly service: ListarPorTrayectoService) {}

  @Get()
  listar(@Param('trayectoId') trayectoId: string) {
    return this.service.listarAsignacionesPorTrayectoService(Number(trayectoId));
  }
}
