import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorEmbarcacionService } from './service';

@Controller('embarcaciones/:embarcacionId/asignaciones')
export class ListarPorEmbarcacionController {
  constructor(private readonly service: ListarPorEmbarcacionService) {}

  @Get()
  listar(@Param('embarcacionId') embarcacionId: string) {
    return this.service.listarAsignacionesPorEmbarcacionService(Number(embarcacionId));
  }
}
