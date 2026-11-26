import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorInterpreteService } from './service';

@Controller('interpretes/:interpreteId/asignaciones')
export class ListarPorInterpreteController {
  constructor(private readonly service: ListarPorInterpreteService) {}

  @Get()
  listar(@Param('interpreteId') interpreteId: string) {
    return this.service.listarAsignacionesPorInterpreteService(Number(interpreteId));
  }
}
