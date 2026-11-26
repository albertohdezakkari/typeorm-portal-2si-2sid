import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorAgricultorService } from './service';

@Controller('agricultores/:agricultorId/asignaciones')
export class ListarPorAgricultorController {
  constructor(private readonly service: ListarPorAgricultorService) {}

  @Get()
  listar(@Param('agricultorId') agricultorId: string) {
    return this.service.listarAsignacionesPorAgricultorService(Number(agricultorId));
  }
}
