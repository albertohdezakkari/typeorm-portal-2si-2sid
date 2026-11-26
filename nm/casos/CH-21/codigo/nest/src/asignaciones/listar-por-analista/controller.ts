import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorAnalistaService } from './service';

@Controller('analistas/:analistaId/asignaciones')
export class ListarPorAnalistaController {
  constructor(private readonly service: ListarPorAnalistaService) {}

  @Get()
  listar(@Param('analistaId') analistaId: string) {
    return this.service.listarAsignacionesPorAnalistaService(Number(analistaId));
  }
}
