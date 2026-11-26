import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorDocenteService } from './service';

@Controller('docentes/:docenteId/asignaciones')
export class ListarPorDocenteController {
  constructor(private readonly service: ListarPorDocenteService) {}

  @Get()
  listar(@Param('docenteId') docenteId: string) {
    return this.service.listarAsignacionesPorDocenteService(Number(docenteId));
  }
}
