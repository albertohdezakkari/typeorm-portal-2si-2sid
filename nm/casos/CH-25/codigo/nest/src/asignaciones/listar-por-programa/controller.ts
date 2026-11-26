import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorProgramaService } from './service';

@Controller('programas/:programaId/asignaciones')
export class ListarPorProgramaController {
  constructor(private readonly service: ListarPorProgramaService) {}

  @Get()
  listar(@Param('programaId') programaId: string) {
    return this.service.listarAsignacionesPorProgramaService(Number(programaId));
  }
}
