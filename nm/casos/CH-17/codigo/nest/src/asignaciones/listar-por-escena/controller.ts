import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorEscenaService } from './service';

@Controller('escenas/:escenaId/asignaciones')
export class ListarPorEscenaController {
  constructor(private readonly service: ListarPorEscenaService) {}

  @Get()
  listar(@Param('escenaId') escenaId: string) {
    return this.service.listarAsignacionesPorEscenaService(Number(escenaId));
  }
}
