import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorTripulanteService } from './service';

@Controller('tripulantes/:tripulanteId/asignaciones')
export class ListarPorTripulanteController {
  constructor(private readonly service: ListarPorTripulanteService) {}

  @Get()
  listar(@Param('tripulanteId') tripulanteId: string) {
    return this.service.listarAsignacionesPorTripulanteService(Number(tripulanteId));
  }
}
