import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorPistaService } from './service';

@Controller('pistas/:pistaId/asignaciones')
export class ListarPorPistaController {
  constructor(private readonly service: ListarPorPistaService) {}

  @Get()
  listar(@Param('pistaId') pistaId: string) {
    return this.service.listarAsignacionesPorPistaService(Number(pistaId));
  }
}
