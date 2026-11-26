import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorJardineroService } from './service';

@Controller('jardineros/:jardineroId/asignaciones')
export class ListarPorJardineroController {
  constructor(private readonly service: ListarPorJardineroService) {}

  @Get()
  listar(@Param('jardineroId') jardineroId: string) {
    return this.service.listarAsignacionesPorJardineroService(Number(jardineroId));
  }
}
