import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorProfesionalService } from './service';

@Controller('profesionales/:profesionalId/asignaciones')
export class ListarPorProfesionalController {
  constructor(private readonly service: ListarPorProfesionalService) {}

  @Get()
  listar(@Param('profesionalId') profesionalId: string) {
    return this.service.listarAsignacionesPorProfesionalService(Number(profesionalId));
  }
}
