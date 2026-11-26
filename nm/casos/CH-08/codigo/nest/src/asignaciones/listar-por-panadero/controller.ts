import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorPanaderoService } from './service';

@Controller('panaderos/:panaderoId/asignaciones')
export class ListarPorPanaderoController {
  constructor(private readonly service: ListarPorPanaderoService) {}

  @Get()
  listar(@Param('panaderoId') panaderoId: string) {
    return this.service.listarAsignacionesPorPanaderoService(Number(panaderoId));
  }
}
