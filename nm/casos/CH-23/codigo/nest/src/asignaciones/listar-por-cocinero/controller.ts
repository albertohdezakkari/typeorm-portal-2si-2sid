import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorCocineroService } from './service';

@Controller('cocineros/:cocineroId/asignaciones')
export class ListarPorCocineroController {
  constructor(private readonly service: ListarPorCocineroService) {}

  @Get()
  listar(@Param('cocineroId') cocineroId: string) {
    return this.service.listarAsignacionesPorCocineroService(Number(cocineroId));
  }
}
