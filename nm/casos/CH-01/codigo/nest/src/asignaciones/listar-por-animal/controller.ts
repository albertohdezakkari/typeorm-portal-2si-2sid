import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorAnimalService } from './service';

@Controller('animales/:animalId/asignaciones')
export class ListarPorAnimalController {
  constructor(private readonly service: ListarPorAnimalService) {}

  @Get()
  listar(@Param('animalId') animalId: string) {
    return this.service.listarAsignacionesPorAnimalService(Number(animalId));
  }
}
