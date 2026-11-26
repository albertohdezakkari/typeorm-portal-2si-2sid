import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorActorService } from './service';

@Controller('actores/:actorId/asignaciones')
export class ListarPorActorController {
  constructor(private readonly service: ListarPorActorService) {}

  @Get()
  listar(@Param('actorId') actorId: string) {
    return this.service.listarAsignacionesPorActorService(Number(actorId));
  }
}
