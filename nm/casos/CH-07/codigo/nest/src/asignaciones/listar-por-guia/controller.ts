import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorGuiaService } from './service';

@Controller('guias/:guiaId/asignaciones')
export class ListarPorGuiaController {
  constructor(private readonly service: ListarPorGuiaService) {}

  @Get()
  listar(@Param('guiaId') guiaId: string) {
    return this.service.listarAsignacionesPorGuiaService(Number(guiaId));
  }
}
