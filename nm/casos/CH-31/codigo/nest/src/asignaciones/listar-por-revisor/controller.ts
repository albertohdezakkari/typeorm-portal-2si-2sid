import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorRevisorService } from './service';

@Controller('revisores/:revisorId/asignaciones')
export class ListarPorRevisorController {
  constructor(private readonly service: ListarPorRevisorService) {}

  @Get()
  listar(@Param('revisorId') revisorId: string) {
    return this.service.listarAsignacionesPorRevisorService(Number(revisorId));
  }
}
