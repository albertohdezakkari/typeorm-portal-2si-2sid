import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorProyectoService } from './service';

@Controller('proyectos/:proyectoId/asignaciones')
export class ListarPorProyectoController {
  constructor(private readonly service: ListarPorProyectoService) {}

  @Get()
  listar(@Param('proyectoId') proyectoId: string) {
    return this.service.listarAsignacionesPorProyectoService(Number(proyectoId));
  }
}
