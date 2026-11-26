import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorPublicacionService } from './service';

@Controller('publicaciones/:publicacionId/asignaciones')
export class ListarPorPublicacionController {
  constructor(private readonly service: ListarPorPublicacionService) {}

  @Get()
  listar(@Param('publicacionId') publicacionId: string) {
    return this.service.listarAsignacionesPorPublicacionService(Number(publicacionId));
  }
}
