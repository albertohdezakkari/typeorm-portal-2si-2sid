import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorPiezaService } from './service';

@Controller('piezas/:piezaId/asignaciones')
export class ListarPorPiezaController {
  constructor(private readonly service: ListarPorPiezaService) {}

  @Get()
  listar(@Param('piezaId') piezaId: string) {
    return this.service.listarAsignacionesPorPiezaService(Number(piezaId));
  }
}
