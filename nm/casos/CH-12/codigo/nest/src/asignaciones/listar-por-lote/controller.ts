import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorLoteService } from './service';

@Controller('lotes/:loteId/asignaciones')
export class ListarPorLoteController {
  constructor(private readonly service: ListarPorLoteService) {}

  @Get()
  listar(@Param('loteId') loteId: string) {
    return this.service.listarAsignacionesPorLoteService(Number(loteId));
  }
}
