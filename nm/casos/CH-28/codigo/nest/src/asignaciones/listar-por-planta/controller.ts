import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorPlantaService } from './service';

@Controller('plantas/:plantaId/asignaciones')
export class ListarPorPlantaController {
  constructor(private readonly service: ListarPorPlantaService) {}

  @Get()
  listar(@Param('plantaId') plantaId: string) {
    return this.service.listarAsignacionesPorPlantaService(Number(plantaId));
  }
}
