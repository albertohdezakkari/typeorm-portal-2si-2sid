import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorSesionService } from './service';

@Controller('sesiones/:sesionId/asignaciones')
export class ListarPorSesionController {
  constructor(private readonly service: ListarPorSesionService) {}

  @Get()
  listar(@Param('sesionId') sesionId: string) {
    return this.service.listarAsignacionesPorSesionService(Number(sesionId));
  }
}
