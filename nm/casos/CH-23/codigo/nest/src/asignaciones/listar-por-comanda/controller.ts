import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorComandaService } from './service';

@Controller('comandas/:comandaId/asignaciones')
export class ListarPorComandaController {
  constructor(private readonly service: ListarPorComandaService) {}

  @Get()
  listar(@Param('comandaId') comandaId: string) {
    return this.service.listarAsignacionesPorComandaService(Number(comandaId));
  }
}
