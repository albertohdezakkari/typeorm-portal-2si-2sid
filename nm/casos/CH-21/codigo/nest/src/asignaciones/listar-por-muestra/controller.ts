import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorMuestraService } from './service';

@Controller('muestras/:muestraId/asignaciones')
export class ListarPorMuestraController {
  constructor(private readonly service: ListarPorMuestraService) {}

  @Get()
  listar(@Param('muestraId') muestraId: string) {
    return this.service.listarAsignacionesPorMuestraService(Number(muestraId));
  }
}
