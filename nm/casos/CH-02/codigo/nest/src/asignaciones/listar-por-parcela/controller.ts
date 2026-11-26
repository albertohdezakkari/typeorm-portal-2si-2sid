import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorParcelaService } from './service';

@Controller('parcelas/:parcelaId/asignaciones')
export class ListarPorParcelaController {
  constructor(private readonly service: ListarPorParcelaService) {}

  @Get()
  listar(@Param('parcelaId') parcelaId: string) {
    return this.service.listarAsignacionesPorParcelaService(Number(parcelaId));
  }
}
