import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorHuespedService } from './service';

@Controller('huespedes/:huespedId/asignaciones')
export class ListarPorHuespedController {
  constructor(private readonly service: ListarPorHuespedService) {}

  @Get()
  listar(@Param('huespedId') huespedId: string) {
    return this.service.listarAsignacionesPorHuespedService(Number(huespedId));
  }
}
