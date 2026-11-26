import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorMecanicoService } from './service';

@Controller('mecanicos/:mecanicoId/asignaciones')
export class ListarPorMecanicoController {
  constructor(private readonly service: ListarPorMecanicoService) {}

  @Get()
  listar(@Param('mecanicoId') mecanicoId: string) {
    return this.service.listarAsignacionesPorMecanicoService(Number(mecanicoId));
  }
}
