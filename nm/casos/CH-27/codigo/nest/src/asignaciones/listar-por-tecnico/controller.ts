import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorTecnicoService } from './service';

@Controller('tecnicos/:tecnicoId/asignaciones')
export class ListarPorTecnicoController {
  constructor(private readonly service: ListarPorTecnicoService) {}

  @Get()
  listar(@Param('tecnicoId') tecnicoId: string) {
    return this.service.listarAsignacionesPorTecnicoService(Number(tecnicoId));
  }
}
