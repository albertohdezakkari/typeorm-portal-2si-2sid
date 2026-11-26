import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorEnfermeroService } from './service';

@Controller('enfermeros/:enfermeroId/asignaciones')
export class ListarPorEnfermeroController {
  constructor(private readonly service: ListarPorEnfermeroService) {}

  @Get()
  listar(@Param('enfermeroId') enfermeroId: string) {
    return this.service.listarAsignacionesPorEnfermeroService(Number(enfermeroId));
  }
}
