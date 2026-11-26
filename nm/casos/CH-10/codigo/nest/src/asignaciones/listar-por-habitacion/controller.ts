import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorHabitacionService } from './service';

@Controller('habitaciones/:habitacionId/asignaciones')
export class ListarPorHabitacionController {
  constructor(private readonly service: ListarPorHabitacionService) {}

  @Get()
  listar(@Param('habitacionId') habitacionId: string) {
    return this.service.listarAsignacionesPorHabitacionService(Number(habitacionId));
  }
}
