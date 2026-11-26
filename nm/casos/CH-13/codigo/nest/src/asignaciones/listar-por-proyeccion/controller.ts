import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorProyeccionService } from './service';

@Controller('proyecciones/:proyeccionId/asignaciones')
export class ListarPorProyeccionController {
  constructor(private readonly service: ListarPorProyeccionService) {}

  @Get()
  listar(@Param('proyeccionId') proyeccionId: string) {
    return this.service.listarAsignacionesPorProyeccionService(Number(proyeccionId));
  }
}
