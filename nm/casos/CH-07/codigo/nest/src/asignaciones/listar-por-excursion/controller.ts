import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorExcursionService } from './service';

@Controller('excursiones/:excursionId/asignaciones')
export class ListarPorExcursionController {
  constructor(private readonly service: ListarPorExcursionService) {}

  @Get()
  listar(@Param('excursionId') excursionId: string) {
    return this.service.listarAsignacionesPorExcursionService(Number(excursionId));
  }
}
