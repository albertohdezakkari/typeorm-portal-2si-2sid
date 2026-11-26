import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorActuacionService } from './service';

@Controller('actuaciones/:actuacionId/asignaciones')
export class ListarPorActuacionController {
  constructor(private readonly service: ListarPorActuacionService) {}

  @Get()
  listar(@Param('actuacionId') actuacionId: string) {
    return this.service.listarAsignacionesPorActuacionService(Number(actuacionId));
  }
}
