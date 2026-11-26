import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorLocutorService } from './service';

@Controller('locutores/:locutorId/asignaciones')
export class ListarPorLocutorController {
  constructor(private readonly service: ListarPorLocutorService) {}

  @Get()
  listar(@Param('locutorId') locutorId: string) {
    return this.service.listarAsignacionesPorLocutorService(Number(locutorId));
  }
}
